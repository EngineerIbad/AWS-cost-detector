/**
 * Deterministic, realistic demo payloads. Seeded so the server render and
 * every build produce identical bytes.
 */

export type DemoId = "social" | "ecommerce" | "analytics";

export interface DemoScenario {
  id: DemoId;
  label: string;
  /** How this fictional API serves the payload today. */
  servedAs: "identity" | "gzip";
  vary: string | null;
  pretty: boolean;
  blurb: string;
}

export const DEMOS: DemoScenario[] = [
  {
    id: "social",
    label: "Social media feed (50 posts)",
    servedAs: "identity",
    vary: null,
    pretty: false,
    blurb: "Minified JSON served without compression.",
  },
  {
    id: "ecommerce",
    label: "E-commerce product list (100 items)",
    servedAs: "gzip",
    vary: null,
    pretty: false,
    blurb: "Gzip-compressed, but without a Vary header.",
  },
  {
    id: "analytics",
    label: "Analytics dashboard data",
    servedAs: "identity",
    vary: null,
    pretty: true,
    blurb: "Pretty-printed JSON served without compression.",
  },
];

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FIRST = ["Amara", "Bilal", "Chen", "Dana", "Elif", "Farah", "Gabriel", "Hana", "Ibrahim", "Jonas", "Kofi", "Lena", "Mateo", "Nadia", "Omar", "Priya", "Quinn", "Rosa", "Sami", "Tariq", "Uma", "Viktor", "Wen", "Yusuf", "Zara"];
const LAST = ["Okafor", "Khan", "Li", "Silva", "Novak", "Haddad", "Rossi", "Tanaka", "Nguyen", "Müller", "Mensah", "García", "Ahmed", "Kowalski", "Patel"];
const WORDS = "the a api latency deploy shipped release team cache edge region query index review pull request test coverage incident postmortem roadmap sprint design system token bundle size performance metrics dashboard pipeline queue worker cron migration schema database replica rollout canary feature flag users growth weekend coffee conference talk slides demo launch".split(" ");
const TAGS = ["engineering", "devops", "aws", "frontend", "backend", "career", "productivity", "opensource", "cloud", "ai"];
const ADJ = ["Classic", "Premium", "Eco", "Ultra", "Compact", "Pro", "Everyday", "Vintage", "Smart", "Organic"];
const NOUN = ["Backpack", "Water Bottle", "Desk Lamp", "Headphones", "Running Shoes", "Coffee Grinder", "Notebook", "Yoga Mat", "Phone Case", "Wool Scarf", "Keyboard", "Sunglasses"];
const CATS = ["bags", "kitchen", "electronics", "sports", "stationery", "fashion", "home"];
const COUNTRIES = ["US", "GB", "DE", "IN", "PK", "BR", "CA", "AU", "FR", "NG", "AE", "JP"];
const PAGES = ["/", "/pricing", "/docs", "/blog", "/signup", "/login", "/dashboard", "/settings", "/blog/compression", "/docs/api"];

function pick<T>(r: () => number, arr: T[]): T {
  return arr[Math.floor(r() * arr.length)];
}
function sentence(r: () => number, min: number, max: number): string {
  const n = min + Math.floor(r() * (max - min));
  const w: string[] = [];
  for (let i = 0; i < n; i++) w.push(pick(r, WORDS));
  const s = w.join(" ");
  return s.charAt(0).toUpperCase() + s.slice(1) + ".";
}
function id(r: () => number, len = 12): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let s = "";
  for (let i = 0; i < len; i++) s += chars[Math.floor(r() * chars.length)];
  return s;
}
function isoDate(r: () => number, base = Date.UTC(2026, 9, 1)): string {
  return new Date(base + Math.floor(r() * 40 * 86400_000)).toISOString();
}

type Rng = () => number;

function makePost(r: Rng, i: number) {
  const first = pick(r, FIRST);
  const last = pick(r, LAST);
  const handle = `${first}${last}`.toLowerCase().replace(/[^a-z]/g, "") + Math.floor(r() * 100);
  return {
    id: `post_${id(r)}`,
    author: {
      id: `usr_${id(r, 10)}`,
      handle,
      displayName: `${first} ${last}`,
      avatarUrl: `https://cdn.example.com/avatars/${handle}.jpg`,
      verified: r() > 0.8,
      followers: Math.floor(r() * 50000),
    },
    createdAt: isoDate(r),
    text: sentence(r, 15, 45),
    media: r() > 0.6 ? [{ type: "image", url: `https://cdn.example.com/media/${id(r)}.jpg`, width: 1200, height: 800, alt: sentence(r, 4, 9) }] : [],
    hashtags: Array.from({ length: Math.floor(r() * 4) }, () => pick(r, TAGS)),
    stats: { likes: Math.floor(r() * 5000), reposts: Math.floor(r() * 800), replies: Math.floor(r() * 300), views: Math.floor(r() * 90000) },
    viewer: { liked: r() > 0.7, reposted: r() > 0.9, bookmarked: r() > 0.85 },
    position: i,
  };
}

function socialFeed() {
  const r = mulberry32(42);
  const posts = Array.from({ length: 50 }, (_, i) => makePost(r, i));
  return { data: posts, meta: { count: posts.length, nextCursor: id(r, 24), generatedAt: "2026-11-16T09:00:00.000Z" } };
}

