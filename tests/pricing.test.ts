import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  BYTES_PER_GB,
  decodeRates,
  DEFAULT_PRICING,
  defaultRates,
  encodeRates,
  isCustom,
  monthlyCostForBytes,
  PRICING_MODELS,
  tieredCost,
  tierRows,
  validateRates,
  type PricingOptions,
} from "../lib/pricing";

const money = (n: number) => Math.round(n * 100) / 100;
const GB = BYTES_PER_GB;
const direct = (freeTier = true): PricingOptions => ({ model: "direct", freeTier });
const cf = (freeTier = true): PricingOptions => ({ model: "cloudfront", freeTier });
const costGB = (gb: number, o: PricingOptions) => money(monthlyCostForBytes(gb * GB, o));

describe("direct from us-east-1 (marginal tiers)", () => {
  it("defaults to direct with the free tier on", () => {
    expect(DEFAULT_PRICING).toEqual({ model: "direct", freeTier: true });
  });

  it("costs $0 under 100 GB with the free tier", () => {
    expect(costGB(0, direct())).toBe(0);
    expect(costGB(50, direct())).toBe(0);
    expect(costGB(100, direct())).toBe(0);
  });

  it("bills from the first GB with the free tier off", () => {
    expect(costGB(50, direct(false))).toBe(4.5);
    expect(costGB(100, direct(false))).toBe(9);
  });

  it("72 KB × 100M requests ≈ $639/month (free tier on), $648 (off)", () => {
    const bytes = 72_000 * 100_000_000; // 7,200 GB
    expect(money(monthlyCostForBytes(bytes, direct(true)))).toBe(639);
    expect(money(monthlyCostForBytes(bytes, direct(false)))).toBe(648);
  });

  it("exactly at the 10 TB boundary", () => {
    expect(costGB(10_000, direct())).toBe(891); // 9,900 × 0.09
    expect(costGB(10_000, direct(false))).toBe(900);
    // One GB over is billed at the next tier's rate, not the old one.
    expect(costGB(10_001, direct())).toBe(891.09);
  });

  it("across multiple tiers, each GB at its own tier's rate", () => {
    expect(costGB(20_000, direct())).toBe(891 + 850);
    // 200 TB: 891 + 40,000×0.085 + 100,000×0.07 + 50,000×0.05
    expect(costGB(200_000, direct())).toBe(891 + 3400 + 7000 + 2500);
    expect(costGB(200_000, direct(false))).toBe(900 + 3400 + 7000 + 2500);
  });

  it("is not a flat rate applied to all bytes", () => {
    const flat = 200_000 * 0.05;
    expect(costGB(200_000, direct(false))).not.toBe(flat);
  });

  it("uses 1 GB = 1,000,000,000 bytes", () => {
    expect(BYTES_PER_GB).toBe(1e9);
  });
});

describe("via CloudFront", () => {
  it("costs $0 within the first 1 TB with the free tier", () => {
    expect(costGB(999, cf())).toBe(0);
    expect(costGB(1_000, cf())).toBe(0);
  });

  it("7,200 GB: (7,200 − 1,000) × $0.085 on, 7,200 × $0.085 off", () => {
    expect(costGB(7_200, cf())).toBe(527);
    expect(costGB(7_200, cf(false))).toBe(612);
  });

  it("crosses the 10 TB and 50 TB boundaries", () => {
    expect(costGB(10_000, cf())).toBe(765); // 9,000 × 0.085
    expect(costGB(50_000, cf())).toBe(765 + 3200); // + 40,000 × 0.08
    expect(costGB(150_000, cf())).toBe(765 + 3200 + 6000); // + 100,000 × 0.06
  });
});

