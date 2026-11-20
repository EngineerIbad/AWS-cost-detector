/**
 * Pricing models: the single source of truth for every price in the app.
 *
 * Nothing else may hardcode a rate, a tier limit or a free allowance. The UI
 * (assumptions panel, selector labels, free-tier toggle), cost rows, copy text,
 * share previews and tests all read from here.
 *
 * Tier limits are cumulative monthly usage in GB (1 GB = 10^9 bytes). Each GB is
 * billed at the rate of the tier it falls into (marginal, not one flat rate).
 * The free allowance is separate from the tiers: when applied, the first
 * `freeGB` of the month cost $0 and billing continues at whatever tier the
 * cumulative usage is in.
 *
 * To update: edit the numbers, bump `lastVerified`, and re-check `source`.
 *
 * Visitors can also override a model's rates in the UI ("Edit rates") if AWS
 * changes prices before this file is updated. Overrides travel as
 * `PricingOptions.custom` and are always labelled "custom rates".
 */

export const BYTES_PER_GB = 1_000_000_000; // decimal GB
export const CURRENCY = "USD";

export interface PricingTier {
  /** Upper limit of this tier in cumulative GB per month. `null` = no upper limit. */
  upToGB: number | null;
  pricePerGB: number;
}

export type PricingModelId = "direct" | "cloudfront";

export interface PricingModel {
  id: PricingModelId;
  /** Selector label. */
  label: string;
  /** Short label for badges, copy text and share previews. */
  shortLabel: string;
  /** What the tier table covers. */
  scope: string;
  /** Monthly free allowance in GB (only applied when the free tier toggle is on). */
  freeGB: number;
  freeNote: string;
  /** Per-request charges, if this service bills them (CloudFront does; regional egress doesn't). */
  requests?: { per10k: number; freeRequests: number; protocol: "HTTPS" };
  tiers: PricingTier[];
  source: string;
  /** ISO date (YYYY-MM-DD) the rates were last checked against `source`. */
  lastVerified: string;
}

export const PRICING_MODELS: Record<PricingModelId, PricingModel> = {
  direct: {
    id: "direct",
    label: "Direct from AWS region (EC2 / ALB / API Gateway)",
    shortLabel: "Direct from us-east-1",
    scope: "AWS data transfer out to the internet, us-east-1",
    freeGB: 100,
    freeNote: "100 GB/month free, aggregated across all AWS services and regions in your account.",
    tiers: [
      { upToGB: 10_000, pricePerGB: 0.09 }, //       0 – 10 TB
      { upToGB: 50_000, pricePerGB: 0.085 }, //  10 TB – 50 TB
      { upToGB: 150_000, pricePerGB: 0.07 }, //  50 TB – 150 TB
      { upToGB: null, pricePerGB: 0.05 }, //      150 TB +
    ],
    source: "https://aws.amazon.com/ec2/pricing/on-demand/#Data_Transfer",
    lastVerified: "2026-11-16",
  },
  cloudfront: {
    id: "cloudfront",
    label: "Via CloudFront",
    shortLabel: "Via CloudFront",
    scope: "Amazon CloudFront data transfer out to the internet, North America / Europe, pay-as-you-go",
    freeGB: 1_000,
    freeNote: "1 TB/month free (CloudFront always-free tier, per AWS account).",
    // Verified 2026-11-20 against the pay-as-you-go page, "Request Pricing for All
    // HTTP Methods (per 10,000)": HTTPS 0.0100 USD (US/MX/CA). The always-free tier
    // includes "10,000,000 HTTP or HTTPS Requests" per month. APIs are HTTPS.
    requests: { per10k: 0.01, freeRequests: 10_000_000, protocol: "HTTPS" },
    // Verified 2026-11-20 against the pay-as-you-go page: "First 1TB Free,
    // Next 9TB $0.085, Next 40TB $0.080, Next 100TB $0.060, Next 350TB $0.040,
    // Next 524TB $0.030, Next 4PB $0.025, Over 5PB $0.020" (US/MX/CA and
    // Europe/Israel/Türkiye). Limits below are those "next X TB" steps added up
    // with 1 TB = 1,000 GB, matching how this app counts GB.
    tiers: [
      { upToGB: 10_000, pricePerGB: 0.085 }, //     0 – 10 TB (first 1 TB covered by freeGB)
      { upToGB: 50_000, pricePerGB: 0.08 }, //   10 TB – 50 TB
      { upToGB: 150_000, pricePerGB: 0.06 }, //  50 TB – 150 TB
      { upToGB: 500_000, pricePerGB: 0.04 }, // 150 TB – 500 TB
      { upToGB: 1_024_000, pricePerGB: 0.03 }, // 500 TB – 1,024 TB
      { upToGB: 5_120_000, pricePerGB: 0.025 }, // next 4 PB
      { upToGB: null, pricePerGB: 0.02 }, //       over 5 PB
    ],
    source: "https://aws.amazon.com/cloudfront/pricing/pay-as-you-go/",
    lastVerified: "2026-11-20",
  },
};

