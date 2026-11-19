import { describe, expect, it } from "vitest";
import { computeCosts } from "../lib/costs";
import { demoPayload, socialFeedPages } from "../lib/demo";
import {
  buildNextUrl,
  classifyParam,
  detectPaginationParam,
  findNextCursor,
  getQueryParam,
  hasMoreIndicator,
  itemCount,
  maxDeviation,
  pageRequests,
  sameEndpoint,
  sessionEgressBytes,
  setQueryParam,
  stopReason,
  type NextInput,
} from "../lib/pagination";
import { getDefaultPricing, monthlyCostForBytes } from "../lib/pricing";
import { samplePages, type FetchedPage } from "../lib/sampler";
import type { AnalysisResult } from "../lib/types";

const next = (o: Partial<NextInput> & { url: string; param: string }) =>
  buildNextUrl({ kind: classifyParam(o.param), json: null, firstPageItemCount: null, ...o });

describe("detectPaginationParam", () => {
  it.each([
    ["https://a.com/items?skip=20&limit=10", "skip"],
    ["https://a.com/items?offset=0", "offset"],
    ["https://a.com/items?page=2", "page"],
    ["https://a.com/items?pageNumber=1", "pageNumber"],
    ["https://a.com/search?q=x&p=3", "p"],
    ["https://a.com/feed?cursor=abc", "cursor"],
    ["https://a.com/feed?Page=2", "Page"],
  ])("%s -> %s", (url, want) => expect(detectPaginationParam(url)).toBe(want));

  it("returns null when there's no pagination param", () => {
    expect(detectPaginationParam("https://a.com/items?limit=10&sort=asc")).toBeNull();
    expect(detectPaginationParam("https://a.com/items")).toBeNull();
    expect(detectPaginationParam(null)).toBeNull();
    // "pages" and "per_page" are not "page"
    expect(detectPaginationParam("https://a.com/x?pages=3&per_page=10")).toBeNull();
  });
});

describe("setQueryParam", () => {
  it("changes only the given param and keeps other bytes exactly", () => {
    const url = "https://a.com/v1/items?q=red%20shoes&skip=0&sort=-price&tags=a,b";
    expect(setQueryParam(url, "skip", "20")).toBe("https://a.com/v1/items?q=red%20shoes&skip=20&sort=-price&tags=a,b");
  });
  it("appends the param when absent", () => {
    expect(setQueryParam("https://a.com/x?limit=10", "cursor", "abc")).toBe("https://a.com/x?limit=10&cursor=abc");
    expect(setQueryParam("https://a.com/x", "page", "2")).toBe("https://a.com/x?page=2");
  });
  it("encodes the new value", () => {
    expect(setQueryParam("https://a.com/x?cursor=a", "cursor", "b/c=d")).toBe("https://a.com/x?cursor=b%2Fc%3Dd");
  });
});

describe("buildNextUrl: skip / offset", () => {
  it("uses the limit param as the step", () => {
    const r = next({ url: "https://a.com/items?skip=0&limit=25", param: "skip", firstPageItemCount: 10 });
    expect(r).toEqual({ ok: true, url: "https://a.com/items?skip=25&limit=25" });
  });
  it.each(["take", "size", "per_page"])("uses %s as the step", (name) => {
    const r = next({ url: `https://a.com/items?offset=40&${name}=20`, param: "offset" });
    expect(r).toEqual({ ok: true, url: `https://a.com/items?offset=60&${name}=20` });
  });
  it("falls back to page 1's item count when there's no limit param", () => {
    const r = next({ url: "https://a.com/items?offset=0", param: "offset", firstPageItemCount: 30 });
    expect(r).toEqual({ ok: true, url: "https://a.com/items?offset=30" });
  });
  it("advances from the current offset on later pages", () => {
    const r = next({ url: "https://a.com/items?skip=60", param: "skip", firstPageItemCount: 30 });
    expect(r).toEqual({ ok: true, url: "https://a.com/items?skip=90" });
  });
  it("stops when the page size can't be determined", () => {
    const r = next({ url: "https://a.com/items?skip=0", param: "skip", firstPageItemCount: null });
    expect(r.ok).toBe(false);
  });
  it("stops on a non-numeric offset", () => {
    expect(next({ url: "https://a.com/items?skip=abc&limit=5", param: "skip" }).ok).toBe(false);
  });
});