describe("config", () => {
  for (const m of Object.values(PRICING_MODELS)) {
    it(`${m.id}: tiers increase, end unlimited, free tier fits in tier 1`, () => {
      const limits = m.tiers.map((t) => t.upToGB);
      expect(limits.at(-1)).toBeNull();
      for (let i = 1; i < limits.length - 1; i++) expect(limits[i]!).toBeGreaterThan(limits[i - 1]!);
      expect(m.freeGB).toBeLessThan(m.tiers[0].upToGB!);
      expect(m.lastVerified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(m.source).toMatch(/^https:\/\/aws\.amazon\.com\//);
    });
  }

  it("tierCost with no free GB matches the free-tier-off cost", () => {
    expect(tieredCost(7_200, PRICING_MODELS.direct.tiers)).toBeCloseTo(648);
  });

  it("assumptions rows reflect the free tier", () => {
    const on = tierRows(direct(true));
    expect(on.free?.range).toBe("First 100 GB");
    expect(on.rows[0].range).toBe("100 GB – 10 TB");
    const off = tierRows(direct(false));
    expect(off.free).toBeNull();
    expect(off.rows[0].range).toBe("0 – 10 TB");
    expect(off.rows.at(-1)!.range).toBe("Over 150 TB");
  });

  it("no per-GB rate is hardcoded outside lib/pricing.ts", () => {
    const rates = new Set(Object.values(PRICING_MODELS).flatMap((m) => m.tiers.map((t) => String(t.pricePerGB))));
    const pattern = new RegExp(`(?<![\\d.])(${[...rates].map((r) => r.replace(".", "\\.")).join("|")})(?!\\d)`);
    const root = join(__dirname, "..");
    const files: string[] = [];
    const walk = (dir: string) => {
      for (const f of readdirSync(dir)) {
        const p = join(dir, f);
        if (statSync(p).isDirectory()) walk(p);
        else if (/\.(ts|tsx)$/.test(f)) files.push(p);
      }
    };
    for (const d of ["app", "components", "lib"]) walk(join(root, d));
    // lib/demo.ts is synthetic API payload data (e.g. device shares), not pricing.
    const skip = [join("lib", "pricing.ts"), join("lib", "demo.ts")];
    const offenders = files.filter((f) => !skip.some((x) => f.endsWith(x)) && pattern.test(readFileSync(f, "utf8")));
    expect(offenders).toEqual([]);
  });
});

describe("custom rates (Edit rates)", () => {
  const custom = { freeGB: 100, tiers: [{ upToGB: 10_000, pricePerGB: 0.1 }, { upToGB: null, pricePerGB: 0.05 }] };

  it("are used for costs instead of the defaults", () => {
    // (7,200 − 100) × 0.10
    expect(costGB(7_200, { model: "direct", freeTier: true, custom })).toBe(710);
    expect(costGB(7_200, { model: "direct", freeTier: false, custom })).toBe(720);
  });

  it("are not 'custom' when they match the AWS defaults", () => {
    expect(isCustom({ model: "direct", freeTier: true, custom: defaultRates("direct") })).toBe(false);
    expect(isCustom({ model: "direct", freeTier: true, custom })).toBe(true);
    expect(isCustom({ model: "direct", freeTier: true })).toBe(false);
  });

  it("validate drafts and accept commas and $ signs", () => {
    const v = validateRates({ freeGB: "1,000", tiers: [{ upToGB: "10,000", pricePerGB: "$0.08" }, { upToGB: "", pricePerGB: "0.05" }] });
    expect(v.ok).toBe(true);
    expect(v.rates).toEqual({ freeGB: 1000, tiers: [{ upToGB: 10_000, pricePerGB: 0.08 }, { upToGB: null, pricePerGB: 0.05 }] });
  });

  it("reject bad drafts with field errors", () => {
    const v = validateRates({
      freeGB: "-1",
      tiers: [
        { upToGB: "10000", pricePerGB: "abc" },
        { upToGB: "5000", pricePerGB: "-0.1" },
        { upToGB: "", pricePerGB: "" },
      ],
    });
    expect(v.ok).toBe(false);
    expect(v.freeError).toBeDefined();
    expect(v.tierErrors[0].pricePerGB).toBeDefined();
    expect(v.tierErrors[1].upToGB).toMatch(/more than 10,000/);
    expect(v.tierErrors[1].pricePerGB).toMatch(/negative/);
    expect(v.tierErrors[2].pricePerGB).toBeDefined();
  });

  it("round-trip through the share-link encoding", () => {
    for (const r of [custom, defaultRates("direct"), defaultRates("cloudfront")]) expect(decodeRates(encodeRates(r))).toEqual(r);
    expect(encodeRates(custom)).toBe("100|10000:0.1,inf:0.05");
  });

  it("reject malformed encodings", () => {
    for (const s of ["", "abc", "100", "100|inf:0.05,10000:0.1", "100|10000:0.1", "100|5000:0.1,1000:0.1,inf:0.05", "100|inf:-1", "1|inf:0.05|x", "100|inf:99"]) {
      expect(decodeRates(s), s).toBeNull();
    }
  });

  it("assumption rows skip tiers fully covered by a large free allowance", () => {
    const big = { freeGB: 20_000, tiers: [{ upToGB: 10_000, pricePerGB: 0.09 }, { upToGB: null, pricePerGB: 0.05 }] };
    const { rows, free } = tierRows({ model: "direct", freeTier: true, custom: big });
    expect(free?.range).toBe("First 20 TB");
    expect(rows).toEqual([{ range: "Over 20 TB", pricePerGB: 0.05 }]);
  });
});
