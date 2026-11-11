import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { Journal } from "./journal";

/*
  The Side Quest journal: what you've found, hints for what's left, and the
  unlock once everything is found. Progress is per browser (localStorage), so
  the page itself is static and fills in on the client.
*/

export const metadata: Metadata = {
  title: "Journal",
  description: "The Side Quest: things hidden around the site.",
  robots: { index: false, follow: true },
};

export default function JournalPage() {
  return (
    <main className="relative min-h-screen">
      <div className="mx-auto w-full max-w-[680px] px-5 py-16 md:px-6 md:py-28">
        <Link
          href="/"
          className="enter enter-d1 text-[12px] font-medium uppercase tracking-[0.18em] text-label transition-colors hover:text-cream"
        >
          ← Home
        </Link>
        <Journal />
        <SiteFooter />
      </div>
    </main>
  );
}