describe("buildNextUrl: page numbers", () => {
  it.each([
    ["https://a.com/items?page=1", "page", "https://a.com/items?page=2"],
    ["https://a.com/items?pageNumber=4&size=10", "pageNumber", "https://a.com/items?pageNumber=5&size=10"],
    ["https://a.com/search?q=x&p=0", "p", "https://a.com/search?q=x&p=1"],
  ])("%s", (url, param, want) => expect(next({ url, param })).toEqual({ ok: true, url: want }));
});

describe("buildNextUrl: cursor", () => {
  const url = "https://a.com/feed?limit=10&cursor=abc";
  it.each([
    [{ nextCursor: "n1" }, "n1"],
    [{ next_cursor: "n2" }, "n2"],
    [{ cursor: "n3", data: [] }, "n3"],
    [{ next: "n4" }, "n4"],
    [{ pagination: { next: "n5" } }, "n5"],
    [{ meta: { next: "n6" } }, "n6"],
  ])("reads %j", (json, cursor) => {
    expect(next({ url, param: "cursor", json })).toEqual({ ok: true, url: `https://a.com/feed?limit=10&cursor=${cursor}` });
  });
  it("accepts a full next URL on the same endpoint, taking only the cursor", () => {
    const json = { next: "https://a.com/feed?cursor=xyz&limit=10&debug=1" };
    expect(next({ url, param: "cursor", json })).toEqual({ ok: true, url: "https://a.com/feed?limit=10&cursor=xyz" });
  });
  it("refuses a next URL on another host", () => {
    expect(next({ url, param: "cursor", json: { next: "https://evil.example/feed?cursor=xyz" } }).ok).toBe(false);
  });
  it("stops when no cursor is found", () => {
    const r = next({ url, param: "cursor", json: { data: [1, 2] } });
    expect(r).toEqual({ ok: false, reason: "the response has no next cursor" });
  });
  it("stops when the cursor doesn't change", () => {
    expect(next({ url, param: "cursor", json: { nextCursor: "abc" } }).ok).toBe(false);
  });
});

describe("response helpers", () => {
  it("counts items from a top-level array or the first array field", () => {
    expect(itemCount([1, 2, 3])).toBe(3);
    expect(itemCount({ data: [1, 2] })).toBe(2);
    expect(itemCount({ meta: {}, items: [1] })).toBe(1);
    expect(itemCount({ results: [] })).toBe(0);
    expect(itemCount({ data: { posts: [1, 2, 3, 4] } })).toBe(4);
    expect(itemCount({ whatever: [1, 2] })).toBe(2);
    expect(itemCount({ a: 1 })).toBeNull();
  });
  it("finds next cursors", () => {
    expect(findNextCursor({ meta: { next: 42 } })).toBe("42");
    expect(findNextCursor({ nextCursor: null })).toBeNull();
  });
  it("detects has-more indicators", () => {
    expect(hasMoreIndicator({ data: [], hasMore: false })).toBe(true);
    expect(hasMoreIndicator({ items: [], meta: { next_cursor: null } })).toBe(true);
    expect(hasMoreIndicator({ items: [], total: 200 })).toBe(true);
    expect(hasMoreIndicator([1, 2, 3])).toBe(false);
    expect(hasMoreIndicator({ items: [1] })).toBe(false);
    expect(hasMoreIndicator([1], '<https://a.com/x?page=2>; rel="next"')).toBe(true);
  });
  it("only allows same scheme, host and path", () => {
    expect(sameEndpoint("https://a.com/x?page=1", "https://a.com/x?page=2")).toBe(true);
    expect(sameEndpoint("https://a.com/x", "https://b.com/x")).toBe(false);
    expect(sameEndpoint("https://a.com/x", "https://a.com/y")).toBe(false);
    expect(sameEndpoint("https://a.com/x", "http://a.com/x")).toBe(false);
  });
});

