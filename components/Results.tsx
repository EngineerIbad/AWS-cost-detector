"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { track } from "../lib/analytics";
import { buildCopySummary, effectiveSizes, encodingName, type SessionTraffic } from "../lib/costs";
import { buildEstimate, CLIENTS, normalizeMix, sizeText, type ClientMix, type DisplayRow, type Estimate } from "../lib/estimate";
import { compactCount, formatBytes, formatMoney, formatNumber, formatPercent, formatRatio, sizeReduction } from "../lib/format";
import { MAX_SAMPLED_PAGES } from "../lib/pagination";
import { activeRates, formatGB, type ModelRates, type PricingModelId, type PricingOptions } from "../lib/pricing";
import type { AnalysisResult, Finding, PaginationResult, Severity } from "../lib/types";
import ChargesTabs from "./ChargesTabs";
import { showToast } from "./Toast";

interface Props {
  result: AnalysisResult | null;
  label: string;
  requests: number;
  pricing: PricingOptions;
  mix: ClientMix;
  onMixChange: (m: ClientMix) => void;
  animate?: boolean;
  /** Set when pagination is on: requests = sessions × pages per session. */
  paging?: SessionTraffic | null;
  /** Inputs changed or a measurement is running: dim everything below the status bar. */
  dimmed?: boolean;
  /** Custom rates per model, so "How you're charged" can price both models. */
  customRates?: Partial<Record<PricingModelId, ModelRates>>;
  /** Switch the estimate to another pricing model. */
  onUseModel?: (id: PricingModelId) => void;
}

/** Above this deviation from the mean, warn that page sizes vary a lot. */
const VARIATION_THRESHOLD = 0.3;
const SEV_ORDER: Record<Severity, number> = { high: 0, medium: 1, info: 2 };
const SEV_LABEL: Record<Severity, string> = { high: "High", medium: "Medium", info: "Info" };

