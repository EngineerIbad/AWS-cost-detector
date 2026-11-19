import { describe, expect, it } from "vitest";
import {
  BYTES_PER_GB,
  decodeTiers,
  defaultPricing,
  encodeTiers,
  getDefaultPricing,
  isDefaultPricing,
  monthlyCostForBytes,
  pricingToDraft,
  tieredCost,
  validatePricing,
} from "../lib/pricing";

const tiers = getDefaultPricing().tiers;
const money = (n: number) => Math.round(n * 100) / 100;

describe("tier math (AWS defaults)", () => {
  it("is free within the first 100 GB", () => {
    expect(tieredCost(0, tiers)).toBe(0);
    expect(tieredCost(50, tiers)).toBe(0);
    expect(tieredCost(100, tiers)).toBe(0);
  });

  it("7,200 GB → (7,200 − 100) × $0.09 = $639.00", () => {
    expect(money(tieredCost(7200, tiers))).toBe(639.0);
  });

  it("uses 1 GB = 1,000,000,000 bytes", () => {
    expect(BYTES_PER_GB).toBe(1e9);
    expect(money(monthlyCostForBytes(7200 * 1e9, getDefaultPricing()))).toBe(639.0);
  });

  it("crosses into tier 3", () => {
    // 20,000 GB: 9,900 GB × 0.09 + 10,000 GB × 0.085 = 891 + 850
    expect(money(tieredCost(20_000, tiers))).toBe(1741.0);
  });

  it("exactly at the 10 TB boundary", () => {
    expect(money(tieredCost(10_000, tiers))).toBe(891.0);
  });

  it("spans every tier", () => {
    // 200,000 GB: 891 + 40,000×0.085 + 100,000×0.07 + 50,000×0.05
    expect(money(tieredCost(200_000, tiers))).toBe(891 + 3400 + 7000 + 2500);
  });

  it("has the expected defaults", () => {
    expect(defaultPricing.lastVerified).toBe("2026-11-16");
    expect(defaultPricing.tiers.map((t) => t.pricePerGB)).toEqual([0, 0.09, 0.085, 0.07, 0.05]);
    expect(defaultPricing.tiers.at(-1)!.upToGB).toBeNull();
  });
});

describe("pricing validation", () => {
  it("accepts the defaults", () => {
    const v = validatePricing(pricingToDraft(getDefaultPricing()));
    expect(v.ok).toBe(true);
    expect(isDefaultPricing(v.pricing!)).toBe(true);
  });

  it("rejects non-increasing limits", () => {
    const d = pricingToDraft(getDefaultPricing());
    d.tiers[2].upToGB = "5000"; // below tier 2's 10,000
    const v = validatePricing(d);
    expect(v.ok).toBe(false);
    expect(v.tierErrors[2].upToGB).toMatch(/greater than the previous tier/);
  });

  it("rejects equal limits", () => {
    const d = pricingToDraft(getDefaultPricing());
    d.tiers[1].upToGB = "100";
    expect(validatePricing(d).tierErrors[1].upToGB).toBeDefined();
  });

  it("rejects negative prices", () => {
    const d = pricingToDraft(getDefaultPricing());
    d.tiers[1].pricePerGB = "-0.01";
    const v = validatePricing(d);
    expect(v.ok).toBe(false);
    expect(v.tierErrors[1].pricePerGB).toMatch(/negative/);
  });

  it("rejects empty or non-numeric values", () => {
    const d = pricingToDraft(getDefaultPricing());
    d.tiers[0].upToGB = "";
    d.tiers[1].pricePerGB = "abc";
    const v = validatePricing(d);
    expect(v.tierErrors[0].upToGB).toBeDefined();
    expect(v.tierErrors[1].pricePerGB).toBeDefined();
  });

  it("requires a currency label", () => {
    const d = pricingToDraft(getDefaultPricing());
    d.currency = "  ";
    expect(validatePricing(d).currencyError).toBeDefined();
  });

  it("accepts custom tiers and detects custom pricing", () => {
    const v = validatePricing({
      currency: "EUR",
      tiers: [
        { upToGB: "1,000", pricePerGB: "0.08" },
        { upToGB: "", pricePerGB: "0.05" },
      ],
    });
    expect(v.ok).toBe(true);
    expect(v.pricing!.tiers).toEqual([
      { upToGB: 1000, pricePerGB: 0.08 },
      { upToGB: null, pricePerGB: 0.05 },
    ]);
    expect(isDefaultPricing(v.pricing!)).toBe(false);
  });

  it("round-trips through the share URL encoding", () => {
    const enc = encodeTiers(tiers);
    expect(enc).toBe("100:0,10000:0.09,50000:0.085,150000:0.07,inf:0.05");
    expect(decodeTiers(enc)).toEqual(tiers);
  });

  it("rejects malformed share strings", () => {
    expect(decodeTiers("100:0,50:0.1,inf:0.05")).toBeNull();
    expect(decodeTiers("100:0,200:0.1")).toBeNull(); // last tier not unlimited
    expect(decodeTiers("inf:0,100:0.1,inf:0.05")).toBeNull();
    expect(decodeTiers("100:-1,inf:0.05")).toBeNull();
    expect(decodeTiers("")).toBeNull();
  });
});
