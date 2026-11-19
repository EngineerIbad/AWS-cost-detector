# API Egress Cost Calculator

**How much does your API response really cost?**

Give the tool an API endpoint (as a curl command or a simple form) or a sample response. It measures the response size, checks how much Gzip, Brotli and Zstd would shrink it, and shows what that payload costs in AWS data transfer out (egress) each month at your traffic level, before and after compression.

- **Three input modes:** Paste curl · Form · Demo. Demo is the default and needs no network call; it can also analyze a sample response you paste in.
- **Measurement:** status, content type, `Content-Encoding`, `Vary`, wire size, raw size, minified JSON size, and Gzip (level 6), Brotli (quality 5) and Zstd (level 3) sizes, ratios and compression times.
- **Cost:** tiered AWS pricing (editable). Costs recalculate instantly in the browser.
- **Findings:** plain-language recommendations with a severity (High / Medium / Info), including URL hygiene (a literal `undefined`/`null`/`NaN` in the URL, tokens in the URL).
- **Pagination:** for paginated endpoints, it samples up to 5 real pages and estimates cost per session (see below).
- **No database, no auth, nothing stored.**

Built with Next.js (App Router) and TypeScript, using plain CSS. Runtime dependencies are `next`, `react` and `react-dom` only.

---

## Local development

Requires **Node 22+**. Node 24 is recommended: Zstd needs `zlib.zstdCompressSync`, and on older runtimes the Zstd row shows "not available on this runtime".

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # Vitest unit tests
npm run typecheck  # tsc --noEmit
npm run build && npm start
```

Optional environment variable:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Absolute site URL for Open Graph links (e.g. `https://egress.example.com`). On Vercel, `VERCEL_PROJECT_PRODUCTION_URL` is used automatically. |

## Deploying to Vercel

1. Push the repo to GitHub/GitLab/Bitbucket and import it at <https://vercel.com/new>. The framework preset is detected as Next.js.
2. In **Project → Settings → General → Node.js Version**, choose **24.x** so Zstd is available.
3. Deploy. The page is statically pre-rendered, and the three demo results are computed at build time, so first-time visitors see results immediately. `/api/analyze` runs as a Node.js function.
4. **Enable Vercel Firewall rate limiting** (strongly recommended, see below): **Project → Firewall → Configure → New Rule**:
   - If: *Request Path* equals `/api/analyze`
   - Then: *Rate Limit*, fixed window, **10 requests / 60 s**, keyed on **IP**, action **Deny (429)**.

   The in-app limiter is per serverless instance. The Firewall rule enforces the limit across all instances.

## Security design

`POST /api/analyze` fetches URLs that strangers paste in, so it is built as a hardened, single-shot proxy ([lib/safeFetch.ts](lib/safeFetch.ts), [lib/ip.ts](lib/ip.ts)).

| Threat | Mitigation |
|---|---|
| SSRF to internal services / cloud metadata | Only `http`/`https`, only ports **80, 443, 8080, 8443**. URLs with embedded credentials and `localhost`/`.local`/`.internal` names are rejected. |
| Private/reserved IPs | The hostname is resolved with `dns.lookup({ all: true })`. If **any** address is private, loopback, link-local, CGNAT, multicast, unspecified or reserved, the request is refused. IPv4: `0/8, 10/8, 100.64/10, 127/8, 169.254/16, 172.16/12, 192.0.0/24, 192.168/16, 198.18/15, 224/4, 240/4` plus the TEST-NETs. IPv6: `::`, `::1`, `fc00::/7`, `fe80::/10`, `ff00::/8`, site-local, documentation and Teredo, and anything outside `2000::/3`. IPv4-mapped (`::ffff:a.b.c.d`, also in hex form), IPv4-compatible, NAT64 and 6to4 addresses are judged by their embedded IPv4. Input that can't be parsed is blocked (fail closed). |
| DNS rebinding | The request uses Node `http`/`https` with a custom `lookup` that returns the **already-vetted IP**, so there is no second DNS query. The original `Host` header and TLS `servername` (SNI) are kept, so certificates still validate. As a backstop, the socket's remote address is checked again. |
| Redirect-based SSRF | Redirects are **never followed**. A 3xx returns the finding "This endpoint redirects to X. Paste the final URL." |
| Resource abuse | 10 s overall deadline (DNS included), 5 MB response cap (aborted mid-stream), 25 MB cap on decompressed size (protects against decompression bombs), 100 KB outbound request body cap, **exactly one** outbound request per analysis with no retries, a fresh socket (`agent: false`) and only GET/POST/PUT/PATCH. |
| Rate limiting | In-memory sliding window of 10 **analyses** per minute per IP, plus the Vercel Firewall rule above. A paginated analysis counts once. |
| Pagination | At most **5 outbound requests per analysis** (page 1 plus up to 4 more), made one at a time with 300 ms between them and no retries. Every page goes through the **same** `safeFetch` checks: scheme/port allow-list, fresh DNS vetting of every address, pinned lookup, no redirects, 10 s timeout, 5 MB cap. Next-page URLs change **only** the pagination query param. All other query bytes, the host, path, method, headers and body stay identical, and each next URL is checked again for same scheme/host/path before it is requested. A "next" link in a response is only followed if it points to the same origin and path, and then only its cursor value is used. No new page starts after 12 s, so the whole analysis stays inside the 30 s function limit. Page URLs are never returned to the browser. |
| Header smuggling | Hop-by-hop headers, `Host`, `Content-Length`, `Accept-Encoding`, `Proxy-*` and `X-Forwarded-*` are stripped from user headers. CR/LF in values is rejected. |
| Data leakage | URLs, headers, tokens, bodies and responses are **never logged or stored**. The API returns sizes, findings, a 500-character preview and an allow-list of non-sensitive response headers (no `Set-Cookie`). It never returns the full body. Error messages never echo tokens or headers. |

