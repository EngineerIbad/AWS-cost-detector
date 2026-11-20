/**
 * Privacy-safe product analytics (Vercel Web Analytics).
 *
 * Only the events below can be sent, and each property must be one of a fixed
 * set of values. Anything else is dropped before it leaves the browser, so a
 * URL, header, token, size, body or free text can never be sent, even by
 * mistake. Note: custom events are recorded on Vercel Pro; on Hobby only page
 * views are kept, and these calls are harmless no-ops.
 */
import { track as vercelTrack } from "@vercel/analytics";

const TRAFFIC_BUCKETS = ["0", "<100K", "100K-1M", "1M-10M", "10M-100M", "100M+"] as const;

const SCHEMA = {
  demo_used: { demo: ["social", "ecommerce", "analytics", "paste"] },
  curl_measured: {
    mode: ["curl", "form"],
    outcome: ["success", "error", "cancelled"],
    error: [
      "none",
      "curl_parse",
      "bad_method",
      "private_address",
      "timeout",
      "response_too_large",
      "rate_limited",
      "dns_failed",
      "network",
      "http_401_403",
      "other",
    ],
    paginated: [true, false],
  },
  traffic_changed: { input: ["preset", "custom"], unit: ["requests", "sessions"], bucket: TRAFFIC_BUCKETS },
  pricing_mode_changed: { model: ["direct", "cloudfront"], free_tier: [true, false], custom_rates: [true, false] },
  share_clicked: { source: ["calculator"] },
  copy_results_clicked: { source: ["calculator", "shared"] },
} as const;

export type EventName = keyof typeof SCHEMA;
type Props<E extends EventName> = { [K in keyof (typeof SCHEMA)[E]]?: (typeof SCHEMA)[E][K] extends readonly (infer V)[] ? V : never };

/** Keep only allow-listed keys whose value is in that key's fixed set. */
export function sanitizeEvent(name: string, props: Record<string, unknown> = {}): Record<string, string | boolean> | null {
  if (!(name in SCHEMA)) return null;
  const allowed = SCHEMA[name as EventName] as Record<string, readonly (string | boolean)[]>;
  const out: Record<string, string | boolean> = {};
  for (const [k, v] of Object.entries(props)) {
    if (!(k in allowed)) continue;
    if ((typeof v === "string" || typeof v === "boolean") && allowed[k].includes(v)) out[k] = v;
  }
  return out;
}

export function trafficBucket(n: number): (typeof TRAFFIC_BUCKETS)[number] {
  if (n <= 0) return "0";
  if (n < 1e5) return "<100K";
  if (n < 1e6) return "100K-1M";
  if (n < 1e7) return "1M-10M";
  if (n < 1e8) return "10M-100M";
  return "100M+";
}

/** Map a server error code to the small fixed set analytics accepts. */
export function errorBucket(code: string | null | undefined): Props<"curl_measured">["error"] {
  const known = SCHEMA.curl_measured.error as readonly string[];
  if (!code) return "none";
  return (known.includes(code) ? code : "other") as Props<"curl_measured">["error"];
}

export function track<E extends EventName>(name: E, props: Props<E> = {} as Props<E>): void {
  const clean = sanitizeEvent(name, props as Record<string, unknown>);
  if (!clean) return;
  try {
    vercelTrack(name, clean);
  } catch {
    /* analytics must never break the app */
  }
}

/** Strip query strings and fragments from every URL Vercel Analytics records. */
export function stripUrl(url: string): string {
  return url.split(/[?#]/)[0];
}