export const DEFAULT_MODEL: PricingModelId = "direct";
export const DEFAULT_FREE_TIER = true;

export const FREE_TIER_HELP = "The free tier is shared across your whole AWS account, so other traffic may already use it.";
/** One line under the "How is this served?" selector, built from the config above. */
export function modelNote(id: PricingModelId): string {
  const m = PRICING_MODELS[id];
  if (!m.requests) return `Tiered ${m.scope}.`;
  const free = (m.requests.freeRequests / 1e6).toLocaleString("en-US");
  return `Origin → CloudFront transfer is free. Includes ${m.requests.protocol} request fees: $${m.requests.per10k.toFixed(4)} per 10,000 after the first ${free}M each month.`;
}

/** The numbers a cost calculation uses: a free allowance and the paid tiers. */
export interface ModelRates {
  freeGB: number;
  tiers: PricingTier[];
  /** Price per 10,000 requests, for services that bill requests (CloudFront). */
  requestPer10k?: number;
  /** Requests per month covered by the free tier. */
  freeRequests?: number;
}

/** What a cost calculation needs: which model, whether to subtract the free allowance, and any user override. */
export interface PricingOptions {
  model: PricingModelId;
  freeTier: boolean;
  /** Visitor-entered rates for `model`. Null/undefined = the AWS defaults above. */
  custom?: ModelRates | null;
}

export const DEFAULT_PRICING: PricingOptions = { model: DEFAULT_MODEL, freeTier: DEFAULT_FREE_TIER };

export function isPricingModelId(v: unknown): v is PricingModelId {
  return v === "direct" || v === "cloudfront";
}

export function getModel(id: PricingModelId): PricingModel {
  return PRICING_MODELS[id];
}

/**
 * Monthly cost for `gb` of cumulative usage. Each GB is billed at the rate of
 * the tier it falls in; the first `freeGB` are free.
 */
export function tieredCost(gb: number, tiers: PricingTier[], freeGB = 0): number {
  if (!(gb > 0)) return 0;
  let cost = 0;
  let from = 0;
  for (const tier of tiers) {
    if (gb <= from) break;
    const to = tier.upToGB ?? Infinity;
    const billable = Math.min(gb, to) - Math.max(from, freeGB);
    if (billable > 0) cost += billable * tier.pricePerGB;
    from = to;
  }
  return cost;
}

export function bytesToGB(bytes: number): number {
  return bytes / BYTES_PER_GB;
}

/** Request fees for a month, after the free allowance. 0 for services that don't bill requests. */
export function requestCost(monthlyRequests: number, opts: PricingOptions): number {
  return requestBreakdown(monthlyRequests, opts)?.cost ?? 0;
}

