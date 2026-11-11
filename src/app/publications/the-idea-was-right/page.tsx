import type { Metadata } from "next";
import Link from "next/link";

import { EscapeHome } from "@/components/escape-home";
import { CurrentSection, RevealAll } from "@/components/reading";
import { SiteFooter } from "@/components/site-footer";
import { PUBLICATIONS } from "@/data/publications";

import { Content } from "./content";
import { Lightbox } from "./lightbox";
import { QuestItem } from "@/components/quest";
import { HeroParallax } from "./page-effects";
import "./publication.css";

const pub = PUBLICATIONS.find((p) => p.slug === "the-idea-was-right")!;

export const metadata: Metadata = {
  // The root title template renders this as "<title> — Mena".
  title: pub.title,
  description: pub.description,
  alternates: { canonical: pub.href },
  openGraph: {
    type: "article",
    title: `${pub.title} — Mena`,
    description: pub.description,
    url: pub.href,
  },
};

function ArrowBack() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 256 256"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <polyline
        points="136 96 88 48 40 96"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="232 192 88 192 88 48"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PublicationPage() {
  return (
    <main className="relative min-h-screen">
      <EscapeHome />
      <RevealAll scope=".pub" />
      <HeroParallax scope=".pub" />
      <Lightbox scope=".pub" />

      {/* Same pinned bar as the case-study pages. Esc also returns home. */}
      <div className="sticky top-0 z-20 border-b border-white/5 bg-bg/70 backdrop-blur-md">
        <nav className="mx-auto flex w-full max-w-[720px] items-center justify-between gap-6 px-5 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-label md:px-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-colors hover:text-cream"
          >
            <ArrowBack />
            Home
          </Link>
          <CurrentSection scope=".pub" idle="Publication" />
        </nav>
        <div className="read-progress" aria-hidden />
      </div>

      <div
        id="top"
        className="pub relative z-10 px-5 pt-[52px] md:px-6 md:pt-16"
      >
        <Content />
        {/* The end mark doubles as a Side Quest find. */}
        <div className="pub-endmark">
          <QuestItem id="echo" />
        </div>
        <div className="col">
          <p className="pub-note">
            Zo · Council and Debate · 2026. Sample names and messages are
            illustrative.
          </p>
        </div>
      </div>

      {/* The shared footer sits outside `.pub` on purpose: the publication's
          own link and paragraph styles (underlines, paragraph spacing, larger
          type) would otherwise restyle it. Same 680px measure as the text. */}
      <div className="relative z-10 px-5 pb-[52px] md:px-6 md:pb-[58px]">
        <div className="mx-auto max-w-[680px]">
          <SiteFooter className="mt-10!" />
        </div>
      </div>
    </main>
  );
}
