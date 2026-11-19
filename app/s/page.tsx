import type { Metadata } from "next";
import SharedView from "../../components/SharedView";
import SiteFooter from "../../components/SiteFooter";
import { decodeShare, encodeShare, shareHeadline } from "../../lib/share";
import { siteTitle } from "../../lib/site";

// Rendered per request so link previews (Open Graph) carry this result's numbers.
export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const state = decodeShare(await searchParams);
  if (!state) return { title: "Shared result", robots: { index: false } };
  const h = shareHeadline(state);
  // Re-encode from the validated state so only allow-listed params are echoed.
  const qs = encodeShare(state).toString();
  const image = `/api/og?${qs}`;
  return {
    title: { absolute: h.title },
    description: h.description,
    robots: { index: false, follow: true },
    openGraph: {
      type: "website",
      url: `/s?${qs}`,
      siteName: siteTitle,
      title: h.title,
      description: h.description,
      locale: "en_US",
      images: [{ url: image, width: 1200, height: 630, alt: h.title }],
    },
    twitter: { card: "summary_large_image", title: h.title, description: h.description, images: [image] },
  };
}

export default async function SharedPage({ searchParams }: Props) {
  const state = decodeShare(await searchParams);
  if (!state) {
    return (
      <div className="page">
        <header className="hero">
          <p className="eyebrow">API Egress Cost Calculator</p>
          <h1>This share link is incomplete</h1>
          <p className="subtitle">Some of the numbers are missing or out of range, so we can&apos;t rebuild the result.</p>
        </header>
        <main className="layout">
          <div className="card">
            <a href="/" className="btn-primary btn-compact">
              Test your own endpoint
            </a>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }
  return <SharedView state={state} />;
}