describe("session math", () => {
  it("1,000,000 sessions × 5 pages × 50 KB = 250 GB → $13.50", () => {
    expect(pageRequests(1_000_000, 5)).toBe(5_000_000);
    const bytes = sessionEgressBytes(1_000_000, 5, 50_000);
    expect(bytes).toBe(250e9);
    // (250 − 100 free) × $0.09
    expect(Math.round(monthlyCostForBytes(bytes, getDefaultPricing()) * 100) / 100).toBe(13.5);
  });

  it("cost rows use the average sampled page size", () => {
    const a = {
      source: "live",
      status: 200,
      contentType: "application/json",
      contentEncoding: null,
      vary: null,
      wireBytes: 40_000,
      rawBytes: 40_000,
      isJson: true,
      minifiedBytes: 40_000,
      alreadyCompressedMedia: false,
      gzip: { available: true, bytes: 8_000, ms: 1 },
      brotli: { available: true, bytes: 7_000, ms: 1 },
      zstd: { available: true, bytes: 7_500, ms: 1 },
      findings: [],
      preview: "",
      previewTruncated: false,
      responseHeaders: {},
      redirectTo: null,
      pagination: {
        param: "page",
        kind: "page",
        pages: [],
        average: { wireBytes: 50_000, rawBytes: 50_000, minifiedBytes: 50_000, gzipBytes: 10_000, brotliBytes: 9_000, zstdBytes: 9_500 },
        stopReason: null,
        hasMoreIndicator: true,
        maxDeviation: 0.1,
      },
    } as unknown as AnalysisResult;
    a.pagination!.pages = [{ page: 1, status: 200, items: 10, wireBytes: 50_000, rawBytes: 50_000, minifiedBytes: 50_000, gzipBytes: 10_000, brotliBytes: 9_000, zstdBytes: 9_500 }];

    const s = computeCosts(a, pageRequests(1_000_000, 5), getDefaultPricing(), true);
    expect(s.today.bytes).toBe(50_000);
    expect(s.today.monthlyBytes).toBe(250e9);
    expect(Math.round(s.today.monthlyCost * 100) / 100).toBe(13.5);
    // Without pagination, page 1 sizes are used as before.
    expect(computeCosts(a, 5_000_000, getDefaultPricing(), false).today.bytes).toBe(40_000);
  });

  it("measures how much page sizes vary", () => {
    expect(maxDeviation([100, 100, 100])).toBe(0);
    expect(maxDeviation([50, 100, 150])).toBeCloseTo(0.5);
  });
});

describe("early stop", () => {
  const body = (s: string) => Buffer.from(s);
  it("stops on non-2xx", () => {
    expect(stopReason({ pageNumber: 3, status: 404, body: body("{}"), previousBody: null, json: {} })).toBe("page 3 returned HTTP 404");
    expect(stopReason({ pageNumber: 2, status: 301, body: body(""), previousBody: null, json: null })).toMatch(/HTTP 301/);
  });
  it("stops on an empty array", () => {
    expect(stopReason({ pageNumber: 4, status: 200, body: body("[]"), previousBody: null, json: [] })).toBe("page 4 returned an empty list");
    expect(stopReason({ pageNumber: 2, status: 200, body: body('{"items":[]}'), previousBody: null, json: { items: [] } })).toMatch(/empty list/);
  });
  it("stops on a duplicate body", () => {
    const b = body('{"items":[1]}');
    expect(stopReason({ pageNumber: 2, status: 200, body: b, previousBody: Buffer.from(b), json: { items: [1] } })).toBe("page 2 was identical to page 1");
  });
  it("keeps a normal page", () => {
    expect(stopReason({ pageNumber: 2, status: 200, body: body('{"items":[2]}'), previousBody: body('{"items":[1]}'), json: { items: [2] } })).toBeNull();
  });
});

