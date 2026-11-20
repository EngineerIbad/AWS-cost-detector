/**
 * Turns a measured response + traffic + pricing into what the results UI says.
 * One place computes every headline number, so the summary bar, recommendation
 * card, live announcement and copied text can't disagree.
 */
import { computeCosts, encodingName, type CostRow, type CostSummary } from "./costs";
import { normalizeEncoding } from "./findings";
import { formatMoney, sizeReduction } from "./format";
import { activeRates, monthlyCostForBytes, type PricingOptions } from "./pricing";
import type { AnalysisResult } from "./types";

/* ------------------------------------------------------------------ */
/* Client mix                                                          */
/* ------------------------------------------------------------------ */

/** Share of traffic per client type, in percent. Normalized to 100% when used. */
export interface ClientMix {
  web: number;
  ios: number;
  android: number;
}

export const DEFAULT_CLIENT_MIX: ClientMix = { web: 40, ios: 30, android: 30 };

export const CLIENTS = [
  { key: "web", label: "Web browsers", format: "Zstd" },
  { key: "ios", label: "iOS apps", format: "Brotli" },
  { key: "android", label: "Android apps", format: "Gzip" },
] as const;

export function normalizeMix(m: ClientMix): { web: number; ios: number; android: number; sum: number } {
  const clean = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);
  const web = clean(m.web);
  const ios = clean(m.ios);
  const android = clean(m.android);
  const sum = web + ios + android;
  if (sum <= 0) return { ...normalizeMix(DEFAULT_CLIENT_MIX), sum: 0 };
  return { web: web / sum, ios: ios / sum, android: android / sum, sum };
}

export interface MixPart {
  key: "web" | "ios" | "android";
  label: string;
  format: string;
  share: number;
  bytes: number;
}

export interface MixResult {
  /** Blended bytes per response. */
  bytes: number;
  monthlyBytes: number;
  monthlyCost: number;
  parts: MixPart[];
  /** Zstd isn't available on this runtime, so web clients were given Brotli. */
  zstdFallback: boolean;
}

/**
 * Expected cost when each client gets the best format it asks for. Bytes are
 * blended first and the tiers applied once, because tiered pricing isn't linear.
 */
export function mixCost(s: CostSummary, mix: ClientMix, requests: number, pricing: PricingOptions): MixResult | null {
  const by = (id: CostRow["id"]) => s.rows.find((r) => r.id === id)?.bytes ?? null;
  const gzip = by("gzip");
  const brotli = by("brotli");
  const zstd = by("zstd");
  if (gzip === null || brotli === null) return null;
  const n = normalizeMix(mix);
  const zstdFallback = zstd === null;
  const parts: MixPart[] = [
    { key: "web", label: "Web browsers", format: zstdFallback ? "Brotli" : "Zstd", share: n.web, bytes: zstd ?? brotli },
    { key: "ios", label: "iOS apps", format: "Brotli", share: n.ios, bytes: brotli },
    { key: "android", label: "Android apps", format: "Gzip", share: n.android, bytes: gzip },
  ];
  const bytes = parts.reduce((acc, p) => acc + p.share * p.bytes, 0);
  const monthlyBytes = bytes * requests;
  return { bytes, monthlyBytes, monthlyCost: monthlyCostForBytes(monthlyBytes, pricing), parts, zstdFallback };
}

/* ------------------------------------------------------------------ */
/* Cost table rows, with duplicates collapsed                          */
/* ------------------------------------------------------------------ */

export interface DisplayRow extends CostRow {
  /** Second line under the label, e.g. "uncompressed" or "level 6". */
  sub?: string;
  /** Explains a collapsed duplicate, e.g. "Minifying won't help, it's already minified." */
  mergeNote?: string;
}

/**
 * Rows for "Cost by format". Rows with exactly the same size as one above
 * them are folded into it with a short note, so the table never repeats itself.
 */
export function displayRows(s: CostSummary, a: AnalysisResult): DisplayRow[] {
  const enc = normalizeEncoding(a.contentEncoding);
  const servedName = encodingName(enc);
  const get = (id: CostRow["id"]) => s.rows.find((r) => r.id === id);
  const today = get("today")!;
  const raw = get("raw");
  const minified = get("minified");

  const out: DisplayRow[] = [];
  const todayRow: DisplayRow = {
    ...today,
    label: "What you send today",
    sub: a.source === "payload" ? `${servedName} (as you selected)` : servedName,
  };
  out.push(todayRow);

  const notes: string[] = [];
  const minSameAsRaw = !!minified && minified.bytes !== null && raw?.bytes === minified.bytes;

  if (raw && raw.bytes === today.bytes) {
    // Today is the uncompressed body: one row, not two.
    if (minSameAsRaw) notes.push("Minifying won't help, it's already minified.");
  } else if (raw) {
    out.push({ ...raw, sub: "no compression", mergeNote: minSameAsRaw ? "Already minified, so minifying won't help." : undefined });
  }
  if (minified && !minSameAsRaw && minified.bytes !== today.bytes) out.push({ ...minified, sub: "JSON whitespace removed" });

  for (const id of ["gzip", "brotli", "zstd"] as const) {
    const r = get(id);
    if (!r) continue;
    if (r.bytes !== null && r.bytes === today.bytes) {
      notes.push(`Same size as ${r.label} (${r.note}).`);
      continue;
    }
    out.push({ ...r, sub: r.note });
  }
  if (notes.length) todayRow.mergeNote = notes.join(" ");
  return out;
}

