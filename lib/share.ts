/**
 * Share links. A share URL rebuilds the results view from sizes alone.
 *
 * Allow-list only: the URL carries byte counts per format, traffic, pagination
 * counts, pricing model, free-tier toggle, a bucketed content type and the
 * served encoding. It is built from a `ShareState`, which has no field that
 * could hold a URL, header, cookie, token, curl command or response body.
 */
import { computeCosts, effectiveSizes, type CostSummary } from "./costs";
import { formatBytes, formatNumber } from "./format";
import { MAX_PAGES_PER_SESSION, pageRequests } from "./pagination";
import { decodeRates, DEFAULT_PRICING, encodeRates, getModel, isCustom, isPricingModelId, type PricingOptions } from "./pricing";
import type { AnalysisResult } from "./types";

export const SHARE_PATH = "/s";
const MAX_BYTES = 100 * 1024 * 1024;
const MAX_COUNT = 1e13;

const CONTENT_TYPES = [
  "application/json",
  "application/x-ndjson",
  "application/xml",
  "text/xml",
  "text/html",
  "text/plain",
  "text/csv",
  "text/javascript",
  "application/javascript",
  "application/octet-stream",
] as const;
export type ShareContentType = (typeof CONTENT_TYPES)[number] | "other";

const ENCODINGS = ["none", "gzip", "br", "zstd", "deflate", "other"] as const;
export type ShareEncoding = (typeof ENCODINGS)[number];

export interface ShareSizes {
  wire: number;
  raw: number;
  minified: number | null;
  gzip: number;
  brotli: number;
  zstd: number | null;
}

export interface ShareState {
  sizes: ShareSizes;
  encoding: ShareEncoding;
  contentType: ShareContentType;
  /** Monthly requests (used when `paging` is null). */
  requests: number;
  paging: { sessions: number; pagesPerSession: number; sampledPages: number } | null;
  pricing: PricingOptions;
}

/** Reduce a Content-Type header to a fixed set, so vendor-specific names never leak. */
export function bucketContentType(ct: string | null): ShareContentType {
  if (!ct) return "other";
  const mime = ct.split(";")[0].trim().toLowerCase();
  if ((CONTENT_TYPES as readonly string[]).includes(mime)) return mime as ShareContentType;
  if (mime.endsWith("+json") || mime.endsWith("/json")) return "application/json";
  if (mime.endsWith("+xml")) return "application/xml";
  return "other";
}

export function bucketEncoding(enc: string | null): ShareEncoding {
  if (!enc) return "none";
  const parts = enc.toLowerCase().split(",").map((s) => s.trim()).filter((s) => s && s !== "identity");
  if (parts.length === 0) return "none";
  if (parts.length > 1) return "other";
  const e = parts[0] === "x-gzip" ? "gzip" : parts[0];
  return (ENCODINGS as readonly string[]).includes(e) ? (e as ShareEncoding) : "other";
}

export interface ShareContext {
  requests: number;
  paging: { sessions: number; pagesPerSession: number } | null;
  pricing: PricingOptions;
}

/** Pick the shareable numbers out of an analysis. Nothing else is copied. */
export function shareStateFromResult(a: AnalysisResult, ctx: ShareContext): ShareState {
  const sz = effectiveSizes(a, !!ctx.paging);
  return {
    sizes: {
      wire: Math.round(sz.wireBytes),
      raw: Math.round(sz.rawBytes),
      minified: sz.minifiedBytes === null ? null : Math.round(sz.minifiedBytes),
      gzip: Math.round(sz.gzipBytes ?? sz.rawBytes),
      brotli: Math.round(sz.brotliBytes ?? sz.rawBytes),
      zstd: sz.zstdBytes === null ? null : Math.round(sz.zstdBytes),
    },
    encoding: bucketEncoding(a.contentEncoding),
    contentType: bucketContentType(a.contentType),
    requests: Math.round(ctx.requests),
    paging: ctx.paging
      ? {
          sessions: Math.round(ctx.paging.sessions),
          pagesPerSession: ctx.paging.pagesPerSession,
          sampledPages: a.pagination?.pages.length ?? a.sampledPages ?? 1,
        }
      : null,
    pricing: {
      model: ctx.pricing.model,
      freeTier: ctx.pricing.freeTier,
      custom: isCustom(ctx.pricing) ? ctx.pricing.custom : null,
    },
  };
}

