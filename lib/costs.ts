import { monthlyCostForBytes, type Pricing } from "./pricing";
import { formatBytes, formatMoney, formatNumber, formatRatio } from "./format";
import type { AnalysisResult } from "./types";

export type RowId = "today" | "raw" | "minified" | "gzip" | "brotli" | "zstd";

export interface CostRow {
  id: RowId;
  label: string;
  note?: string;
  bytes: number | null; // null = not available
  monthlyBytes: number;
  monthlyCost: number;
  annualCost: number;
  ms: number | null;
}

export interface CostSummary {
  rows: CostRow[];
  best: CostRow | null;
  today: CostRow;
  monthlySavings: number;
  annualSavings: number;
}

const ENC_NAMES: Record<string, string> = { gzip: "Gzip", br: "Brotli", zstd: "Zstd", deflate: "Deflate" };

export function encodingName(enc: string | null): string {
  return enc ? (ENC_NAMES[enc] ?? enc) : "uncompressed";
}

/** Sessions-based traffic for paginated endpoints. */
export interface SessionTraffic {
  sessions: number;
  pagesPerSession: number;
}

/** Per-response sizes the cost rows use: page 1, or the mean of sampled pages. */
export interface EffectiveSizes {
  wireBytes: number;
  rawBytes: number;
  minifiedBytes: number | null;
  gzipBytes: number | null;
  brotliBytes: number | null;
  zstdBytes: number | null;
  averaged: boolean;
}

export function effectiveSizes(a: AnalysisResult, usePageAverages: boolean): EffectiveSizes {
  if (usePageAverages && a.pagination && a.pagination.pages.length > 0) {
    const avg = a.pagination.average;
    return {
      wireBytes: avg.wireBytes,
      rawBytes: avg.rawBytes,
      minifiedBytes: a.isJson ? avg.minifiedBytes : null,
      gzipBytes: avg.gzipBytes,
      brotliBytes: avg.brotliBytes,
      zstdBytes: a.zstd.available ? avg.zstdBytes : null,
      averaged: true,
    };
  }
  return {
    wireBytes: a.wireBytes,
    rawBytes: a.rawBytes,
    minifiedBytes: a.isJson ? a.minifiedBytes : null,
    gzipBytes: a.gzip.bytes,
    brotliBytes: a.brotli.bytes,
    zstdBytes: a.zstd.available ? a.zstd.bytes : null,
    averaged: false,
  };
}

/**
 * Cost rows for one response size × `monthlyRequests`.
 * With pagination on, pass sessions × pages per session as `monthlyRequests`
 * and `usePageAverages = true` so each row uses the mean sampled page size.
 */
export function computeCosts(a: AnalysisResult, monthlyRequests: number, pricing: Pricing, usePageAverages = false): CostSummary {
  const make = (id: RowId, label: string, bytes: number | null, ms: number | null = null, note?: string): CostRow => {
    const monthlyBytes = bytes === null ? 0 : bytes * monthlyRequests;
    const monthlyCost = bytes === null ? 0 : monthlyCostForBytes(monthlyBytes, pricing);
    return { id, label, note, bytes, monthlyBytes, monthlyCost, annualCost: monthlyCost * 12, ms };
  };

  const todayNote = a.source === "live" ? `as served (${encodingName(a.contentEncoding)})` : a.source === "demo" ? `demo API (${encodingName(a.contentEncoding)})` : `assumed ${encodingName(a.contentEncoding)}`;
  const sz = effectiveSizes(a, usePageAverages);
  const today = make("today", "What you send today", sz.wireBytes, null, todayNote);
  const rows: CostRow[] = [today, make("raw", "Uncompressed", sz.rawBytes)];
  if (sz.minifiedBytes !== null) rows.push(make("minified", "Minified", sz.minifiedBytes, null, "JSON only"));
  rows.push(make("gzip", "Gzip", sz.gzipBytes, a.gzip.ms, "level 6"));
  rows.push(make("brotli", "Brotli", sz.brotliBytes, a.brotli.ms, "quality 5"));
  rows.push(make("zstd", "Zstd", sz.zstdBytes, a.zstd.ms, a.zstd.available ? "level 3" : "not available on this runtime"));

  const candidates = rows.filter((r) => r.id !== "today" && r.bytes !== null);
  let best: CostRow | null = null;
  for (const r of candidates) if (!best || (r.bytes as number) < (best.bytes as number)) best = r;
  // If today is already as good as the best option, today is best.
  if (best && today.bytes !== null && today.bytes <= (best.bytes as number)) best = today;

  const monthlySavings = best ? Math.max(0, today.monthlyCost - best.monthlyCost) : 0;
  return { rows, best, today, monthlySavings, annualSavings: monthlySavings * 12 };
}

export function buildCopySummary(
  a: AnalysisResult,
  s: CostSummary,
  monthlyRequests: number,
  pricing: Pricing,
  defaults: boolean,
  link?: string,
  sessions?: SessionTraffic | null,
): string {
  const lines: string[] = [];
  const paged = !!sessions;
  const sz = effectiveSizes(a, paged);
  lines.push("API Egress Cost Calculator");
  if (sessions) {
    lines.push(
      `Traffic: ${formatNumber(sessions.sessions)} sessions/month × ${sessions.pagesPerSession} pages = ${formatNumber(monthlyRequests)} page requests/month`,
    );
    const sampled = a.pagination?.pages.length ?? 1;
    lines.push(`Pages sampled: ${sampled}${sessions.pagesPerSession > sampled ? ` (extrapolated to ${sessions.pagesPerSession})` : ""}`);
  } else {
    lines.push(`Traffic: ${formatNumber(monthlyRequests)} requests/month`);
  }
  lines.push(
    `${paged ? "Average page" : "Response"}: ${formatBytes(sz.rawBytes)} uncompressed${a.isJson ? " JSON" : ""}, ${formatBytes(sz.wireBytes)} on the wire (${encodingName(a.contentEncoding)})`,
  );
  lines.push("");
  for (const r of s.rows) {
    if (r.bytes === null) {
      lines.push(`- ${r.label}: n/a`);
      continue;
    }
    const ratio = r.id === "raw" ? "" : ` (${formatRatio(sz.rawBytes, r.bytes)})`;
    lines.push(`- ${r.label}: ${formatBytes(r.bytes)}${ratio} → ${formatBytes(r.monthlyBytes)}/mo, ${formatMoney(r.monthlyCost, pricing.currency)}/mo`);
  }
  lines.push("");
  if (s.best && s.best.id !== "today" && s.monthlySavings > 0) {
    lines.push(`Switching to ${s.best.label} could save ${formatMoney(s.monthlySavings, pricing.currency)}/month (${formatMoney(s.annualSavings, pricing.currency)}/year).`);
  } else {
    lines.push("No egress savings available at this traffic level.");
  }
  lines.push(defaults ? "Pricing: AWS data transfer out, us-east-1 (tiered)." : "Pricing: custom tiers.");
  lines.push(
    paged
      ? "Monthly data = sessions × pages per session × average page size (1 GB = 10^9 bytes)."
      : "Monthly data = response size × requests (1 GB = 10^9 bytes).",
  );
  if (link) lines.push(`Try it: ${link}`);
  return lines.join("\n");
}
