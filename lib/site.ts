export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const siteTitle = "API Egress Cost Calculator";
export const siteDescription =
  "Paste an endpoint, see your AWS data transfer bill, and what Gzip, Brotli and Zstd compression would save.";
