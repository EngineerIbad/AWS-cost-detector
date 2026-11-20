"use client";

import { Analytics } from "@vercel/analytics/next";
import { stripUrl } from "../lib/analytics";

/** Vercel Web Analytics with query strings removed from every recorded URL. */
export default function SiteAnalytics() {
  return <Analytics beforeSend={(event) => ({ ...event, url: stripUrl(event.url) })} />;
}
