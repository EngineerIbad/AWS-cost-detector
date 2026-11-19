import App, { type DemoResults } from "../components/App";
import { analyzeBody, encodeAs } from "../lib/analyze";
import { DEMOS, demoPayload, SOCIAL_DEMO_PARAM, SOCIAL_DEMO_URL, socialCursor, socialFeedPages, type DemoId } from "../lib/demo";
import { getQueryParam } from "../lib/pagination";
import { samplePages } from "../lib/sampler";
import type { AnalysisResult } from "../lib/types";

export const dynamic = "force-static";

const DEMO_CT = "application/json; charset=utf-8";

function demoHeaders(wireBytes: number, servedAs: string): Record<string, string> {
  const headers: Record<string, string> = {
    "content-type": DEMO_CT,
    "content-length": String(wireBytes),
    "cache-control": "private, max-age=0",
  };
  if (servedAs !== "identity") headers["content-encoding"] = servedAs;
  return headers;
}

function buildDemoResults(): Record<DemoId, AnalysisResult> {
  const out = {} as Record<DemoId, AnalysisResult>;
  for (const d of DEMOS) {
    const raw = Buffer.from(demoPayload(d.id), "utf8");
    const wire = encodeAs(raw, d.servedAs);
    out[d.id] = analyzeBody({
      source: "demo",
      raw,
      wireBytes: wire.length,
      status: 200,
      contentType: DEMO_CT,
      contentEncoding: d.servedAs === "identity" ? null : d.servedAs,
      vary: d.vary,
      responseHeaders: demoHeaders(wire.length, d.servedAs),
    });
  }
  return out;
}

/**
 * The social feed as a cursor-paginated API. Runs the same sampler the live
 * endpoint uses, with a local "fetcher" instead of the network.
 */
async function buildSocialPaged(): Promise<AnalysisResult> {
  const pages = socialFeedPages().map((p) => Buffer.from(p, "utf8"));
  const byCursor = new Map(pages.map((p, i) => [socialCursor(i + 1), p]));
  const first = pages[0];

  const pagination = await samplePages({
    firstUrl: SOCIAL_DEMO_URL,
    param: SOCIAL_DEMO_PARAM,
    firstPage: { status: 200, raw: first, wireBytes: first.length, contentType: DEMO_CT },
    sleep: async () => {},
    fetchPage: async (url) => {
      const raw = byCursor.get(getQueryParam(url, SOCIAL_DEMO_PARAM) ?? "");
      if (!raw) return { status: 404, raw: Buffer.alloc(0), wireBytes: 0, contentType: DEMO_CT };
      return { status: 200, raw, wireBytes: raw.length, contentType: DEMO_CT };
    },
  });

  return analyzeBody({
    source: "demo",
    raw: first,
    wireBytes: first.length,
    status: 200,
    contentType: DEMO_CT,
    contentEncoding: null,
    vary: null,
    responseHeaders: demoHeaders(first.length, "identity"),
    pagination,
  });
}

export default async function Page() {
  const demoResults: DemoResults = { ...buildDemoResults(), socialPaged: await buildSocialPaged() };
  return <App demoResults={demoResults} />;
}