The UI reminds users: *"Sent once from our server, never stored. Use a test token if you can."*

## Pagination

Turn on **"Is this endpoint paginated?"** under the request inputs. It switches on by itself when the URL has a `skip`, `offset`, `page`, `pageNumber`, `p` or `cursor` query param.

- **Pagination param:** the query param that changes per page (prefilled when detected, editable).
- **Pages per session:** how many pages an average user loads (1–50, default 5).
- **Traffic** becomes *Monthly sessions*, and page requests = sessions × pages per session.

The server fetches up to **5 real pages** in sequence and builds each next URL like this:

| Param | Next page |
|---|---|
| `skip`, `offset` | current + step. The step is the value of `limit`/`take`/`size`/`per_page` (also `perPage`, `pageSize`, `page_size`), otherwise page 1's item count (the top-level array, or the first array field such as `data`/`items`/`posts`/`results`). |
| `page`, `pageNumber`, `p` | current + 1 |
| `cursor` | read from the response: `nextCursor`, `next_cursor`, `cursor`, `next`, `pagination.next`, `meta.next`. If none is found, only page 1 is used. |

Other param names are classified by their name, e.g. `_page` advances like `page` and `after` like `cursor`.

Sampling stops early, and the stopping page is discarded, if a page returns a non-2xx status, an empty list, or exactly the same body as the previous page (which usually means the API ignores the param). A failed later page keeps the pages already fetched.

Every format row uses the **average sampled page size**: monthly egress = sessions × pages per session × average page size. If pages per session is higher than the number of pages sampled, the result says it was extrapolated. The **Pages sampled** table shows each page's item count, raw size and best compressed size, and warns when a page's size is more than 30% away from the average. If the first page has no "has more" or next indicator (`hasMore`, a next cursor, `total`, or a `Link: rel="next"` header), a finding suggests adding one.

The Social media feed demo has a paginated version: 5 locally generated cursor pages of 10 posts each, built at compile time through the same sampler with no network calls.

## Updating default pricing

All defaults live in a single object in [lib/pricing.ts](lib/pricing.ts):

```ts
export const defaultPricing = {
  currency: "USD",
  lastVerified: "2026-11-16",
  region: "us-east-1",
  source: "https://aws.amazon.com/ec2/pricing/on-demand/#Data_Transfer",
  tiers: [
    { upToGB: 100, pricePerGB: 0 },
    { upToGB: 10_000, pricePerGB: 0.09 },
    { upToGB: 50_000, pricePerGB: 0.085 },
    { upToGB: 150_000, pricePerGB: 0.07 },
    { upToGB: null, pricePerGB: 0.05 }, // last tier must be unlimited
  ],
};
```

1. Check the **Data Transfer** section of the [AWS EC2 on-demand pricing page](https://aws.amazon.com/ec2/pricing/on-demand/).
2. Edit `tiers`. Limits are cumulative monthly GB (1 GB = 10⁹ bytes), and the final tier has `upToGB: null`.
3. Set `lastVerified` to today's date. The "AWS rates verified …" badge reads it.
4. Update the expected values in [tests/pricing.test.ts](tests/pricing.test.ts) and run `npm test`.

Visitors who saved custom pricing in `localStorage` keep it. Everyone else gets the new defaults.

## Project layout

```
app/
  page.tsx               static page; pre-computes the demo analyses at build time
  layout.tsx             metadata, Poppins via next/font
  api/analyze/route.ts   the analysis endpoint (Node.js runtime)
  opengraph-image.tsx    generated social card
components/              App (inputs + state), PricingPanel, Results
lib/
  curl.ts                curl tokenizer/parser
  ip.ts                  private/reserved IP checks (pure)
  safeFetch.ts           SSRF-hardened single-shot HTTP client
  analyze.ts             decode + measure + compress
  findings.ts            recommendation rules (pure)
  pagination.ts          param detection, next-URL builder, stop rules, session math (pure)
  sampler.ts             sequential page sampling with an injected fetcher
  urlChecks.ts           undefined/null/NaN and token-in-URL detection (pure)
  pricing.ts             defaults, tier math, validation, share-URL encoding
  costs.ts               per-row costs, savings, copyable summary
  demo.ts                seeded demo payload generators
tests/                   Vitest unit tests
```

## Assumptions in the numbers

- Monthly egress = response body size × monthly requests, or sessions × pages per session × average page size when pagination is on. HTTP headers, TLS and TCP overhead aren't counted.
- Compression rows compress the body **as served**, not minified.
- Pricing is AWS internet egress for us-east-1. It doesn't cover CloudFront, inter-region or inter-AZ transfer, or the free tier being shared across services.
