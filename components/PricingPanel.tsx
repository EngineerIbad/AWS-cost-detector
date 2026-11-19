"use client";

import { useState } from "react";
import { defaultPricing, getDefaultPricing, pricingToDraft, type PricingDraft, type ValidationResult } from "../lib/pricing";

interface Props {
  draft: PricingDraft;
  setDraft: (d: PricingDraft | ((d: PricingDraft) => PricingDraft)) => void;
  validation: ValidationResult;
  usingDefaults: boolean;
  onShare: () => void;
  shareMsg: string;
}

function verifiedLabel(): string {
  const d = new Date(defaultPricing.lastVerified + "T00:00:00Z");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

function prevLimitLabel(draft: PricingDraft, i: number): string {
  if (i === 0) return "0";
  const n = Number(draft.tiers[i - 1].upToGB.replace(/[,\s_]/g, ""));
  return Number.isFinite(n) && draft.tiers[i - 1].upToGB !== "" ? n.toLocaleString("en-US") : "–";
}

export default function PricingPanel({ draft, setDraft, validation, usingDefaults, onShare, shareMsg }: Props) {
  const [open, setOpen] = useState(false);

  const updateTier = (i: number, key: "upToGB" | "pricePerGB", value: string) =>
    setDraft((d) => ({ ...d, tiers: d.tiers.map((t, j) => (j === i ? { ...t, [key]: value } : t)) }));

  const addTier = () =>
    setDraft((d) => {
      const tiers = [...d.tiers];
      const lastIdx = tiers.length - 1;
      const prev = lastIdx > 0 ? Number(tiers[lastIdx - 1].upToGB.replace(/[,\s_]/g, "")) : 0;
      const newLimit = Number.isFinite(prev) && prev > 0 ? prev * 2 : 1000;
      tiers.splice(lastIdx, 0, { upToGB: String(newLimit), pricePerGB: tiers[lastIdx].pricePerGB });
      return { ...d, tiers };
    });

  const removeTier = (i: number) =>
    setDraft((d) => {
      if (d.tiers.length <= 1) return d;
      const tiers = d.tiers.filter((_, j) => j !== i);
      // The final tier is always unlimited.
      tiers[tiers.length - 1] = { ...tiers[tiers.length - 1], upToGB: "" };
      return { ...d, tiers };
    });

  return (
    <div className="card">
      <div className="pricing-head">
        <h2 className="step">
          <span className="step-num" aria-hidden="true">3</span> Pricing
        </h2>
        <span className={`badge ${usingDefaults ? "badge-verified" : "badge-custom"}`}>
          {usingDefaults ? `AWS rates verified ${verifiedLabel()}` : "Custom pricing"}
        </span>
      </div>
      <p className="hint">
        AWS data transfer out to the internet, {defaultPricing.region}, tiered per month.{" "}
        <a href={defaultPricing.source} target="_blank" rel="noopener noreferrer">
          Source
        </a>
      </p>

      <button type="button" className="disclosure" aria-expanded={open} aria-controls="pricing-settings" onClick={() => setOpen((o) => !o)}>
        <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" className="chev">
          <path d="M5 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Pricing settings
      </button>

      {open && (
        <div id="pricing-settings" className="pricing-body">
          <div className="field currency-field">
            <label htmlFor="currency">Currency label</label>
            <input
              id="currency"
              type="text"
              maxLength={8}
              value={draft.currency}
              onChange={(e) => setDraft((d) => ({ ...d, currency: e.target.value }))}
              aria-invalid={!!validation.currencyError}
              aria-describedby={validation.currencyError ? "currency-error" : undefined}
            />
            {validation.currencyError && (
              <p className="field-error" id="currency-error">
                {validation.currencyError}
              </p>
            )}
          </div>

          <table className="tier-table">
            <caption className="sr-only">Pricing tiers, cumulative per month</caption>
            <thead>
              <tr>
                <th scope="col">Tier</th>
                <th scope="col">From (GB)</th>
                <th scope="col">Up to (GB)</th>
                <th scope="col">Price / GB</th>
                <th scope="col">
                  <span className="sr-only">Remove</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {draft.tiers.map((t, i) => {
                const isLast = i === draft.tiers.length - 1;
                const err = validation.tierErrors[i] ?? {};
                return (
                  <tr key={i}>
                    <td data-label="Tier">{i + 1}</td>
                    <td data-label="From (GB)" className="muted-cell">
                      {prevLimitLabel(draft, i)}
                    </td>
                    <td data-label="Up to (GB)">
                      {isLast ? (
                        <span className="muted-cell">∞ no limit</span>
                      ) : (
                        <>
                          <label className="sr-only" htmlFor={`tier-${i}-limit`}>
                            Tier {i + 1} upper limit in GB
                          </label>
                          <input
                            id={`tier-${i}-limit`}
                            type="number"
                            inputMode="decimal"
                            min={0}
                            step="any"
                            value={t.upToGB}
                            onChange={(e) => updateTier(i, "upToGB", e.target.value)}
                            aria-invalid={!!err.upToGB}
                            aria-describedby={err.upToGB ? `tier-${i}-limit-error` : undefined}
                          />
                          {err.upToGB && (
                            <p className="field-error" id={`tier-${i}-limit-error`}>
                              {err.upToGB}
                            </p>
                          )}
                        </>
                      )}
                    </td>
                    <td data-label="Price / GB">
                      <label className="sr-only" htmlFor={`tier-${i}-price`}>
                        Tier {i + 1} price per GB
                      </label>
                      <input
                        id={`tier-${i}-price`}
                        type="number"
                        inputMode="decimal"
                        min={0}
                        step="0.001"
                        value={t.pricePerGB}
                        onChange={(e) => updateTier(i, "pricePerGB", e.target.value)}
                        aria-invalid={!!err.pricePerGB}
                        aria-describedby={err.pricePerGB ? `tier-${i}-price-error` : undefined}
                      />
                      {err.pricePerGB && (
                        <p className="field-error" id={`tier-${i}-price-error`}>
                          {err.pricePerGB}
                        </p>
                      )}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn-icon"
                        onClick={() => removeTier(i)}
                        disabled={draft.tiers.length <= 1}
                        aria-label={`Remove tier ${i + 1}`}
                        title="Remove tier"
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {validation.formError && <p className="field-error">{validation.formError}</p>}
          {!validation.ok && <p className="hint">Fix the highlighted fields. Costs use your last valid pricing until then.</p>}

          <div className="pricing-actions">
            <button type="button" className="btn-ghost" onClick={addTier} disabled={draft.tiers.length >= 20}>
              + Add tier
            </button>
            <button type="button" className="btn-ghost" onClick={() => setDraft(pricingToDraft(getDefaultPricing()))} disabled={usingDefaults}>
              Reset to AWS defaults
            </button>
          </div>
          <p className="hint">1 GB = 1,000,000,000 bytes. Each GB is billed at the rate of the tier it falls in.</p>
        </div>
      )}

      <div className="share-row">
        <button type="button" className="btn-ghost" onClick={onShare}>
          Share this setup
        </button>
        <span className="share-msg" role="status">
          {shareMsg}
        </span>
      </div>
    </div>
  );
}
