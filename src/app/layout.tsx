import type { Metadata } from "next";
import localFont from "next/font/local";
import { Agentation } from "agentation";
import "./globals.css";

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
  title: "Mena — Designer, author, and a curious human",
  description:
    "Designer, author, and a curious human. Interested in what we build and how it shapes us.",
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
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