export function encodeShare(s: ShareState): URLSearchParams {
  const p = new URLSearchParams();
  p.set("v", "1");
  p.set("w", String(s.sizes.wire));
  p.set("u", String(s.sizes.raw));
  if (s.sizes.minified !== null) p.set("mn", String(s.sizes.minified));
  p.set("gz", String(s.sizes.gzip));
  p.set("br", String(s.sizes.brotli));
  if (s.sizes.zstd !== null) p.set("zs", String(s.sizes.zstd));
  p.set("e", s.encoding);
  p.set("ct", s.contentType);
  if (s.paging) {
    p.set("s", String(s.paging.sessions));
    p.set("pps", String(s.paging.pagesPerSession));
    p.set("sp", String(s.paging.sampledPages));
  } else {
    p.set("r", String(s.requests));
  }
  p.set("pm", s.pricing.model);
  p.set("ft", s.pricing.freeTier ? "1" : "0");
  // Custom rates are numbers only ("freeGB|limit:price,...,inf:price"); see encodeRates.
  if (isCustom(s.pricing)) p.set("cr", encodeRates(s.pricing.custom!));
  return p;
}

export function sharePath(s: ShareState): string {
  return `${SHARE_PATH}?${encodeShare(s).toString()}`;
}

type ParamSource = URLSearchParams | Record<string, string | string[] | undefined>;

function getter(src: ParamSource): (k: string) => string | null {
  if (src instanceof URLSearchParams) return (k) => src.get(k);
  return (k) => {
    const v = src[k];
    return Array.isArray(v) ? (v[0] ?? null) : (v ?? null);
  };
}

function int(v: string | null, max: number, min = 0): number | null {
  if (v === null || !/^\d{1,16}$/.test(v)) return null;
  const n = Number(v);
  return Number.isSafeInteger(n) && n >= min && n <= max ? n : null;
}

/** Parse and validate share params. Returns null if anything required is missing or out of range. */
export function decodeShare(src: ParamSource): ShareState | null {
  const g = getter(src);
  if (g("v") !== "1") return null;
  const wire = int(g("w"), MAX_BYTES);
  const raw = int(g("u"), MAX_BYTES);
  const gzip = int(g("gz"), MAX_BYTES);
  const brotli = int(g("br"), MAX_BYTES);
  if (wire === null || raw === null || gzip === null || brotli === null) return null;
  const minified = g("mn") === null ? null : int(g("mn"), MAX_BYTES);
  const zstd = g("zs") === null ? null : int(g("zs"), MAX_BYTES);
  if ((g("mn") !== null && minified === null) || (g("zs") !== null && zstd === null)) return null;

  const e = g("e") ?? "none";
  const encoding: ShareEncoding = (ENCODINGS as readonly string[]).includes(e) ? (e as ShareEncoding) : "other";
  const ct = g("ct") ?? "other";
  const contentType: ShareContentType = (CONTENT_TYPES as readonly string[]).includes(ct) ? (ct as ShareContentType) : "other";

  let paging: ShareState["paging"] = null;
  let requests = 0;
  if (g("s") !== null) {
    const sessions = int(g("s"), MAX_COUNT);
    const pps = int(g("pps"), MAX_PAGES_PER_SESSION, 1);
    const sp = int(g("sp"), 1000, 1) ?? 1;
    if (sessions === null || pps === null) return null;
    paging = { sessions, pagesPerSession: pps, sampledPages: sp };
  } else {
    const r = int(g("r"), MAX_COUNT);
    if (r === null) return null;
    requests = r;
  }

  const pm = g("pm");
  const pricing: PricingOptions = {
    model: isPricingModelId(pm) ? pm : DEFAULT_PRICING.model,
    freeTier: g("ft") === null ? DEFAULT_PRICING.freeTier : g("ft") === "1",
    custom: decodeRates(g("cr")),
  };
  return { sizes: { wire, raw, minified, gzip, brotli, zstd }, encoding, contentType, requests, paging, pricing };
}