export default function Results({ result, label, requests, pricing, mix, onMixChange, animate = false, paging = null, dimmed = false, customRates, onUseModel }: Props) {
  const paged = !!paging;
  const est = useMemo(() => (result ? buildEstimate(result, requests, pricing, paged, mix) : null), [result, requests, pricing, paged, mix]);

  if (!result || !est) {
    return (
      <div className="card empty-state">
        <h2>No results yet</h2>
        <p>Pick a demo, or paste a curl command and press Measure response.</p>
      </div>
    );
  }

  const shared = result.source === "shared";
  const a = result;
  const findings = [...a.findings].sort((x, y) => SEV_ORDER[x.severity] - SEV_ORDER[y.severity]);
  const statusOk = a.status === null || (a.status >= 200 && a.status < 300);
  const sizes = effectiveSizes(a, paged);
  const sampled = a.pagination?.pages.length ?? a.sampledPages ?? 1;
  const unit = paged ? "page" : "response";
  const ct = (a.contentType ?? "").split(";")[0].trim().toLowerCase();

  async function copy() {
    track("copy_results_clicked", { source: shared ? "shared" : "calculator" });
    // On a shared page, point at the share link itself; otherwise at the calculator.
    const link = typeof window !== "undefined" ? (shared ? window.location.href : window.location.origin) : undefined;
    const text = buildCopySummary(a, est!.summary, requests, pricing, link, paging, mixLines(est!, mix));
    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied. Paste it into Slack, an issue or a post.");
    } catch {
      showToast("Couldn't access the clipboard. Select the table and copy manually.", "error");
    }
  }

  return (
    <div className={`results-inner${animate ? " fade-in" : ""}`}>
      {a.rawBytes > 0 && <SummaryBar est={est} unit={unit} dimmed={dimmed} />}

      <div className={`results-body${dimmed ? " is-dimmed" : ""}`}>
        <div className="results-head">
          <div>
            <p className="eyebrow">Results</p>
            <h2 className="results-title">{label}</h2>
            <p className="meta">
              {a.status !== null && <span className={`pill ${statusOk ? "" : "pill-warn"}`}>HTTP {a.status}</span>}
              {a.contentType && <span className="pill">{ct}</span>}
              <span className="pill">{a.contentEncoding ? `Content-Encoding: ${a.contentEncoding}` : "No compression"}</span>
              {paged && (
                <span className="pill">
                  {sampled} page{sampled === 1 ? "" : "s"} sampled
                </span>
              )}
            </p>
          </div>
          <div className="copy-wrap">
            <button type="button" className="btn-ghost" onClick={copy} disabled={a.rawBytes === 0}>
              Copy results
            </button>
          </div>
        </div>

        {a.rawBytes === 0 ? (
          <div className="card empty-state">
            <h3>The response body was empty</h3>
            <p>
              {a.status !== null ? `The API returned HTTP ${a.status} with no body` : "There was nothing to measure"}, so there&apos;s nothing to compress or bill.
              {a.redirectTo ? " Paste the final URL to measure the real response." : " Check the URL, method and auth, then try again."}
            </p>
          </div>
        ) : (
          <>
            <RecommendationCard est={est} unit={unit} requests={requests} pricing={pricing} mix={mix} onMixChange={onMixChange} />

            {(a.status === 401 || a.status === 403) && (
              <p className="notice">
                The API rejected the request (HTTP {a.status}). Check your token or use a staging endpoint. These numbers measure the error body, not your real data.
              </p>
            )}
            {!statusOk && a.status !== 401 && a.status !== 403 && !a.redirectTo && (
              <p className="notice">
                The API returned HTTP {a.status}. We measured the body it sent, which may be an error message rather than your real data.
              </p>
            )}
            {!a.isJson && !a.alreadyCompressedMedia && !shared && (
              <p className="notice notice-info">
                {ct === "text/html" ? "This returned HTML, not JSON. Measuring it anyway." : `This returned ${ct || "a non-JSON body"}, not JSON. Measuring it anyway.`}{" "}
                There&apos;s no minified row; compression results still apply.
              </p>
            )}

            <div className="card">
              <h3 className="card-title">Cost by format</h3>
              <CostTable rows={est.rows} bestId={est.best?.id ?? null} rawBytes={sizes.rawBytes} unit={unit} paged={paged} />
              <p className="hint">
                At {formatNumber(requests)} requests/month
                {paging ? ` (${formatNumber(paging.sessions)} sessions × ${paging.pagesPerSession} pages per session)` : ""}.
                {paging && (
                  <>
                    {" "}
                    Each row uses the average size of {sampled} sampled page{sampled === 1 ? "" : "s"}
                    {paging.pagesPerSession > sampled ? `, extrapolated to ${paging.pagesPerSession}` : ""}.
                  </>
                )}{" "}
                Compression rows compress the body as served.
                {est.summary.requestCost > 0 && ` Each row includes ${formatMoney(est.summary.requestCost)}/month of CloudFront request fees (the same for every format).`}
                {!shared && " Times are single runs on our server."}
              </p>
            </div>

            <ChargesTabs result={a} requests={requests} paged={paged} mix={mix} pricing={pricing} customRates={customRates} onUseModel={onUseModel} />
          </>
        )}

        {!shared && (
          <div className="card">
            <h3 className="card-title">Recommendations</h3>
            {findings.length === 0 ? (
              <p className="all-good">Nothing to fix here. This response is already in good shape.</p>
            ) : (
              <ul className="findings">
                {findings.map((f) => (
                  <FindingItem key={f.id} f={f} />
                ))}
              </ul>
            )}
          </div>
        )}

        {a.rawBytes > 0 && (
          <div className="card">
            <h3 className="card-title">Size comparison</h3>
            <Bars rows={est.rows} bestId={est.best?.id ?? null} unit={unit} />
          </div>
        )}


        {paging && !shared && (
          <Disclosure title="Pages sampled" summary={`${sampled} of up to ${MAX_SAMPLED_PAGES}`}>
            <PagesSampled pagination={a.pagination ?? null} source={a.source} />
          </Disclosure>
        )}

        {!shared && (
          <>
            <Disclosure title="Response preview" summary="first 500 characters">
              {a.preview ? (
                <>
                  <pre className="preview">
                    {a.preview}
                    {a.previewTruncated ? "…" : ""}
                  </pre>
                  <p className="hint">First 500 characters only. The full body is never sent to your browser or stored.</p>
                </>
              ) : (
                <p className="hint">Empty body.</p>
              )}
            </Disclosure>
            <Disclosure title="Response headers" summary={`${Object.keys(a.responseHeaders).length} shown`}>
              {Object.keys(a.responseHeaders).length > 0 ? (
                <dl className="headers">
                  {Object.entries(a.responseHeaders).map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="hint">No headers for demos and pasted samples.</p>
              )}
              <p className="hint">Only non-sensitive headers are shown. Cookies are never returned.</p>
            </Disclosure>
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Summary bar: sticky on desktop, fixed to the bottom on mobile       */
/* ------------------------------------------------------------------ */

function SummaryBar({ est, unit, dimmed }: { est: Estimate; unit: "page" | "response"; dimmed: boolean }) {
  const keyboardOpen = useKeyboardOpen();
  // Only show the bar while the full recommendation card is off screen, so the
  // same figures never appear twice. On mobile, also keep it off the Measure button.
  const cardVisible = useInView(".results-body .savings", { initial: true, dep: est.kind });
  const nearMeasure = useInView(".measure-actions", { rootMargin: "-85% 0px 0px 0px" });
  const todayBytes = est.today.bytes ?? 0;
  const u = unit === "page" ? "page" : "resp.";
  let kicker: string;
  let big: string;
  let sub: string;
  let tone = "savings";

  switch (est.kind) {
    case "savings":
      kicker = "Estimated savings";
      big = `${formatMoney(est.expectedSavings)}/mo`;
      sub = `${formatMoney(est.today.monthlyCost)} → ${formatMoney(est.expectedCost)}/mo · ${formatBytes(todayBytes)} → ${formatBytes(est.expectedBytes)} per ${u}`;
      break;
    case "free-tier":
      kicker = "Within the free tier";
      big = `${formatMoney(est.today.monthlyCost)}/mo now`;
      sub = est.scaled
        ? `At ${compactCount(est.scaled.requests)} requests: ${formatMoney(est.scaled.todayCost)} → ${formatMoney(est.scaled.expectedCost)}/mo`
        : `${formatBytes(todayBytes)} → ${formatBytes(est.expectedBytes)} per ${u}`;
      tone = "neutral";
      break;
    case "already-compressed":
      kicker = `Already ${encodingName(est.servedEncoding)}`;
      if (est.bestSavings > 0.004) {
        big = `+${formatMoney(est.bestSavings)}/mo`;
        sub = `with ${est.best?.label} · ${formatBytes(todayBytes)} → ${formatBytes(est.best?.bytes ?? todayBytes)} per ${u}`;
      } else {
        big = `${formatMoney(est.today.monthlyCost)}/mo`;
        sub = `${formatBytes(todayBytes)} per ${u}${est.today.monthlyCost === 0 ? " · within the free tier" : ""}`;
      }
      tone = "good";
      break;
    case "already-best":
      kicker = est.servedEncoding ? `Already ${encodingName(est.servedEncoding)}` : "Already efficient";
      big = `${formatMoney(est.today.monthlyCost)}/mo`;
      sub = `Smallest format tested · ${formatBytes(todayBytes)} per ${u}`;
      tone = "good";
      break;
    case "no-traffic":
      kicker = "Set your traffic";
      big = "—";
      sub = "Enter requests per month to see costs.";
      tone = "neutral";
      break;
    default:
      return null;
  }

  const shown = !cardVisible;
  return (
    // Zero-height sticky slot: the bar floats over the column without taking space,
    // so nothing shifts when it appears.
    <div className="summary-slot">
      <div
        className={`summary-bar summary-${tone}${shown ? " is-shown" : ""}${dimmed ? " is-dimmed" : ""}${keyboardOpen ? " kb-open" : ""}${nearMeasure ? " near-measure" : ""}`}
        aria-hidden={!shown}
        aria-label="Summary"
      >
        <p className="summary-main">
          <span className="summary-kicker">{kicker}</span>
          <span className="summary-big">{big}</span>
        </p>
        <p className="summary-sub">{sub}</p>
      </div>
    </div>
  );
}

/**
 * True while the element matching `selector` intersects the viewport (shrunk by
 * `rootMargin`). `dep` re-attaches the observer when that element may have changed.
 */
function useInView(selector: string, opts: { rootMargin?: string; initial?: boolean; dep?: unknown } = {}): boolean {
  const { rootMargin = "0px", initial = false, dep } = opts;
  const [inView, setInView] = useState(initial);
  useEffect(() => {
    const el = document.querySelector(selector);
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(false);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [selector, rootMargin, dep]);
  return inView;
}

/** True while a text field has focus, i.e. the on-screen keyboard is likely open. */
function useKeyboardOpen(): boolean {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const isText = (el: EventTarget | null) =>
      el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement || (el instanceof HTMLInputElement && !["checkbox", "radio", "button", "submit"].includes(el.type));
    const onIn = (e: FocusEvent) => setOpen(isText(e.target));
    const onOut = () => setOpen(false);
    document.addEventListener("focusin", onIn);
    document.addEventListener("focusout", onOut);
    return () => {
      document.removeEventListener("focusin", onIn);
      document.removeEventListener("focusout", onOut);
    };
  }, []);
  return open;
}

/* ------------------------------------------------------------------ */
/* Recommendation card                                                 */
/* ------------------------------------------------------------------ */

const MIX_HEADLINE = "Enable compression and serve the best format each client asks for: Zstd → Brotli → Gzip.";

function RecommendationCard({
  est,
  unit,
  requests,
  pricing,
  mix,
  onMixChange,
}: {
  est: Estimate;
  unit: "page" | "response";
  requests: number;
  pricing: PricingOptions;
  mix: ClientMix;
  onMixChange: (m: ClientMix) => void;
}) {
  const freeGB = activeRates(pricing).freeGB;
  const best = est.best;

  if (est.kind === "no-traffic") {
    return (
      <div className="savings savings-neutral">
        <p className="savings-kicker">Set your traffic</p>
        <p className="savings-big">{unit === "page" ? "Enter sessions per month" : "Enter requests per month"}</p>
        <p className="savings-sub">Costs recalculate instantly. No need to measure again.</p>
      </div>
    );
  }

  if (est.kind === "already-compressed") {
    const more = est.bestSavings > 0.004;
    return (
      <div className="savings savings-good">
        <p className="savings-kicker">Good news</p>
        <p className="savings-big savings-headline">
          You&apos;re already compressed with {encodingName(est.servedEncoding)}.
          {more && best ? ` ${best.label} would save another ${formatMoney(est.bestSavings)}/month.` : ""}
        </p>
        <p className="savings-sub">
          {more && best
            ? `${formatBytes(est.today.bytes ?? 0)} → ${formatBytes(best.bytes ?? 0)} per ${unit} (${sizeReduction(est.today.bytes ?? 0, best.bytes ?? 0)?.pctText} smaller). Serve it to clients that ask for it and keep ${encodingName(est.servedEncoding)} as the fallback.`
            : best && est.bestSavings <= 0.004 && best.id !== "today"
              ? `${best.label} would make each ${unit} ${sizeReduction(est.today.bytes ?? 0, best.bytes ?? 0)?.pctText} smaller, but at this traffic it fits in the free tier.`
              : "That's the smallest format we tested."}
        </p>
      </div>
    );
  }

  if (est.kind === "already-best") {
    return (
      <div className="savings savings-good">
        <p className="savings-kicker">Already efficient</p>
        <p className="savings-big savings-headline">
          {est.servedEncoding
            ? `You're already compressed with ${encodingName(est.servedEncoding)}, the best format we tested.`
            : "You already send the smallest format we tested."}
        </p>
        <p className="savings-sub">
          {formatBytes(est.today.bytes ?? 0)} per {unit} · {formatMoney(est.today.monthlyCost)}/month at this traffic.
        </p>
      </div>
    );
  }

  const free = est.kind === "free-tier";
  return (
    <div className={`savings${free ? " savings-neutral" : ""}`}>
      <p className="savings-kicker">{free ? "Within the free tier" : "Recommendation"}</p>
      <p className="savings-big savings-headline">{MIX_HEADLINE}</p>
      {free ? (
        <p className="savings-sub">
          {formatBytes(est.today.monthlyBytes)}/month fits in the {formatGB(freeGB)} free tier, so data transfer costs {formatMoney(0)} either way{est.summary.requestCost > 0 ? ` (CloudFront request fees of ${formatMoney(est.summary.requestCost)}/month apply regardless of size)` : ""}. Compression still
          makes each {unit} {sizeText(est)} smaller and faster.
          {est.scaled && (
            <>
              {" "}
              At {formatNumber(est.scaled.requests)} requests/month it&apos;s <strong>{formatMoney(est.scaled.todayCost)} → {formatMoney(est.scaled.expectedCost)}/month</strong>.
            </>
          )}
        </p>
      ) : (
        <>
          <p className="savings-figure">
            Expected: <strong>{formatMoney(est.expectedCost)}/month</strong>, saving {formatMoney(est.expectedSavings)}/month (
            {formatMoney(est.expectedSavings * 12)}/year)
          </p>
          <p className="savings-sub savings-chips">
            <span className="savings-chip">{sizeText(est)} smaller</span>
            <span className="savings-chip">
              {formatPercent(est.costFraction)} lower cost{est.freeTierApplied ? " (free tier applied)" : ""}
            </span>
            <InfoTip label="Why do size and cost drop by different amounts?">
              Cost isn&apos;t proportional to size. {est.freeTierApplied ? `The first ${formatGB(freeGB)} each month are free, so ` : ""}
              {est.freeTierApplied
                ? "shrinking the traffic removes the most expensive part of the bill first, and cost falls faster than size."
                : "Tiered rates get cheaper per GB at higher volumes, so cost and size can fall by different amounts."}
            </InfoTip>
          </p>
          {best && best.id !== "today" && (
            <p className="savings-secondary">
              Best case, every client on {best.label}: {formatMoney(best.monthlyCost)}/month (save {formatMoney(est.bestSavings)}).
            </p>
          )}
        </>
      )}
      <MixEditor mix={mix} onChange={onMixChange} est={est} unit={unit} requests={requests} />
    </div>
  );
}

function MixEditor({ mix, onChange, est, unit }: { mix: ClientMix; onChange: (m: ClientMix) => void; est: Estimate; unit: string; requests: number }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const n = normalizeMix(mix);
  const sumOff = n.sum > 0 && Math.round(n.sum) !== 100;
  const parts = est.mix?.parts ?? [];
  return (
    <div className="mix">
      <button type="button" className="mix-toggle" aria-expanded={open} aria-controls={`${id}-mix`} onClick={() => setOpen((o) => !o)}>
        Client mix: {CLIENTS.map((c, i) => `${c.label.split(" ")[0]} ${Math.round([n.web, n.ios, n.android][i] * 100)}%`).join(" · ")}
        <span className="mix-edit">{open ? "Done" : "Edit"}</span>
      </button>
      {open && (
        <div id={`${id}-mix`} className="mix-body">
          {CLIENTS.map((c) => {
            const part = parts.find((p) => p.key === c.key);
            return (
              <div key={c.key} className="mix-row">
                <label htmlFor={`${id}-${c.key}`}>
                  {c.label} <span className="mix-format">→ {part?.format ?? c.format}</span>
                </label>
                <div className="mix-input">
                  <input
                    id={`${id}-${c.key}`}
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={100}
                    step={5}
                    value={mix[c.key]}
                    onChange={(e) => onChange({ ...mix, [c.key]: Math.max(0, Math.min(100, Number(e.target.value) || 0)) })}
                  />
                  <span aria-hidden="true">%</span>
                </div>
                {part && <span className="mix-bytes">{formatBytes(part.bytes)}</span>}
              </div>
            );
          })}
          <p className="mix-hint">
            {sumOff ? `These add up to ${Math.round(n.sum)}%, so we scale them to 100%. ` : ""}
            Expected size: {formatBytes(est.expectedBytes)} per {unit}.{est.mix?.zstdFallback ? " Zstd isn't available on this server, so web uses Brotli." : ""}
          </p>
        </div>
      )}
    </div>
  );
}

function mixLines(est: Estimate, mix: ClientMix): string[] {
  if (!est.mix || (est.kind !== "savings" && est.kind !== "free-tier")) return [];
  const n = normalizeMix(mix);
  return [
    `Expected with client mix (web ${Math.round(n.web * 100)}% ${est.mix.parts[0].format}, iOS ${Math.round(n.ios * 100)}% Brotli, Android ${Math.round(n.android * 100)}% Gzip): ${formatMoney(est.expectedCost)}/month, saving ${formatMoney(est.expectedSavings)}/month.`,
  ];
}

/* ------------------------------------------------------------------ */
/* Small accessible building blocks                                    */
/* ------------------------------------------------------------------ */

function InfoTip({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return (
    <span className="infotip" ref={ref}>
      <button type="button" className="infotip-btn" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        <span aria-hidden="true">i</span>
        <span className="sr-only">{label}</span>
      </button>
      {open && (
        <span className="infotip-pop" id={id} role="note">
          {children}
        </span>
      )}
    </span>
  );
}

function Disclosure({ title, summary, children }: { title: string; summary?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="card disclosure-card">
      <h3 className="disclosure-heading">
        <button type="button" className="disclosure-btn" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
          <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" className="chev">
            <path d="M5 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{title}</span>
          {summary && <span className="disclosure-summary">{summary}</span>}
        </button>
      </h3>
      <div id={id} className="disclosure-body" hidden={!open}>
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tables and lists                                                    */
/* ------------------------------------------------------------------ */

function CostTable({ rows, bestId, rawBytes, unit, paged }: { rows: DisplayRow[]; bestId: string | null; rawBytes: number; unit: "page" | "response"; paged: boolean }) {
  const sizeLabel = paged ? `Avg size per ${unit}` : `Size per ${unit}`;
  return (
    <div className="table-wrap">
      <table className="cost-table">
        <caption className="sr-only">Size per {unit} and estimated egress cost for each format</caption>
        <thead>
          <tr>
            <th scope="col">Format</th>
            <th scope="col" className="num">
              {sizeLabel}
            </th>
            <th scope="col" className="num">
              Monthly data
            </th>
            <th scope="col" className="num">
              Monthly cost
            </th>
            <th scope="col" className="num">
              Annual cost
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const isBest = r.id === bestId;
            const na = r.bytes === null;
            return (
              <tr key={r.id} className={`${isBest ? "best" : ""} ${r.id === "today" ? "today" : ""}`}>
                <th scope="row" data-label="Format">
                  <span className="fmt-name">
                    {r.label}
                    {isBest && <span className="best-tag">Best</span>}
                  </span>
                  {r.sub && (
                    <span className="fmt-note">
                      {r.sub}
                      {r.ms !== null && r.bytes !== null && r.bytes > 0 ? ` · ${r.ms < 1 ? "<1" : formatNumber(r.ms)} ms` : ""}
                    </span>
                  )}
                  {!na && r.id !== "raw" && r.id !== "today" && rawBytes > 0 && <span className="fmt-ratio">{formatRatio(rawBytes, r.bytes as number)}</span>}
                  {r.mergeNote && <span className="fmt-merge">{r.mergeNote}</span>}
                </th>
                <td className="num" data-label={sizeLabel}>
                  {na ? "–" : <span title={`${formatNumber(r.bytes as number)} bytes`}>{formatBytes(r.bytes as number)}</span>}
                </td>
                <td className="num" data-label="Monthly data">
                  {na ? "–" : formatBytes(r.monthlyBytes)}
                </td>
                <td className="num" data-label="Monthly cost">
                  {na ? "–" : formatMoney(r.monthlyCost)}
                </td>
                <td className="num" data-label="Annual cost">
                  {na ? "–" : formatMoney(r.annualCost)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Bars({ rows, bestId, unit }: { rows: DisplayRow[]; bestId: string | null; unit: string }) {
  const avail = rows.filter((r) => r.bytes !== null);
  const max = Math.max(1, ...avail.map((r) => r.bytes as number));
  return (
    <ul className="bars" aria-label={`Size per ${unit} by format`}>
      {avail.map((r) => {
        const w = Math.max(0.5, ((r.bytes as number) / max) * 100);
        return (
          <li key={r.id} className={r.id === bestId ? "best" : r.id === "today" ? "today" : ""}>
            <span className="bar-label">{r.id === "today" ? "Today" : r.label}</span>
            <span className="bar-track" aria-hidden="true">
              <span className="bar-fill" style={{ width: `${w}%` }} />
            </span>
            <span className="bar-value">{formatBytes(r.bytes as number)}</span>
          </li>
        );
      })}
    </ul>
  );
}

function FindingItem({ f }: { f: Finding }) {
  return (
    <li className={`finding sev-${f.severity}`}>
      <span className={`sev sev-tag-${f.severity}`}>{SEV_LABEL[f.severity]}</span>
      <div>
        <p className="finding-title">{f.title}</p>
        <p className="finding-detail">{f.detail}</p>
      </div>
    </li>
  );
}

function PagesSampled({ pagination, source }: { pagination: PaginationResult | null; source: AnalysisResult["source"] }) {
  if (!pagination || pagination.pages.length === 0) {
    return (
      <p className="hint">
        {source === "live"
          ? "Only one page was measured. Turn pagination on and measure again to sample up to 5 pages."
          : source === "demo"
            ? "This demo isn't paginated, so page 1 stands in for every page."
            : "A pasted sample counts as one average page."}
      </p>
    );
  }

  const { pages, average } = pagination;
  // Show the compression format that's smallest on average.
  const formats = [
    { name: "Brotli", avg: average.brotliBytes, get: (p: (typeof pages)[number]) => p.brotliBytes },
    { name: "Gzip", avg: average.gzipBytes, get: (p: (typeof pages)[number]) => p.gzipBytes },
    ...(average.zstdBytes !== null ? [{ name: "Zstd", avg: average.zstdBytes, get: (p: (typeof pages)[number]) => p.zstdBytes ?? 0 }] : []),
  ];
  const fmt = formats.reduce((x, y) => (y.avg < x.avg ? y : x));
  const variesPct = Math.round(pagination.maxDeviation * 100);
  const avgItems = pages.every((p) => p.items !== null) ? pages.reduce((n, p) => n + (p.items ?? 0), 0) / pages.length : null;

  return (
    <>
      <div className="table-wrap">
        <table className="pages-table">
          <caption className="sr-only">Size of each sampled page</caption>
          <thead>
            <tr>
              <th scope="col">Page</th>
              <th scope="col" className="num">
                Items
              </th>
              <th scope="col" className="num">
                Raw size
              </th>
              <th scope="col" className="num">
                {fmt.name}
              </th>
            </tr>
          </thead>
          <tbody>
            {pages.map((p) => (
              <tr key={p.page}>
                <th scope="row">{p.page}</th>
                <td className="num">{p.items === null ? "–" : formatNumber(p.items)}</td>
                <td className="num">{formatBytes(p.rawBytes)}</td>
                <td className="num">{formatBytes(fmt.get(p))}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">Average</th>
              <td className="num">{avgItems === null ? "–" : avgItems.toFixed(avgItems % 1 ? 1 : 0)}</td>
              <td className="num">{formatBytes(average.rawBytes)}</td>
              <td className="num">{formatBytes(fmt.avg)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      {pagination.maxDeviation > VARIATION_THRESHOLD && (
        <p className="notice">
          Page sizes vary by up to {variesPct}% from the average, so the estimate is less certain. Check that these pages are typical of what users load.
        </p>
      )}
      {pagination.stopReason && (
        <p className="hint">
          {formatStopReason(pagination.stopReason)}
          {pages.length === 1 ? " Costs use page 1 only." : ""}
        </p>
      )}
      <p className="hint">
        Paginated by <code>{pagination.param}</code> ({pagination.kind === "offset" ? "offset" : pagination.kind === "page" ? "page number" : "cursor"}). Up to{" "}
        {MAX_SAMPLED_PAGES} pages, fetched one at a time.
      </p>
    </>
  );
}

/** "page 4 returned an empty list" -> "Stopped early: page 4 returned an empty list." */
function formatStopReason(reason: string): string {
  const text = reason.startsWith("stopped") ? reason.charAt(0).toUpperCase() + reason.slice(1) : `Stopped early: ${reason}`;
  return /[.!?]$/.test(text) ? text : `${text}.`;
}
