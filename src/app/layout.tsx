import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { Agentation } from "agentation";
import "./globals.css";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  TWITTER_HANDLE,
} from "@/config/site";

// Neue Haas Grotesk Display Pro — the source design font, self-hosted from src/app/fonts.
const neueHaas = localFont({
  variable: "--font-neue-haas",
  display: "swap",
  src: [
    { path: "./fonts/NeueHaasDisplayLight.ttf", weight: "300", style: "normal" },
    { path: "./fonts/NeueHaasDisplayLightItalic.ttf", weight: "300", style: "italic" },
    { path: "./fonts/NeueHaasDisplayRoman.ttf", weight: "400", style: "normal" },
    { path: "./fonts/NeueHaasDisplayRomanItalic.ttf", weight: "400", style: "italic" },
    { path: "./fonts/NeueHaasDisplayMediu.ttf", weight: "500", style: "normal" },
    { path: "./fonts/NeueHaasDisplayMediumItalic.ttf", weight: "500", style: "italic" },
    { path: "./fonts/NeueHaasDisplayBold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/NeueHaasDisplayBoldItalic.ttf", weight: "700", style: "italic" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Home uses the default; every other page renders "<page title> — Mena".
  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: `${SITE_NAME} — Portfolio`,
  authors: [{ name: "Orezi Mena", url: SITE_URL }],
  creator: "Orezi Mena",
  publisher: "Orezi Mena",
  keywords: [
    "Mena",
    "Orezi Mena",
    "thecreativemena",
    "product designer",
    "UX designer",
    "UI designer",
    "design engineer",
    "portfolio",
    "fintech design",
    "blockchain design",
    "web3 design",
    "climate tech design",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: TWITTER_HANDLE,
    site: TWITTER_HANDLE,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${neueHaas.variable} h-full`}>
      <head>
        {/* Without JS the IntersectionObserver never fires, so force
            scroll-reveal content to its settled state. */}
        <noscript>
          <style>{`.reveal,.reveal-stagger>*{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full antialiased">
        {children}
        <Analytics />
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