export function requestBreakdown(
  monthlyRequests: number,
  opts: PricingOptions,
): { per10k: number; freeRequests: number; freeUsed: number; billable: number; cost: number } | null {
  const r = activeRates(opts);
  if (r.requestPer10k === undefined) return null;
  const n = Math.max(0, Math.round(monthlyRequests));
  const freeRequests = opts.freeTier ? (r.freeRequests ?? 0) : 0;
  const billable = Math.max(0, n - freeRequests);
  return { per10k: r.requestPer10k, freeRequests, freeUsed: Math.min(n, freeRequests), billable, cost: (billable / 10_000) * r.requestPer10k };
}

/** Monthly cost in USD for `bytes` of monthly egress under the given options (data transfer only). */
export function monthlyCostForBytes(bytes: number, opts: PricingOptions): number {
  const r = activeRates(opts);
  return tieredCost(bytesToGB(bytes), r.tiers, opts.freeTier ? r.freeGB : 0);
}

export function defaultRates(id: PricingModelId): ModelRates {
  const m = getModel(id);
  const r: ModelRates = { freeGB: m.freeGB, tiers: m.tiers.map((t) => ({ ...t })) };
  if (m.requests) {
    r.requestPer10k = m.requests.per10k;
    r.freeRequests = m.requests.freeRequests;
  }
  return r;
}

/** The rates actually in effect: the user's override, or the AWS defaults. */
export function activeRates(opts: PricingOptions): ModelRates {
  return opts.custom ?? defaultRates(opts.model);
}

export function ratesEqual(a: ModelRates, b: ModelRates): boolean {
  return (
    a.freeGB === b.freeGB &&
    (a.requestPer10k ?? null) === (b.requestPer10k ?? null) &&
    (a.freeRequests ?? null) === (b.freeRequests ?? null) &&
    a.tiers.length === b.tiers.length &&
    a.tiers.every((t, i) => t.upToGB === b.tiers[i].upToGB && t.pricePerGB === b.tiers[i].pricePerGB)
  );
}

/** True when the user's rates differ from the AWS defaults for the selected model. */
export function isCustom(opts: PricingOptions): boolean {
  return !!opts.custom && !ratesEqual(opts.custom, defaultRates(opts.model));
}

/** "16 Nov 2026" */
export function formatVerifiedDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

/** "100 GB" / "1 TB" */
export function formatGB(gb: number): string {
  if (gb >= 1_000_000 && gb % 1_000_000 === 0) return `${gb / 1_000_000} PB`;
  if (gb >= 1_000 && gb % 1_000 === 0) return `${(gb / 1_000).toLocaleString("en-US")} TB`;
  if (gb >= 1_000) return `${(gb / 1_000).toLocaleString("en-US", { maximumFractionDigits: 3 })} TB`;
  return `${gb.toLocaleString("en-US")} GB`;
}

export interface TierRow {
  /** e.g. "0 – 10 TB", "Over 150 TB" */
  range: string;
  pricePerGB: number;
}

export interface TierCharge {
  /** e.g. "100 GB – 10 TB" */
  range: string;
  /** GB billed in this tier this month. */
  gb: number;
  pricePerGB: number;
  cost: number;
}

/**
 * How a month's usage is billed, tier by tier: the free part first, then each
 * tier the usage reaches. `total` always equals monthlyCostForBytes for the same GB.
 */
export function tierBreakdown(gb: number, opts: PricingOptions): { freeGB: number; freeUsedGB: number; rows: TierCharge[]; total: number } {
  const r = activeRates(opts);
  const freeGB = opts.freeTier ? r.freeGB : 0;
  const used = Math.max(0, gb);
  const rows: TierCharge[] = [];
  let from = 0;
  for (const t of r.tiers) {
    if (used <= from) break;
    const to = t.upToGB ?? Infinity;
    const start = Math.max(from, freeGB);
    const billable = Math.min(used, to) - start;
    if (billable > 0) {
      const range = t.upToGB === null ? `Over ${formatGB(start)}` : `${start === 0 ? "0" : formatGB(start)} – ${formatGB(t.upToGB)}`;
      rows.push({ range, gb: billable, pricePerGB: t.pricePerGB, cost: billable * t.pricePerGB });
    }
    from = to;
  }
  return { freeGB, freeUsedGB: Math.min(used, freeGB), rows, total: rows.reduce((s, x) => s + x.cost, 0) };
}

