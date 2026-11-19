"use client";

import { useMemo, useState } from "react";
import { buildCopySummary, computeCosts, effectiveSizes, type CostRow, type SessionTraffic } from "../lib/costs";
import { formatBytes, formatMoney, formatNumber, formatRatio } from "../lib/format";
import { MAX_SAMPLED_PAGES } from "../lib/pagination";
import type { Pricing } from "../lib/pricing";
import type { AnalysisResult, Finding, PaginationResult, Severity } from "../lib/types";

interface Props {
  result: AnalysisResult | null;
  label: string;
  requests: number;
  pricing: Pricing;
  usingDefaults: boolean;
  animate?: boolean;
  /** Set when pagination is on: requests = sessions × pages per session. */
  paging?: SessionTraffic | null;
}

/** Above this deviation from the mean, warn that page sizes vary a lot. */
const VARIATION_THRESHOLD = 0.3;

const SEV_ORDER: Record<Severity, number> = { high: 0, medium: 1, info: 2 };
const SEV_LABEL: Record<Severity, string> = { high: "High", medium: "Medium", info: "Info" };

export default function Results({ result, label, requests, pricing, usingDefaults, animate = false, paging = null }: Props) {
  const [copied, setCopied] = useState("");
  const paged = !!paging;
  const summary = useMemo(() => (result ? computeCosts(result, requests, pricing, paged) : null), [result, requests, pricing, paged]);

  if (!result || !summary) {
    return (
      <div className="card empty-state">
        <h2>No results yet</h2>
        <p>Paste a curl command, fill in the form, or pick a demo, then press Analyze.</p>
      </div>
    );
  }

  const cur = pricing.currency;
  const a = result;
  const findings = [...a.findings].sort((x, y) => SEV_ORDER[x.severity] - SEV_ORDER[y.severity]);
  const statusOk = a.status === null || (a.status >= 200 && a.status < 300);
  const sizes = effectiveSizes(a, paged);
  const sampled = a.pagination?.pages.length ?? 1;
  const unit = paged ? "page" : "response";

  async function copy() {
    const link = typeof window !== "undefined" ? window.location.origin : undefined;
    const text = buildCopySummary(a, summary!, requests, pricing, usingDefaults, link, paging);
    try {
      await navigator.clipboard.writeText(text);
      setCopied("Copied. Paste it into Slack, an issue or a post.");
    } catch {
      setCopied("Couldn't access the clipboard. Select the table and copy manually.");
    }
    setTimeout(() => setCopied(""), 4000);
  }

  return (
    <div className={`results-inner${animate ? " fade-in" : ""}`}>
      <div className="results-head">
        <div>
          <p className="eyebrow">Results</p>
          <h2 className="results-title">{label}</h2>
          <p className="meta">
            {a.status !== null && <span className={`pill ${statusOk ? "" : "pill-warn"}`}>HTTP {a.status}</span>}
            {a.contentType && <span className="pill">{a.contentType.split(";")[0]}</span>}
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
          <span className="share-msg" role="status">
            {copied}
          </span>
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
          <SavingsCard summary={summary} currency={cur} requests={requests} unit={unit} />

          {!statusOk && !a.redirectTo && (
            <p className="notice">
              The API returned HTTP {a.status}. We analyzed the body it sent, which may be an error message rather than your real data.
            </p>
          )}
          {!a.isJson && !a.alreadyCompressedMedia && (
            <p className="notice">This response isn&apos;t JSON, so there&apos;s no minified row. Compression results still apply.</p>
          )}

          <div className="card">
            <h3 className="card-title">Cost by format</h3>
            <CostTable rows={summary.rows} bestId={summary.best?.id ?? null} rawBytes={sizes.rawBytes} currency={cur} unit={unit} />
            {paging ? (
              <p className="hint">
                At {formatNumber(requests)} page requests/month ({formatNumber(paging.sessions)} sessions × {paging.pagesPerSession} pages). Each row uses the
                average size of {sampled} sampled page{sampled === 1 ? "" : "s"}.
                {paging.pagesPerSession > sampled && (
                  <>
                    {" "}
                    <strong>
                      Based on {sampled} sampled page{sampled === 1 ? "" : "s"}, extrapolated to {paging.pagesPerSession}.
                    </strong>
                  </>
                )}{" "}
                Compression rows compress the body as served.
              </p>
            ) : (
              <p className="hint">
                At {formatNumber(requests)} requests/month. Compression rows compress the body as served (not minified). Times are single-run on our server.
              </p>
            )}
          </div>

          {paging && <PagesSampled pagination={a.pagination ?? null} source={a.source} />}

          <div className="card">
            <h3 className="card-title">Size comparison</h3>
            <Bars rows={summary.rows} bestId={summary.best?.id ?? null} />
            <p className="hint">
              Browsers can accept Zstd. iOS apps typically get Brotli and Android apps Gzip by default, so serve the best format each client supports.
            </p>
          </div>
        </>
      )}

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

      <div className="card details">
        <details>
          <summary>Response preview</summary>
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
        </details>
        <details>
          <summary>Response headers</summary>
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
            <p className="hint">No headers for pasted samples.</p>
          )}
          <p className="hint">Only non-sensitive headers are shown. Cookies are never returned.</p>
        </details>
      </div>
    </div>
  );
}

