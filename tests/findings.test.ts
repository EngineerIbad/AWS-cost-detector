import { describe, expect, it } from "vitest";
import { buildFindings, type FindingInput } from "../lib/findings";
import { formatBytes, formatMoney, formatRatio, parseCount } from "../lib/format";

const base: FindingInput = {
  status: 200,
  contentType: "application/json",
  contentEncoding: null,
  vary: null,
  wireBytes: 50_000,
  rawBytes: 50_000,
  isJson: true,
  minifiedBytes: 50_000,
  alreadyCompressedMedia: false,
  gzipBytes: 10_000,
  brotliBytes: 8_000,
  zstdBytes: 9_000,
  redirectTo: null,
};
const ids = (f: FindingInput) => buildFindings(f).map((x) => x.id);

describe("findings", () => {
  it("flags missing compression", () => expect(ids(base)).toContain("no-compression"));
  it("flags gzip-only when brotli is meaningfully smaller", () => {
    expect(ids({ ...base, contentEncoding: "gzip", wireBytes: 10_000, vary: "Accept-Encoding" })).toEqual(["gzip-only"]);
  });
  it("flags missing Vary when compressed", () => {
    expect(ids({ ...base, contentEncoding: "br", wireBytes: 8_000 })).toEqual(["missing-vary"]);
  });
  it("flags pretty-printed JSON", () => expect(ids({ ...base, minifiedBytes: 30_000 })).toContain("pretty-json"));
  it("flags tiny responses and skips compression advice", () => {
    expect(ids({ ...base, rawBytes: 500, wireBytes: 500, gzipBytes: 300, brotliBytes: 280, zstdBytes: 290 })).toEqual(["small"]);
  });
  it("flags media", () => expect(ids({ ...base, alreadyCompressedMedia: true })).toEqual(["media"]));
  it("flags redirects", () => expect(ids({ ...base, status: 301, redirectTo: "https://x.com/" })).toContain("redirect"));
});

describe("formatting", () => {
  it("formats sizes, money and ratios", () => {
    expect(formatBytes(999)).toBe("999 B");
    expect(formatBytes(1_500)).toBe("1.50 KB");
    expect(formatBytes(7.2e12)).toBe("7.20 TB");
    expect(formatMoney(1234.5, "USD")).toBe("$1,234.50");
    expect(formatMoney(10, "EUR")).toBe("10.00 EUR");
    expect(formatRatio(52_000, 10_000)).toBe("5.2x smaller, −81%");
  });
  it("parses request counts", () => {
    expect(parseCount("10,000,000")).toBe(10_000_000);
    expect(parseCount("25M")).toBe(25_000_000);
    expect(parseCount("1.5b")).toBe(1_500_000_000);
    expect(parseCount("abc")).toBeNull();
  });
});