/* ------------------------------------------------------------------ */
/* Headline estimate                                                   */
/* ------------------------------------------------------------------ */

export type EstimateKind =
  | "no-traffic" // requests = 0
  | "empty" // nothing to measure
  | "savings" // compression would save money at this traffic
  | "free-tier" // compression helps size, but this traffic is inside the free allowance
  | "already-compressed" // compressed today; a better format would save more
  | "already-best"; // today is already the smallest format tested

export interface Estimate {
  kind: EstimateKind;
  summary: CostSummary;
  rows: DisplayRow[];
  today: CostRow;
  /** Best single format (best case). */
  best: CostRow | null;
  bestSavings: number;
  /** Realistic expected cost with the client mix. */
  mix: MixResult | null;
  expectedCost: number;
  expectedBytes: number;
  expectedSavings: number;
  /** Size reduction today → expected bytes per response (0.73 = 73% smaller). */
  sizeFraction: number;
  /** Cost reduction today → expected monthly cost. */
  costFraction: number;
  /** The free allowance is on and some of it is used this month. */
  freeTierApplied: boolean;
  /** Normalized Content-Encoding served today, or null. */
  servedEncoding: string | null;
  /** For "free-tier": the same estimate at 10x traffic, so there's a number to look at. */
  scaled: { requests: number; todayCost: number; expectedCost: number } | null;
}

export function buildEstimate(
  a: AnalysisResult,
  requests: number,
  pricing: PricingOptions,
  paged: boolean,
  mix: ClientMix = DEFAULT_CLIENT_MIX,
): Estimate {
  const summary = computeCosts(a, requests, pricing, paged);
  const rows = displayRows(summary, a);
  const { today, best } = summary;
  const servedEncoding = normalizeEncoding(a.contentEncoding);
  const m = mixCost(summary, mix, requests, pricing);

  // Expected = the client mix when it beats today, otherwise today.
  const useMix = !!m && m.bytes < (today.bytes ?? 0);
  const expectedBytes = useMix ? m!.bytes : (today.bytes ?? 0);
  const expectedCost = useMix ? m!.monthlyCost : today.monthlyCost;
  const expectedSavings = Math.max(0, today.monthlyCost - expectedCost);
  const bestSavings = summary.monthlySavings;
  const todayBytes = today.bytes ?? 0;
  const freeGB = activeRates(pricing).freeGB;

  const base = {
    summary,
    rows,
    today,
    best,
    bestSavings,
    mix: m,
    expectedCost,
    expectedBytes,
    expectedSavings,
    sizeFraction: todayBytes > 0 ? 1 - expectedBytes / todayBytes : 0,
    costFraction: today.monthlyCost > 0 ? expectedSavings / today.monthlyCost : 0,
    freeTierApplied: pricing.freeTier && freeGB > 0 && today.monthlyBytes > 0,
    servedEncoding,
    scaled: null,
  };

  if (a.rawBytes === 0) return { ...base, kind: "empty" };
  if (requests === 0) return { ...base, kind: "no-traffic" };

  const bestIsToday = !best || best.id === "today";
  if (servedEncoding) {
    // If the best format is the one already served (just a different level), there's nothing to switch to.
    const sameFormat = !!best && best.label === encodingName(servedEncoding);
    return { ...base, kind: bestIsToday || sameFormat ? "already-best" : "already-compressed" };
  }
  if (bestIsToday || !useMix) return { ...base, kind: "already-best" };
  if (expectedSavings <= 0.004) {
    // Show the first 10x step (10x, 100x, 1,000x) where today's bill is at least $1,
    // so the comparison is never "$0.00 → $0.00".
    let scaled: Estimate["scaled"] = null;
    for (const k of [10, 100, 1000]) {
      const big = requests * k;
      const sk = computeCosts(a, big, pricing, paged);
      if (sk.today.monthlyCost < 1) continue;
      const mk = mixCost(sk, mix, big, pricing);
      scaled = { requests: big, todayCost: sk.today.monthlyCost, expectedCost: mk ? Math.min(mk.monthlyCost, sk.today.monthlyCost) : sk.today.monthlyCost };
      break;
    }
    return { ...base, kind: "free-tier", scaled };
  }
  return { ...base, kind: "savings" };
}

/** One sentence for the aria-live region. */
export function announceEstimate(e: Estimate): string {
  switch (e.kind) {
    case "savings":
      return `Estimated savings: ${formatMoney(e.expectedSavings)} per month.`;
    case "free-tier":
      return "Estimated savings: $0.00 per month. This traffic fits in the free tier.";
    case "already-compressed":
      return e.bestSavings > 0.004
        ? `Already compressed with ${encodingName(e.servedEncoding)}. ${e.best?.label ?? "A better format"} would save another ${formatMoney(e.bestSavings)} per month.`
        : `Already compressed with ${encodingName(e.servedEncoding)}. Estimated cost: ${formatMoney(e.today.monthlyCost)} per month.`;
    case "already-best":
      return `Estimated cost: ${formatMoney(e.today.monthlyCost)} per month. ${e.servedEncoding ? `Already compressed with ${encodingName(e.servedEncoding)}, the best format tested.` : "Already the smallest format tested."}`;
    case "no-traffic":
      return "Enter your monthly traffic to see costs.";
    default:
      return "The response body was empty.";
  }
}

/** "73% smaller" from the same bytes the summary uses. */
export function sizeText(e: Estimate): string {
  return sizeReduction(e.today.bytes ?? 0, e.expectedBytes)?.pctText ?? "0%";
}
