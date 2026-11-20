"use client";

import { useEffect, useId, useRef, useState } from "react";
import { buildEstimate, type ClientMix } from "../lib/estimate";
import { formatBytes, formatMoney, formatNumber } from "../lib/format";
import {
  activeRates,
  bytesToGB,
  formatGB,
  formatVerifiedDate,
  getModel,
  isCustom,
  PRICING_MODELS,
  requestBreakdown,
  tierBreakdown,
  tierRows,
  type ModelRates,
  type PricingModelId,
  type PricingOptions,
} from "../lib/pricing";
import type { AnalysisResult } from "../lib/types";

const MODEL_IDS = Object.keys(PRICING_MODELS) as PricingModelId[];

const TAB_LABEL: Record<PricingModelId, string> = { direct: "Direct from AWS", cloudfront: "Via CloudFront" };

/** Plain-language "how this service bills you". Numbers come from lib/pricing.ts. */
function howItCharges(id: PricingModelId, freeGB: number, freeTier: boolean, req: { per10k: number; freeRequests: number } | null): string[] {
  const free = freeTier ? `The first ${formatGB(freeGB)} each month are free` : "The free allowance is switched off, so every GB is billed";
  if (id === "cloudfront") {
    return [
      "CloudFront bills per GB delivered from its edge locations to your users, at tiered rates that fall as monthly volume grows (North America / Europe rates).",
      `${free}. CloudFront's always-free tier is per AWS account.`,
      "Transfer from your AWS origin (EC2, ALB, S3) to CloudFront is free, so you don't also pay regional egress.",
      req
        ? `CloudFront also charges per HTTPS request: $${req.per10k.toFixed(4)} per 10,000${
            req.freeRequests > 0 ? `, after the first ${formatNumber(req.freeRequests)} each month (free tier)` : ""
          }. Request fees are included below and don't change with compression.`
        : "CloudFront also charges per HTTPS request; those fees are included below.",
    ];
  }
  return [
    "AWS bills per GB sent from your region (us-east-1) to the internet by EC2, an ALB or API Gateway, at tiered rates that fall as monthly volume grows.",
    `${free}, shared across every service and region in your AWS account, so other traffic may already use it.`,
    "Each GB is billed at the rate of the tier it falls in, so a busy month doesn't reprice your first GBs.",
  ];
}

interface Props {
  result: AnalysisResult;
  requests: number;
  paged: boolean;
  mix: ClientMix;
  /** The options driving the rest of the results (model, free tier, custom rates). */
  pricing: PricingOptions;
  /** Custom rates the user entered, per model. */
  customRates?: Partial<Record<PricingModelId, ModelRates>>;
  /** Switch the whole estimate to another model. Omitted where that's not possible. */
  onUseModel?: (id: PricingModelId) => void;
}

