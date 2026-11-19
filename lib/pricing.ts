/**
 * Pricing model for AWS data transfer out (egress) to the internet.
 *
 * Tiers are cumulative per month: each GB is billed at the rate of the tier
 * it falls into. A tier runs from the previous tier's upper limit to its own
 * `upToGB` (null = unlimited). The last tier must be unlimited.
 */

export const BYTES_PER_GB = 1_000_000_000; // decimal GB, as AWS bills

export interface PricingTier {
  /** Upper limit of this tier in GB per month. `null` = no upper limit. */
  upToGB: number | null;
  pricePerGB: number;
}

export interface Pricing {
  currency: string;
  tiers: PricingTier[];
}

/**
 * To update defaults: edit the tiers below, bump `lastVerified`, and check the
 * source page. Everything else (badge, reset button, tests) reads from here.
 */
export const defaultPricing = {
  currency: "USD",
  lastVerified: "2026-11-16",
  region: "us-east-1",
  source:
    "https://aws.amazon.com/ec2/pricing/on-demand/#Data_Transfer",
  tiers: [
    { upToGB: 100, pricePerGB: 0 }, //          0 – 100 GB  free
    { upToGB: 10_000, pricePerGB: 0.09 }, //  100 GB – 10 TB
    { upToGB: 50_000, pricePerGB: 0.085 }, //  10 TB – 50 TB
    { upToGB: 150_000, pricePerGB: 0.07 }, //  50 TB – 150 TB
    { upToGB: null, pricePerGB: 0.05 }, //    150 TB +
  ] as PricingTier[],
} as const;

export function getDefaultPricing(): Pricing {
  return {
    currency: defaultPricing.currency,
    tiers: defaultPricing.tiers.map((t) => ({ ...t })),
  };
}

/** Monthly cost for a given number of GB, applying tiers cumulatively. */
export function tieredCost(gb: number, tiers: PricingTier[]): number {
  if (!(gb > 0)) return 0;
  let cost = 0;
  let from = 0;
  for (const tier of tiers) {
    const to = tier.upToGB ?? Infinity;
    if (gb <= from) break;
    const inTier = Math.min(gb, to) - from;
    if (inTier > 0) cost += inTier * tier.pricePerGB;
    from = to;
  }
  return cost;
}

export function bytesToGB(bytes: number): number {
  return bytes / BYTES_PER_GB;
}

export function monthlyCostForBytes(bytes: number, pricing: Pricing): number {
  return tieredCost(bytesToGB(bytes), pricing.tiers);
}

export function isDefaultPricing(p: Pricing): boolean {
  const d = defaultPricing;
  if (p.currency !== d.currency) return false;
  if (p.tiers.length !== d.tiers.length) return false;
  return p.tiers.every(
    (t, i) =>
      t.upToGB === d.tiers[i].upToGB && t.pricePerGB === d.tiers[i].pricePerGB,
  );
}

/* ------------------------------------------------------------------ */
/* Editable draft + validation                                         */
/* ------------------------------------------------------------------ */

/** What the editor holds: raw strings so users can type freely. */
export interface TierDraft {
  upToGB: string; // "" for the last (unlimited) tier
  pricePerGB: string;
}

export interface PricingDraft {
  currency: string;
  tiers: TierDraft[];
}

export interface TierErrors {
  upToGB?: string;
  pricePerGB?: string;
}

export interface ValidationResult {
  ok: boolean;
  pricing?: Pricing;
  currencyError?: string;
  tierErrors: TierErrors[];
  formError?: string;
}

export function pricingToDraft(p: Pricing): PricingDraft {
  return {
    currency: p.currency,
    tiers: p.tiers.map((t) => ({
      upToGB: t.upToGB === null ? "" : String(t.upToGB),
      pricePerGB: String(t.pricePerGB),
    })),
  };
}

function parseNum(s: string): number | null {
  const cleaned = s.replace(/[,\s_]/g, "");
  if (cleaned === "") return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : NaN;
}

export function validatePricing(draft: PricingDraft): ValidationResult {
  const tierErrors: TierErrors[] = draft.tiers.map(() => ({}));
  const result: ValidationResult = { ok: true, tierErrors };

  const currency = draft.currency.trim();
  if (!currency) {
    result.currencyError = "Enter a currency label, e.g. USD.";
  } else if (currency.length > 8) {
    result.currencyError = "Keep the currency label to 8 characters or fewer.";
  }

  if (draft.tiers.length === 0) {
    result.formError = "Add at least one tier.";
    result.ok = false;
    return result;
  }

  const tiers: PricingTier[] = [];
  let prevLimit = 0;
  draft.tiers.forEach((t, i) => {
    const isLast = i === draft.tiers.length - 1;
    const price = parseNum(t.pricePerGB);
    if (price === null) {
      tierErrors[i].pricePerGB = "Enter a price (0 for free).";
    } else if (Number.isNaN(price)) {
      tierErrors[i].pricePerGB = "Price must be a number.";
    } else if (price < 0) {
      tierErrors[i].pricePerGB = "Price can't be negative.";
    }

    let upTo: number | null = null;
    if (!isLast) {
      const limit = parseNum(t.upToGB);
      if (limit === null) {
        tierErrors[i].upToGB = "Enter an upper limit in GB.";
      } else if (Number.isNaN(limit)) {
        tierErrors[i].upToGB = "Limit must be a number.";
      } else if (limit <= prevLimit) {
        tierErrors[i].upToGB =
          i === 0
            ? "Limit must be greater than 0."
            : `Limit must be greater than the previous tier (${prevLimit.toLocaleString("en-US")} GB).`;
      } else {
        upTo = limit;
        prevLimit = limit;
      }
    }
    tiers.push({ upToGB: upTo, pricePerGB: price ?? 0 });
  });

  const hasTierErrors = tierErrors.some((e) => e.upToGB || e.pricePerGB);
  if (hasTierErrors || result.currencyError) {
    result.ok = false;
    return result;
  }
  result.pricing = { currency, tiers };
  return result;
}

/* ------------------------------------------------------------------ */
/* Share-URL encoding                                                  */
/* ------------------------------------------------------------------ */

/** Encodes tiers compactly: "100:0,10000:0.09,...,inf:0.05" */
export function encodeTiers(tiers: PricingTier[]): string {
  return tiers
    .map((t) => `${t.upToGB === null ? "inf" : t.upToGB}:${t.pricePerGB}`)
    .join(",");
}

export function decodeTiers(s: string): PricingTier[] | null {
  if (!s || s.length > 500) return null;
  const parts = s.split(",");
  if (parts.length === 0 || parts.length > 20) return null;
  const draft: PricingDraft = {
    currency: "X",
    tiers: parts.map((p) => {
      const [limit, price] = p.split(":");
      return {
        upToGB: limit === "inf" ? "" : (limit ?? ""),
        pricePerGB: price ?? "",
      };
    }),
  };
  // Only the final tier may be unlimited.
  if (parts.slice(0, -1).some((p) => p.startsWith("inf:"))) return null;
  if (!parts[parts.length - 1].startsWith("inf:")) return null;
  const v = validatePricing(draft);
  return v.ok && v.pricing ? v.pricing.tiers : null;
}