export const SOCIAL_PAGE_COUNT = 5;
export const SOCIAL_PAGE_SIZE = 10;
export const SOCIAL_DEMO_URL = "https://api.example.com/v1/feed?limit=10";
export const SOCIAL_DEMO_PARAM = "cursor";

/** Cursor for page `n` (1-based). Page 1 has no cursor. */
export function socialCursor(n: number): string {
  return `c${n}_${id(mulberry32(1000 + n), 16)}`;
}

/**
 * The social feed as 5 cursor-paginated pages of 10 posts. Each page has its
 * own seed, so text length and media vary and page sizes differ slightly.
 */
export function socialFeedPages(): string[] {
  return Array.from({ length: SOCIAL_PAGE_COUNT }, (_, k) => {
    const r = mulberry32(500 + k);
    const posts = Array.from({ length: SOCIAL_PAGE_SIZE }, (_, i) => makePost(r, k * SOCIAL_PAGE_SIZE + i));
    const last = k === SOCIAL_PAGE_COUNT - 1;
    return JSON.stringify({
      data: posts,
      meta: { count: posts.length, hasMore: !last, nextCursor: last ? null : socialCursor(k + 2), generatedAt: "2026-11-16T09:00:00.000Z" },
    });
  });
}

function productList() {
  const r = mulberry32(7);
  const items = Array.from({ length: 100 }, () => {
    const name = `${pick(r, ADJ)} ${pick(r, NOUN)}`;
    const price = Math.round((5 + r() * 295) * 100) / 100;
    const sku = `SKU-${id(r, 8).toUpperCase()}`;
    return {
      id: id(r, 16),
      sku,
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-") + "-" + id(r, 4),
      description: sentence(r, 20, 40),
      category: pick(r, CATS),
      price: { amount: price, currency: "USD", compareAt: r() > 0.7 ? Math.round(price * 1.25 * 100) / 100 : null },
      inventory: { inStock: r() > 0.15, quantity: Math.floor(r() * 400), warehouse: pick(r, ["us-east-1", "eu-west-1", "ap-south-1"]) },
      rating: { average: Math.round((3 + r() * 2) * 10) / 10, count: Math.floor(r() * 2400) },
      images: Array.from({ length: 1 + Math.floor(r() * 3) }, (_, k) => ({
        url: `https://cdn.example.com/products/${sku.toLowerCase()}/${k}.webp`,
        width: 800,
        height: 800,
      })),
      variants: Array.from({ length: 1 + Math.floor(r() * 3) }, () => ({ id: id(r, 10), color: pick(r, ["black", "white", "navy", "sand", "olive"]), size: pick(r, ["S", "M", "L", "XL", "One size"]) })),
      tags: Array.from({ length: 1 + Math.floor(r() * 3) }, () => pick(r, ["new", "bestseller", "sale", "eco", "gift"])),
      updatedAt: isoDate(r),
    };
  });
  return { items, page: 1, pageSize: 100, total: 2381 };
}

function analyticsData() {
  const r = mulberry32(2026);
  const start = Date.UTC(2026, 9, 17);
  const timeseries = Array.from({ length: 30 }, (_, d) => ({
    date: new Date(start + d * 86400_000).toISOString().slice(0, 10),
    visitors: 4000 + Math.floor(r() * 3000),
    pageviews: 12000 + Math.floor(r() * 9000),
    bounceRate: Math.round((0.3 + r() * 0.3) * 1000) / 1000,
    avgSessionSeconds: 60 + Math.floor(r() * 240),
    conversions: Math.floor(r() * 300),
    revenue: Math.round(r() * 18000 * 100) / 100,
  }));
  const hourly = Array.from({ length: 7 * 24 }, (_, h) => ({ hour: h, requests: Math.floor(r() * 9000), p50Ms: 40 + Math.floor(r() * 40), p95Ms: 120 + Math.floor(r() * 200), errors: Math.floor(r() * 30) }));
  return {
    range: { from: "2026-10-17", to: "2026-11-15", timezone: "UTC" },
    summary: { visitors: 158204, pageviews: 491337, conversions: 4120, revenue: 251933.42, bounceRate: 0.412 },
    timeseries,
    hourly,
    topPages: PAGES.map((p) => ({ path: p, views: Math.floor(r() * 60000), uniqueVisitors: Math.floor(r() * 30000), avgTimeSeconds: Math.floor(r() * 300), exitRate: Math.round(r() * 1000) / 1000 })),
    countries: COUNTRIES.map((c) => ({ country: c, visitors: Math.floor(r() * 20000), share: Math.round(r() * 1000) / 1000 })),
    devices: [
      { type: "desktop", share: 0.54 },
      { type: "mobile", share: 0.41 },
      { type: "tablet", share: 0.05 },
    ],
  };
}

export function demoPayload(demoId: DemoId): string {
  const scenario = DEMOS.find((d) => d.id === demoId) ?? DEMOS[0];
  const data = scenario.id === "social" ? socialFeed() : scenario.id === "ecommerce" ? productList() : analyticsData();
  return scenario.pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
}