function SavingsCard({
  summary,
  currency,
  requests,
  unit,
}: {
  summary: ReturnType<typeof computeCosts>;
  currency: string;
  requests: number;
  unit: "page" | "response";
}) {
  const { best, today, monthlySavings, annualSavings } = summary;
  const bestIsToday = !best || best.id === "today";

  if (requests === 0) {
    return (
      <div className="savings savings-neutral">
        <p className="savings-kicker">Set your traffic</p>
        <p className="savings-big">{unit === "page" ? "Enter monthly sessions" : "Enter monthly requests"}</p>
        <p className="savings-sub">
          {unit === "page" ? "Add how many sessions load this feed per month to see costs." : "Add how many times this endpoint is called per month to see costs."}
        </p>
      </div>
    );
  }

  if (bestIsToday) {
    return (
      <div className="savings savings-neutral">
        <p className="savings-kicker">Already efficient</p>
        <p className="savings-big">{formatMoney(today.monthlyCost, currency)}/month</p>
        <p className="savings-sub">You already send the smallest format we tested ({formatBytes(today.bytes ?? 0)} per {unit}).</p>
      </div>
    );
  }

  if (monthlySavings <= 0.004) {
    return (
      <div className="savings savings-neutral">
        <p className="savings-kicker">Within the free tier</p>
        <p className="savings-big">{formatMoney(0, currency)} savings at this traffic</p>
        <p className="savings-sub">
          {formatBytes(today.monthlyBytes)}/month fits in the free allowance. {best!.label} would still make each {unit}{" "}
          {formatRatio(today.bytes ?? 0, best!.bytes ?? 0).replace(/,.*/, "")} and load faster. Try a higher traffic preset.
        </p>
      </div>
    );
  }

  const pct = today.monthlyCost > 0 ? Math.round((monthlySavings / today.monthlyCost) * 100) : 0;
  return (
    <div className="savings">
      <p className="savings-kicker">Switch to {best!.label}</p>
      <p className="savings-big">
        You could save {formatMoney(monthlySavings, currency)}/month <span className="savings-annual">({formatMoney(annualSavings, currency)}/year)</span>
      </p>
      <p className="savings-sub">
        {formatMoney(today.monthlyCost, currency)} → {formatMoney(best!.monthlyCost, currency)} per month ({pct}% less) · {formatBytes(today.bytes ?? 0)} →{" "}
        {formatBytes(best!.bytes ?? 0)} per {unit}
      </p>
    </div>
  );
}

function CostTable({
  rows,
  bestId,
  rawBytes,
  currency,
  unit,
}: {
  rows: CostRow[];
  bestId: string | null;
  rawBytes: number;
  currency: string;
  unit: "page" | "response";
}) {
  const sizeLabel = unit === "page" ? "Avg bytes / page" : "Bytes / response";
  return (
    <div className="table-wrap">
      <table className="cost-table">
        <caption className="sr-only">Response size and egress cost per format</caption>
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
                  <span className="fmt-note">
                    {r.note}
                    {r.ms !== null && r.bytes !== null && r.bytes > 0 ? ` · ${r.ms < 1 ? "<1" : r.ms.toFixed(0)} ms` : ""}
                  </span>
                  {!na && r.id !== "raw" && rawBytes > 0 && <span className="fmt-ratio">{formatRatio(rawBytes, r.bytes as number)}</span>}
                </th>
                <td className="num" data-label={sizeLabel}>
                  {na ? "–" : <span title={`${formatNumber(r.bytes as number)} bytes`}>{formatBytes(r.bytes as number)}</span>}
                </td>
                <td className="num" data-label="Monthly data">
                  {na ? "–" : formatBytes(r.monthlyBytes)}
                </td>
                <td className="num" data-label="Monthly cost">
                  {na ? "–" : formatMoney(r.monthlyCost, currency)}
                </td>
                <td className="num" data-label="Annual cost">
                  {na ? "–" : formatMoney(r.annualCost, currency)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Bars({ rows, bestId }: { rows: CostRow[]; bestId: string | null }) {
  const avail = rows.filter((r) => r.bytes !== null);
  const max = Math.max(1, ...avail.map((r) => r.bytes as number));
  return (
    <ul className="bars" aria-label="Bytes per response by format">
      {avail.map((r) => {
        const w = Math.max(0.5, ((r.bytes as number) / max) * 100);
        return (
          <li key={r.id} className={r.id === bestId ? "best" : r.id === "today" ? "today" : ""}>
            <span className="bar-label">{r.label}</span>
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
      <div className="card">
        <h3 className="card-title">Pages sampled</h3>
        <p className="hint">
          {source === "live"
            ? "Only one page was measured. Turn pagination on and press Analyze again to sample up to 5 pages."
            : source === "demo"
              ? "This demo isn't paginated, so page 1 stands in for every page."
              : "A pasted sample counts as one average page."}
        </p>
      </div>
    );
  }

  const { pages, average } = pagination;
  // Show the compression format that's smallest on average.
  const formats = [
    { name: "Brotli", avg: average.brotliBytes, get: (p: (typeof pages)[number]) => p.brotliBytes },
    { name: "Gzip", avg: average.gzipBytes, get: (p: (typeof pages)[number]) => p.gzipBytes },
    ...(average.zstdBytes !== null ? [{ name: "Zstd", avg: average.zstdBytes, get: (p: (typeof pages)[number]) => p.zstdBytes ?? 0 }] : []),
  ];
  const fmt = formats.reduce((a, b) => (b.avg < a.avg ? b : a));
  const variesPct = Math.round(pagination.maxDeviation * 100);
  const avgItems = pages.every((p) => p.items !== null) ? pages.reduce((n, p) => n + (p.items ?? 0), 0) / pages.length : null;

  return (
    <div className="card">
      <h3 className="card-title">Pages sampled</h3>
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
    </div>
  );
}

/** "page 4 returned an empty list" -> "Stopped early: page 4 returned an empty list." */
function formatStopReason(reason: string): string {
  const text = reason.startsWith("stopped") ? reason.charAt(0).toUpperCase() + reason.slice(1) : `Stopped early: ${reason}`;
  return /[.!?]$/.test(text) ? text : `${text}.`;
}
