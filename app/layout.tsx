import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import SiteAnalytics from "../components/SiteAnalytics";
import { siteDescription, siteTitle, siteUrl } from "../lib/site";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const title = siteTitle;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${title} · How much does your API response really cost?`, template: `%s · ${title}` },
  description: siteDescription,
  applicationName: title,
  authors: [{ name: "Ibad Amir", url: "https://ibadamir.vercel.app" }],
  creator: "Ibad Amir",
  keywords: ["AWS", "egress", "data transfer", "API", "compression", "gzip", "brotli", "zstd", "cost calculator"],
  openGraph: {
    type: "website",
    url: "/",
    siteName: title,
    title: "How much does your API response really cost?",
    description: siteDescription,
    locale: "en_US",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "API Egress Cost Calculator: how much does your API response really cost?" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How much does your API response really cost?",
    description: siteDescription,
    images: ["/api/og"],
  },
};

export const viewport: Viewport = {
  themeColor: "#800020",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        {children}
        <SiteAnalytics />
      </body>
    </html>
  );
}