/** Rows for the assumptions panel: free row (if applied) then each paid tier. */
export function tierRows(opts: PricingOptions): { rows: TierRow[]; free: TierRow | null } {
  const r = activeRates(opts);
  const freeGB = opts.freeTier ? r.freeGB : 0;
  const rows: TierRow[] = [];
  let from = 0;
  for (const t of r.tiers) {
    // A large free allowance can cover whole tiers; skip those.
    if (t.upToGB !== null && t.upToGB <= freeGB) {
      from = t.upToGB;
      continue;
    }
    const start = Math.max(from, freeGB);
    const label =
      t.upToGB === null ? `Over ${formatGB(start)}` : `${start === 0 ? "0" : formatGB(start)} – ${formatGB(t.upToGB)}`;
    rows.push({ range: label, pricePerGB: t.pricePerGB });
    from = t.upToGB ?? Infinity;
  }
  return { rows, free: freeGB > 0 ? { range: `First ${formatGB(freeGB)}`, pricePerGB: 0 } : null };
}

/* ------------------------------------------------------------------ */
/* Editing rates (UI) and encoding them (share links)                  */
/* ------------------------------------------------------------------ */

export const MAX_TIERS = 12;
const MAX_PRICE_PER_GB = 10;
const MAX_REQUEST_PRICE = 10;
const MAX_GB = 1e12;

/** What the editor holds: raw strings so people can type freely. */
export interface RatesDraft {
  freeGB: string;
  /** The last tier's upToGB is ignored: it is always unlimited. */
  tiers: { upToGB: string; pricePerGB: string }[];
  /** Only for services that bill requests. */
  requestPer10k?: string;
  freeRequests?: string;
}

export interface RatesValidation {
  ok: boolean;
  rates?: ModelRates;
  freeError?: string;
  tierErrors: { upToGB?: string; pricePerGB?: string }[];
  formError?: string;
  requestPriceError?: string;
  freeRequestsError?: string;
}

export function ratesToDraft(r: ModelRates): RatesDraft {
  return {
    freeGB: String(r.freeGB),
    tiers: r.tiers.map((t) => ({ upToGB: t.upToGB === null ? "" : String(t.upToGB), pricePerGB: String(t.pricePerGB) })),
    ...(r.requestPer10k !== undefined ? { requestPer10k: String(r.requestPer10k), freeRequests: String(r.freeRequests ?? 0) } : {}),
  };
}

/** "10,000" → 10000, "$0.09" → 0.09, "" → null, "abc" → NaN */
function parseNum(s: string): number | null {
  const cleaned = s.replace(/[,\s_$]/g, "");
  if (cleaned === "") return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : NaN;
}

