import { describe, expect, it } from "vitest";
import { buildFindings, type FindingInput } from "../lib/findings";
import { findMissingValueLiterals, findTokensInUrl, looksLikeSecret } from "../lib/urlChecks";

describe("findMissingValueLiterals", () => {
  it.each([
    ["https://a.com/users/undefined/posts", "undefined", "path segment 2"],
    ["https://a.com/users/null", "null", "path segment 2"],
    ["https://a.com/items?page=NaN", "NaN", "?page"],
    ["https://a.com/items?userId=undefined&limit=10", "undefined", "?userId"],
    ["https://a.com/items?token=null", "null", "?token"],
  ])("%s", (url, literal, where) => {
    expect(findMissingValueLiterals(url)).toContainEqual({ literal, where });
  });

  it("ignores words that merely contain the literal", () => {
    expect(findMissingValueLiterals("https://a.com/nullable/undefinedBehaviour?q=nan-bread")).toEqual([]);
    expect(findMissingValueLiterals("https://a.com/users/42?sort=name")).toEqual([]);
  });

  it("handles encoded values", () => {
    expect(findMissingValueLiterals("https://a.com/x/%75ndefined")).toHaveLength(1);
  });
});

describe("findTokensInUrl", () => {
  it.each(["token", "access_token", "key", "api_key"])("flags ?%s=", (name) => {
    expect(findTokensInUrl(`https://a.com/x?${name}=abc123`)).toEqual([{ where: `?${name}` }]);
  });
  it("flags JWTs and long random strings in path or query", () => {
    const jwt = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMifQ.c2lnbmF0dXJlLXZhbHVl";
    expect(findTokensInUrl(`https://a.com/x?auth=${jwt}`)).toEqual([{ where: "?auth" }]);
    expect(findTokensInUrl("https://a.com/hooks/tok_4eC39HqLyjWDarjtT1zdp7dc9Xk2LmQz/run")).toEqual([{ where: "path segment 2" }]);
  });
  it("does not flag ordinary IDs, UUIDs, hashes or words", () => {
    expect(findTokensInUrl("https://a.com/users/123e4567-e89b-12d3-a456-426614174000")).toEqual([]);
    expect(findTokensInUrl("https://a.com/blobs/d41d8cd98f00b204e9800998ecf8427e")).toEqual([]);
    expect(findTokensInUrl("https://a.com/articles/how-to-reduce-aws-egress-costs-with-brotli?page=2")).toEqual([]);
    expect(findTokensInUrl("https://a.com/x?key=")).toEqual([]);
  });
  it("looksLikeSecret needs letters, digits and entropy", () => {
    expect(looksLikeSecret("a".repeat(40))).toBe(false);
    expect(looksLikeSecret("Zx9Qw2Lm7Np4Rt8Vb3Hy6Kc1Jd5Fg0Sa")).toBe(true);
  });
});

describe("URL findings", () => {
  const base: FindingInput = {
    status: 200,
    contentType: "application/json",
    contentEncoding: "br",
    vary: "Accept-Encoding",
    wireBytes: 8_000,
    rawBytes: 50_000,
    isJson: true,
    minifiedBytes: 50_000,
    alreadyCompressedMedia: false,
    gzipBytes: 10_000,
    brotliBytes: 8_000,
    zstdBytes: 9_000,
    redirectTo: null,
  };
  const ids = (f: Partial<FindingInput>) => buildFindings({ ...base, ...f }).map((x) => x.id);

  it("flags undefined in the URL with the spec wording", () => {
    const f = buildFindings({ ...base, requestUrl: "https://a.com/users/undefined" });
    const hit = f.find((x) => x.id === "url-missing-value")!;
    expect(hit.title).toBe("Your client is sending 'undefined' in the URL");
    expect(hit.detail).toMatch(/likely a missing value \(e\.g\. token or ID\) at request time/);
  });
  it("flags tokens in the URL without echoing them", () => {
    const f = buildFindings({ ...base, requestUrl: "https://a.com/x?api_key=SECRET123" });
    const hit = f.find((x) => x.id === "url-token")!;
    expect(hit.detail).toBe("Tokens in URLs end up in server, proxy and analytics logs. Send them in the Authorization header instead.");
    expect(JSON.stringify(f)).not.toContain("SECRET123");
  });
  it("flags missing has-more only when pagination ran", () => {
    expect(ids({ pagination: { hasMoreIndicator: false } })).toContain("no-has-more");
    expect(ids({ pagination: { hasMoreIndicator: true } })).not.toContain("no-has-more");
    expect(ids({})).not.toContain("no-has-more");
  });
  it("runs URL checks even when the body is empty", () => {
    expect(ids({ rawBytes: 0, wireBytes: 0, requestUrl: "https://a.com/x/null" })).toContain("url-missing-value");
  });
});