/** "How you're charged": AWS direct vs CloudFront, side by side, with a tab explaining each. */
export default function ChargesTabs({ result, requests, paged, mix, pricing, customRates = {}, onUseModel }: Props) {
  const [tab, setTab] = useState<PricingModelId>(pricing.model);
  const id = useId();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Follow the selected pricing model.
  useEffect(() => setTab(pricing.model), [pricing.model]);

  const optsFor = (m: PricingModelId): PricingOptions => ({
    model: m,
    freeTier: pricing.freeTier,
    custom: m === pricing.model ? pricing.custom : (customRates[m] ?? null),
  });
  const est = Object.fromEntries(MODEL_IDS.map((m) => [m, buildEstimate(result, requests, optsFor(m), paged, mix)])) as Record<
    PricingModelId,
    ReturnType<typeof buildEstimate>
  >;
  const cheaper = est.direct.today.monthlyCost === est.cloudfront.today.monthlyCost ? null : est.direct.today.monthlyCost < est.cloudfront.today.monthlyCost ? "direct" : "cloudfront";

  const onKey = (e: React.KeyboardEvent) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const i = MODEL_IDS.indexOf(tab);
    const next =
      e.key === "Home" ? 0 : e.key === "End" ? MODEL_IDS.length - 1 : (i + (e.key === "ArrowRight" ? 1 : -1) + MODEL_IDS.length) % MODEL_IDS.length;
    setTab(MODEL_IDS[next]);
    tabRefs.current[MODEL_IDS[next]]?.focus();
  };

  const e = est[tab];
  const opts = optsFor(tab);
  const model = getModel(tab);
  const monthlyGB = bytesToGB(e.today.monthlyBytes);
  const bd = tierBreakdown(monthlyGB, opts);
  const rb = requestBreakdown(requests, opts);
  const total = bd.total + (rb?.cost ?? 0);
  const rates = tierRows(opts);
  const custom = isCustom(opts);
  const compressed = e.expectedCost < e.today.monthlyCost - 0.004;

  return (
    <div className="card charges">
      <h3 className="card-title">How you&apos;re charged</h3>
      <p className="hint charges-intro">
        The same {formatBytes(e.today.bytes ?? 0)} {paged ? "page" : "response"} × {formatNumber(requests)} requests/month, priced two ways.
      </p>

      {/* Side-by-side totals */}
      <div className="charges-compare">
        {MODEL_IDS.map((m) => {
          const x = est[m];
          const saves = x.expectedCost < x.today.monthlyCost - 0.004;
          return (
            <div key={m} className={`charges-cell${m === pricing.model ? " is-active" : ""}`}>
              <p className="charges-cell-head">
                <span>{TAB_LABEL[m]}</span>
                {m === pricing.model && <span className="charges-tag">Active</span>}
                {m === cheaper && <span className="charges-tag charges-tag-good">Cheaper</span>}
              </p>
              <p className="charges-cell-big">
                {formatMoney(x.today.monthlyCost)}
                <span>/month today</span>
              </p>
              <p className="charges-cell-sub">{saves ? `${formatMoney(x.expectedCost)}/month with compression` : "Same with compression"}</p>
            </div>
          );
        })}
      </div>

      {/* Tabs: how each one charges */}
      <div role="tablist" aria-label="Pricing model details" className="tabs charges-tabs" onKeyDown={onKey}>
        {MODEL_IDS.map((m) => (
          <button
            key={m}
            ref={(el) => {
              tabRefs.current[m] = el;
            }}
            role="tab"
            type="button"
            id={`${id}-tab-${m}`}
            aria-selected={tab === m}
            aria-controls={`${id}-panel`}
            tabIndex={tab === m ? 0 : -1}
            className="tab"
            onClick={() => setTab(m)}
          >
            {TAB_LABEL[m]}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${tab}`} className="charges-panel" tabIndex={0}>
        <ul className="charges-how">
          {howItCharges(tab, activeRates(opts).freeGB, pricing.freeTier, rb).map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        {custom && <p className="notice notice-info">Using your custom rates for {TAB_LABEL[tab]}, not AWS&apos;s published defaults.</p>}

        <div className="table-wrap">
          <table className="charges-table">
            <caption>
              Your bill today: {formatBytes(e.today.monthlyBytes)}/month {tab === "cloudfront" ? "via CloudFront" : "direct from AWS"}
            </caption>
            <thead>
              <tr>
                <th scope="col">Tier</th>
                <th scope="col" className="num">
                  Data
                </th>
                <th scope="col" className="num">
                  Rate
                </th>
                <th scope="col" className="num">
                  Cost
                </th>
              </tr>
            </thead>
            <tbody>
              {bd.freeUsedGB > 0 && (
                <tr>
                  <th scope="row">First {formatGB(bd.freeGB)} (free)</th>
                  <td className="num">{formatBytes(bd.freeUsedGB * 1e9)}</td>
                  <td className="num">Free</td>
                  <td className="num">{formatMoney(0)}</td>
                </tr>
              )}
              {bd.rows.map((r) => (
                <tr key={r.range}>
                  <th scope="row">{r.range}</th>
                  <td className="num">{formatBytes(r.gb * 1e9)}</td>
                  <td className="num">${r.pricePerGB.toFixed(3)}/GB</td>
                  <td className="num">{formatMoney(r.cost)}</td>
                </tr>
              ))}
              {rb && rb.freeUsed > 0 && (
                <tr className="charges-req">
                  <th scope="row">First {formatNumber(rb.freeRequests)} requests (free)</th>
                  <td className="num">{formatNumber(rb.freeUsed)} req.</td>
                  <td className="num">Free</td>
                  <td className="num">{formatMoney(0)}</td>
                </tr>
              )}
              {rb && rb.billable > 0 && (
                <tr className="charges-req">
                  <th scope="row">HTTPS requests</th>
                  <td className="num">{formatNumber(rb.billable)} req.</td>
                  <td className="num">${rb.per10k.toFixed(4)}/10K</td>
                  <td className="num">{formatMoney(rb.cost)}</td>
                </tr>
              )}
              {bd.freeUsedGB === 0 && bd.rows.length === 0 && !rb && (
                <tr>
                  <th scope="row">No traffic</th>
                  <td className="num">–</td>
                  <td className="num">–</td>
                  <td className="num">{formatMoney(0)}</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row">Total per month</th>
                <td className="num" />
                <td className="num" />
                <td className="num">{formatMoney(total)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        {compressed && (
          <p className="hint">
            With compression (your client mix), the same traffic is {formatBytes(e.mix?.monthlyBytes ?? 0)}/month: <strong>{formatMoney(e.expectedCost)}/month</strong>.
          </p>
        )}

        <details className="charges-rates">
          <summary>Full rate card</summary>
          <ul>
            {rates.free && (
              <li>
                <span>{rates.free.range}</span>
                <span>Free</span>
              </li>
            )}
            {rates.rows.map((r) => (
              <li key={r.range}>
                <span>{r.range}</span>
                <span>${r.pricePerGB.toFixed(3)}/GB</span>
              </li>
            ))}
            {rb && rb.freeRequests > 0 && (
              <li>
                <span>First {formatNumber(rb.freeRequests)} HTTPS requests</span>
                <span>Free</span>
              </li>
            )}
            {rb && (
              <li>
                <span>HTTPS requests{rb.freeRequests > 0 ? " after that" : ""}</span>
                <span>${rb.per10k.toFixed(4)} per 10,000</span>
              </li>
            )}
          </ul>
        </details>

        <div className="charges-foot">
          <p className="hint">
            Monthly egress = {paged ? "average page size" : "response size"} × requests per month (1 GB = 10⁹ bytes). {tab === "cloudfront" ? "CloudFront" : "AWS"} rates verified {formatVerifiedDate(model.lastVerified)}. Estimates only. Not affiliated with Amazon Web Services.
          </p>
          <div className="charges-actions">
            <a className="btn-ghost btn-link" href={model.source} target="_blank" rel="noopener noreferrer">
              {tab === "cloudfront" ? "CloudFront pricing" : "AWS pricing"} <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {onUseModel && tab !== pricing.model && (
              <button type="button" className="btn-ghost" onClick={() => onUseModel(tab)}>
                {tab === "cloudfront" ? "Use CloudFront pricing for the estimate" : "Use direct AWS pricing for the estimate"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
