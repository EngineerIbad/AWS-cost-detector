import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

const title = "API Egress Cost Calculator";
const description =
  "Paste an endpoint, see your AWS data transfer bill, and what Gzip, Brotli and Zstd compression would save.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${title} · How much does your API response really cost?`, template: `%s · ${title}` },
  description,
  applicationName: title,
  authors: [{ name: "Ibad Amir", url: "https://ibadamir.vercel.app" }],
  creator: "Ibad Amir",
  keywords: ["AWS", "egress", "data transfer", "API", "compression", "gzip", "brotli", "zstd", "cost calculator"],
  openGraph: {
    type: "website",
    url: "/",
    siteName: title,
    title: "How much does your API response really cost?",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "How much does your API response really cost?",
    description,
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
      <body>{children}</body>
    </html>
  );
}
