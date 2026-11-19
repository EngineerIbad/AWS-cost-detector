/**
 * Sequentially samples up to MAX_SAMPLED_PAGES pages of a paginated endpoint.
 *
 * The actual HTTP call is injected (`fetchPage`) so the route can route every
 * page through safeFetch (DNS/IP vetting, pinned lookup, no redirects, timeout,
 * size cap), and so tests can run without a network. Nothing here logs.
 */
import { measurePage, parseBody, type ParsedBody } from "./analyze";
import {
  buildNextUrl,
  classifyParam,
  hasMoreIndicator,
  itemCount,
  MAX_SAMPLED_PAGES,
  maxDeviation,
  mean,
  PAGE_DELAY_MS,
  sameEndpoint,
  stopReason,
} from "./pagination";
import type { PageAverages, PageSample, PaginationResult } from "./types";

export interface FetchedPage {
  status: number;
  /** Decoded body. */
  raw: Buffer;
  wireBytes: number;
  contentType: string | null;
}

export type PageFetcher = (url: string) => Promise<FetchedPage | { error: string }>;

export interface SampleOptions {
  firstUrl: string;
  param: string;
  firstPage: FetchedPage & { link?: string | null };
  fetchPage: PageFetcher;
  /** Injected for tests. */
  sleep?: (ms: number) => Promise<void>;
  /** Don't start another page after this many ms. Keeps the whole analysis inside the function timeout. */
  budgetMs?: number;
  now?: () => number;
}

const defaultSleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export function averagePages(pages: PageSample[]): PageAverages {
  const allMinified = pages.every((p) => p.minifiedBytes !== null);
  const allZstd = pages.every((p) => p.zstdBytes !== null);
  return {
    wireBytes: mean(pages.map((p) => p.wireBytes)),
    rawBytes: mean(pages.map((p) => p.rawBytes)),
    minifiedBytes: allMinified ? mean(pages.map((p) => p.minifiedBytes as number)) : null,
    gzipBytes: mean(pages.map((p) => p.gzipBytes)),
    brotliBytes: mean(pages.map((p) => p.brotliBytes)),
    zstdBytes: allZstd ? mean(pages.map((p) => p.zstdBytes as number)) : null,
  };
}

export async function samplePages(o: SampleOptions): Promise<PaginationResult> {
  const sleep = o.sleep ?? defaultSleep;
  const now = o.now ?? Date.now;
  const started = now();
  const budget = o.budgetMs ?? 12_000;
  const kind = classifyParam(o.param);

  const firstParsed = parseBody(o.firstPage.raw, o.firstPage.contentType);
  const firstItems = firstParsed.isJson ? itemCount(firstParsed.json) : null;
  const pages: PageSample[] = [measurePage(1, o.firstPage.status, o.firstPage.raw, o.firstPage.wireBytes, firstParsed, firstItems)];

  const finish = (reason: string | null): PaginationResult => ({
    param: o.param,
    kind,
    pages,
    average: averagePages(pages),
    stopReason: reason,
    hasMoreIndicator: hasMoreIndicator(firstParsed.json, o.firstPage.link),
    maxDeviation: maxDeviation(pages.map((p) => p.rawBytes)),
  });

  // Page 1 itself may already be a reason not to continue.
  const firstStop = stopReason({ pageNumber: 1, status: o.firstPage.status, body: o.firstPage.raw, previousBody: null, json: firstParsed.json });
  if (firstStop) return finish(firstStop);

  let cur: { url: string; raw: Buffer; parsed: ParsedBody } = { url: o.firstUrl, raw: o.firstPage.raw, parsed: firstParsed };
  let outbound = 1; // page 1 already fetched

  while (pages.length < MAX_SAMPLED_PAGES) {
    const n = pages.length + 1;
    const next = buildNextUrl({ url: cur.url, param: o.param, kind, json: cur.parsed.json, firstPageItemCount: firstItems });
    if (!next.ok) return finish(`stopped after page ${n - 1}: ${next.reason}`);
    if (!sameEndpoint(o.firstUrl, next.url)) return finish(`stopped after page ${n - 1}: the next page would change the host or path`);
    if (now() - started > budget) return finish(`stopped after page ${n - 1} to stay within the time limit`);
    if (outbound >= MAX_SAMPLED_PAGES) break; // hard cap, belt and braces

    await sleep(PAGE_DELAY_MS);
    outbound++;
    const res = await o.fetchPage(next.url);
    if ("error" in res) return finish(`page ${n} failed: ${res.error}`);

    const parsed = parseBody(res.raw, res.contentType);
    const reason = stopReason({ pageNumber: n, status: res.status, body: res.raw, previousBody: cur.raw, json: parsed.json });
    if (reason) return finish(reason);

    pages.push(measurePage(n, res.status, res.raw, res.wireBytes, parsed, parsed.isJson ? itemCount(parsed.json) : null));
    cur = { url: next.url, raw: res.raw, parsed };
  }
  return finish(null);
}
