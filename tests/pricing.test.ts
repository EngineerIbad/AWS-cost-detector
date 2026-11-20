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
  ratesToDraft,
  requestBreakdown,
  requestCost,
  monthlyCostForBytes,
  PRICING_MODELS,
  tieredCost,
  tierBreakdown,
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

describe("tier breakdown (How you're charged)", () => {
  it("free part, then each tier reached; total matches the cost function", () => {
    const b = tierBreakdown(20_000, direct());
    expect(b.freeUsedGB).toBe(100);
    expect(b.rows.map((r) => [r.range, r.gb, r.pricePerGB])).toEqual([
      ["100 GB – 10 TB", 9_900, 0.09],
      ["10 TB – 50 TB", 10_000, 0.085],
    ]);
    expect(money(b.total)).toBe(costGB(20_000, direct()));
  });

  it("matches for CloudFront, free tier off, and under the free allowance", () => {
    for (const [gb, o] of [[7_200, cf()], [7_200, cf(false)], [200_000, direct(false)], [50, direct()]] as const) {
      expect(money(tierBreakdown(gb, o).total)).toBe(costGB(gb, o));
    }
    expect(tierBreakdown(50, direct()).rows).toEqual([]);
  });
});

describe("CloudFront request fees", () => {
  it("HTTPS: 0.0100 USD per 10,000 after the first 10M requests (free tier on)", () => {
    expect(PRICING_MODELS.cloudfront.requests).toEqual({ per10k: 0.01, freeRequests: 10_000_000, protocol: "HTTPS" });
    expect(money(requestCost(100_000_000, cf()))).toBe(90); // (100M − 10M) / 10,000 × 0.01
    expect(money(requestCost(100_000_000, cf(false)))).toBe(100);
    expect(requestCost(10_000_000, cf())).toBe(0);
    expect(requestCost(1_000_000, cf())).toBe(0);
  });

  it("direct from AWS has no request fees", () => {
    expect(requestCost(1e9, direct())).toBe(0);
    expect(requestBreakdown(1e9, direct())).toBeNull();
  });

  it("custom request rates are used and round-trip through share links", () => {
    const custom = { ...defaultRates("cloudfront"), requestPer10k: 0.0075, freeRequests: 0 };
    expect(money(requestCost(10_000_000, { model: "cloudfront", freeTier: true, custom }))).toBe(7.5);
    expect(isCustom({ model: "cloudfront", freeTier: true, custom })).toBe(true);
    expect(decodeRates(encodeRates(custom))).toEqual(custom);
    expect(decodeRates(encodeRates(defaultRates("cloudfront")))).toEqual(defaultRates("cloudfront"));
    expect(encodeRates(defaultRates("cloudfront"))).toMatch(/\|r0\.01:10000000$/);
  });

  it("rejects bad request inputs", () => {
    const d = { ...ratesToDraft(defaultRates("cloudfront")), requestPer10k: "-1", freeRequests: "1.5" };
    const v = validateRates(d);
    expect(v.ok).toBe(false);
    expect(v.requestPriceError).toBeDefined();
    expect(v.freeRequestsError).toBeDefined();
    expect(decodeRates("1000|10000:0.085,inf:0.08|rabc:1")).toBeNull();
  });
});