export function shareMonthlyRequests(s: ShareState): number {
  return s.paging ? pageRequests(s.paging.sessions, s.paging.pagesPerSession) : s.requests;
}

/** A sizes-only AnalysisResult the Results view can render. No body, headers or findings. */
export function resultFromShare(s: ShareState): AnalysisResult {
  const isJson = s.contentType.includes("json");
  const comp = (bytes: number | null) => ({ available: bytes !== null, bytes, ms: null });
  return {
    source: "shared",
    status: null,
    contentType: s.contentType === "other" ? null : s.contentType,
    contentEncoding: s.encoding === "none" ? null : s.encoding,
    vary: null,
    wireBytes: s.sizes.wire,
    rawBytes: s.sizes.raw,
    isJson: isJson && s.sizes.minified !== null,
    minifiedBytes: s.sizes.minified,
    alreadyCompressedMedia: false,
    gzip: comp(s.sizes.gzip),
    brotli: comp(s.sizes.brotli),
    zstd: comp(s.sizes.zstd),
    findings: [],
    preview: "",
    previewTruncated: false,
    responseHeaders: {},
    redirectTo: null,
    pagination: null,
    sampledPages: s.paging?.sampledPages,
  };
}

export function shareSummary(s: ShareState, pricing: PricingOptions = s.pricing): CostSummary {
  return computeCosts(resultFromShare(s), shareMonthlyRequests(s), pricing, !!s.paging);
}

/** "$639", "$1,234", "$4.20" */
export function moneyShort(n: number): string {
  if (n >= 10) return `$${Math.round(n).toLocaleString("en-US")}`;
  return `$${n.toFixed(2)}`;
}

export interface ShareHeadline {
  title: string;
  description: string;
  today: string;
  best: string | null;
  bestLabel: string | null;
  savingsPct: number;
  details: string;
}

/** Text for the preview card and page title, e.g. "$639 → $120 / month with Zstd". */
export function shareHeadline(s: ShareState): ShareHeadline {
  const sum = shareSummary(s);
  const today = moneyShort(sum.today.monthlyCost);
  const model = getModel(s.pricing.model);
  const reqs = shareMonthlyRequests(s);
  const details = `${formatBytes(s.sizes.wire)} ${s.paging ? "avg page" : "response"} · ${formatNumber(reqs)} requests/month · ${model.shortLabel}${isCustom(s.pricing) ? " (custom rates)" : ""}`;
  const hasSaving = !!sum.best && sum.best.id !== "today" && sum.monthlySavings > 0.004;
  if (hasSaving) {
    const best = moneyShort(sum.best!.monthlyCost);
    const pct = sum.today.monthlyCost > 0 ? Math.round((sum.monthlySavings / sum.today.monthlyCost) * 100) : 0;
    return {
      title: `${today} → ${best} / month with ${sum.best!.label}`,
      description: `Estimated AWS egress for this API response: ${today}/month today, ${best}/month with ${sum.best!.label} (${pct}% less). ${details}. Estimate only.`,
      today,
      best,
      bestLabel: sum.best!.label,
      savingsPct: pct,
      details,
    };
  }
  return {
    title: `${today} / month in AWS egress`,
    description: `Estimated AWS egress for this API response: ${today}/month. ${details}. Estimate only.`,
    today,
    best: null,
    bestLabel: null,
    savingsPct: 0,
    details,
  };
}