describe("samplePages", () => {
  const page = (items: unknown[], extra: object = {}): FetchedPage => {
    const raw = Buffer.from(JSON.stringify({ items, ...extra }));
    return { status: 200, raw, wireBytes: raw.length, contentType: "application/json" };
  };

  function harness(pages: Record<string, FetchedPage>) {
    const requested: string[] = [];
    const sleeps: number[] = [];
    return {
      requested,
      sleeps,
      fetchPage: async (url: string) => {
        requested.push(url);
        return pages[url] ?? { error: "unexpected URL" };
      },
      sleep: async (ms: number) => {
        sleeps.push(ms);
      },
    };
  }

  it("fetches at most 5 pages, sequentially with 300 ms gaps, changing only the param", async () => {
    const pages: Record<string, FetchedPage> = {};
    for (let i = 2; i <= 10; i++) pages[`https://a.com/items?page=${i}&limit=2`] = page([i, i]);
    const h = harness(pages);
    const r = await samplePages({ firstUrl: "https://a.com/items?page=1&limit=2", param: "page", firstPage: page([1, 1]), ...h });
    expect(r.pages.map((p) => p.page)).toEqual([1, 2, 3, 4, 5]);
    expect(h.requested).toHaveLength(4); // + page 1 = 5 outbound requests total
    expect(h.sleeps).toEqual([300, 300, 300, 300]);
    expect(h.requested.every((u) => u.startsWith("https://a.com/items?page=") && u.endsWith("&limit=2"))).toBe(true);
    expect(r.stopReason).toBeNull();
  });

  it("stops at an empty page and excludes it from the average", async () => {
    const h = harness({
      "https://a.com/i?skip=2": page([3, 4]),
      "https://a.com/i?skip=4": page([]),
    });
    const r = await samplePages({ firstUrl: "https://a.com/i?skip=0", param: "skip", firstPage: page([1, 2]), ...h });
    expect(r.pages).toHaveLength(2);
    expect(r.stopReason).toBe("page 3 returned an empty list");
    expect(h.requested).toHaveLength(2);
  });

  it("stops on a non-2xx page", async () => {
    const h = harness({ "https://a.com/i?page=2": { status: 500, raw: Buffer.from("oops"), wireBytes: 4, contentType: "text/plain" } });
    const r = await samplePages({ firstUrl: "https://a.com/i?page=1", param: "page", firstPage: page([1]), ...h });
    expect(r.pages).toHaveLength(1);
    expect(r.stopReason).toBe("page 2 returned HTTP 500");
  });

  it("stops when a page repeats the previous body (API ignores the param)", async () => {
    const h = harness({ "https://a.com/i?page=2": page([1]) });
    const r = await samplePages({ firstUrl: "https://a.com/i?page=1", param: "page", firstPage: page([1]), ...h });
    expect(r.pages).toHaveLength(1);
    expect(r.stopReason).toBe("page 2 was identical to page 1");
  });

  it("uses page 1 only when no cursor is found", async () => {
    const h = harness({});
    const r = await samplePages({ firstUrl: "https://a.com/feed", param: "cursor", firstPage: page([1, 2]), ...h });
    expect(r.pages).toHaveLength(1);
    expect(h.requested).toHaveLength(0);
    expect(r.stopReason).toMatch(/no next cursor/);
  });

  it("doesn't paginate when page 1 itself failed", async () => {
    const h = harness({});
    const first = { status: 404, raw: Buffer.from("{}"), wireBytes: 2, contentType: "application/json" };
    const r = await samplePages({ firstUrl: "https://a.com/i?page=1", param: "page", firstPage: first, ...h });
    expect(h.requested).toHaveLength(0);
    expect(r.stopReason).toBe("page 1 returned HTTP 404");
  });

  it("keeps earlier pages when a later fetch fails", async () => {
    const h = harness({ "https://a.com/i?page=2": page([2]) });
    const r = await samplePages({ firstUrl: "https://a.com/i?page=1", param: "page", firstPage: page([1]), ...h });
    expect(r.pages).toHaveLength(2);
    expect(r.stopReason).toBe("page 3 failed: unexpected URL");
  });

  it("averages per-page sizes", async () => {
    const h = harness({ "https://a.com/i?page=2": page([2, 2, 2, 2]) });
    const p1 = page([1]);
    const r = await samplePages({ firstUrl: "https://a.com/i?page=1", param: "page", firstPage: p1, ...h, fetchPage: async (u) => (u.endsWith("=2") ? page([2, 2, 2, 2]) : { error: "x" }) });
    expect(r.average.rawBytes).toBe((r.pages[0].rawBytes + r.pages[1].rawBytes) / 2);
    expect(r.pages.map((p) => p.items)).toEqual([1, 4]);
  });
});

describe("demo payloads", () => {
  it("existing demos are byte-for-byte unchanged", () => {
    expect(Buffer.byteLength(demoPayload("social"))).toBe(33_558);
    expect(Buffer.byteLength(demoPayload("ecommerce"))).toBe(86_916);
    expect(Buffer.byteLength(demoPayload("analytics"))).toBe(27_907);
  });
  it("the social feed has 5 pages of 10 posts with slightly different sizes", () => {
    const pages = socialFeedPages();
    expect(pages).toHaveLength(5);
    for (const p of pages) expect(JSON.parse(p).data).toHaveLength(10);
    const sizes = pages.map((p) => p.length);
    expect(new Set(sizes).size).toBe(5);
    expect(maxDeviation(sizes)).toBeLessThan(0.3);
    expect(getQueryParam("https://x.com/f?cursor=a%2Fb", "cursor")).toBe("a/b");
  });
});