export function validateRates(d: RatesDraft): RatesValidation {
  const tierErrors: RatesValidation["tierErrors"] = d.tiers.map(() => ({}));
  const out: RatesValidation = { ok: false, tierErrors };

  const free = parseNum(d.freeGB);
  if (free === null) out.freeError = "Enter the free allowance in GB (0 for none).";
  else if (Number.isNaN(free)) out.freeError = "Enter a number of GB.";
  else if (free < 0) out.freeError = "Can't be negative.";
  else if (free > MAX_GB) out.freeError = "That's too large.";

  if (d.tiers.length === 0 || d.tiers.length > MAX_TIERS) {
    out.formError = `Use between 1 and ${MAX_TIERS} tiers.`;
    return out;
  }

  const tiers: PricingTier[] = [];
  let prev = 0;
  d.tiers.forEach((t, i) => {
    const last = i === d.tiers.length - 1;
    const price = parseNum(t.pricePerGB);
    if (price === null) tierErrors[i].pricePerGB = "Enter a price per GB.";
    else if (Number.isNaN(price)) tierErrors[i].pricePerGB = "Enter a number, e.g. 0.09.";
    else if (price < 0) tierErrors[i].pricePerGB = "Can't be negative.";
    else if (price > MAX_PRICE_PER_GB) tierErrors[i].pricePerGB = `Max $${MAX_PRICE_PER_GB} per GB.`;

    let upTo: number | null = null;
    if (!last) {
      const lim = parseNum(t.upToGB);
      if (lim === null) tierErrors[i].upToGB = "Enter where this tier ends, in GB.";
      else if (Number.isNaN(lim)) tierErrors[i].upToGB = "Enter a number of GB.";
      else if (lim <= prev) tierErrors[i].upToGB = `Must be more than ${prev.toLocaleString("en-US")} GB.`;
      else if (lim > MAX_GB) tierErrors[i].upToGB = "That's too large.";
      else {
        upTo = lim;
        prev = lim;
      }
    }
    tiers.push({ upToGB: upTo, pricePerGB: price ?? 0 });
  });

  // Request pricing (only present for services that bill requests).
  let requestPer10k: number | undefined;
  let freeRequests: number | undefined;
  if (d.requestPer10k !== undefined) {
    const rp = parseNum(d.requestPer10k);
    if (rp === null || Number.isNaN(rp)) out.requestPriceError = "Enter a price per 10,000 requests, e.g. 0.01.";
    else if (rp < 0) out.requestPriceError = "Can't be negative.";
    else if (rp > MAX_REQUEST_PRICE) out.requestPriceError = `Max $${MAX_REQUEST_PRICE} per 10,000.`;
    else requestPer10k = rp;
    const fr = parseNum(d.freeRequests ?? "0");
    if (fr === null || Number.isNaN(fr) || !Number.isInteger(fr)) out.freeRequestsError = "Enter a whole number of requests (0 for none).";
    else if (fr < 0) out.freeRequestsError = "Can't be negative.";
    else if (fr > MAX_GB) out.freeRequestsError = "That's too large.";
    else freeRequests = fr;
  }

  if (out.freeError || out.requestPriceError || out.freeRequestsError || tierErrors.some((e) => e.upToGB || e.pricePerGB)) return out;
  out.ok = true;
  out.rates = { freeGB: free as number, tiers, ...(requestPer10k !== undefined ? { requestPer10k, freeRequests } : {}) };
  return out;
}

/** Compact share-link form: "100|10000:0.09,50000:0.085,inf:0.05" */
export function encodeRates(r: ModelRates): string {
  const base = `${r.freeGB}|${r.tiers.map((t) => `${t.upToGB === null ? "inf" : t.upToGB}:${t.pricePerGB}`).join(",")}`;
  // Optional request pricing: "|r<per10k>:<freeRequests>"
  return r.requestPer10k !== undefined ? `${base}|r${r.requestPer10k}:${r.freeRequests ?? 0}` : base;
}

export function decodeRates(s: string | null): ModelRates | null {
  if (!s || s.length > 400 || !/^[0-9.|,:infr]+$/.test(s)) return null;
  const [free, list, req, extra] = s.split("|");
  if (extra !== undefined || !list) return null;
  let requestPer10k: string | undefined;
  let freeRequests: string | undefined;
  if (req !== undefined) {
    const m = /^r([0-9.]+):([0-9]+)$/.exec(req);
    if (!m) return null;
    [, requestPer10k, freeRequests] = m;
  }
  const pairs = list.split(",").map((p) => p.split(":"));
  if (pairs.length > MAX_TIERS || pairs.some((p) => p.length !== 2)) return null;
  // Only the last tier may be, and must be, unlimited.
  if (pairs.some(([lim], i) => (lim === "inf") !== (i === pairs.length - 1))) return null;
  const v = validateRates({
    freeGB: free,
    tiers: pairs.map(([lim, price]) => ({ upToGB: lim === "inf" ? "" : lim, pricePerGB: price })),
    ...(requestPer10k !== undefined ? { requestPer10k, freeRequests } : {}),
  });
  return v.ok ? v.rates! : null;
}
