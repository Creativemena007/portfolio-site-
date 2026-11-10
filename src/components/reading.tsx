"use client";

import { useEffect, useState } from "react";

/*
  Shared behaviours for long-form pages (case studies and publications).
  Both attach to markup rendered on the server, so they find it in the DOM by
  a scope selector (".cs", ".pub") rather than wrapping it.
*/

/*
  Scroll-reveal for a long page. Instead of wrapping dozens of blocks in
  <Reveal>, each block carries the `.reveal` class and this flips
  `data-visible` on them as they enter the viewport. The hidden state, easing,
  reduced-motion and no-JS handling all come from the `.reveal` rules in
  globals.css / layout.tsx. Renders nothing.
*/
export function RevealAll({ scope }: { scope: string }) {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(`${scope} .reveal`);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = "true";
            io.unobserve(entry.target);
          }
        }
      },
      // Low threshold: some blocks (tables, long grids) are taller than the
      // viewport and would never reach a high visible ratio.
      { threshold: 0.05, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [scope]);

  return null;
}

/*
  The label in the sticky bar: `idle` at the top of the page, then the section
  being read ("03 · Research & Discovery"). It tracks whichever
  `section[id]` crosses the middle of the viewport, and builds the label from
  that section's `.eyebrow` (for the number) and `h2` (for the title).
*/
export function CurrentSection({
  scope,
  idle,
  className = "",
}: {
  scope: string;
  /** Shown before the first section is reached. */
  idle: string;
  className?: string;
}) {
  const [label, setLabel] = useState(idle);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(`${scope} section[id]`)
    );
    const name = (s: HTMLElement) => {
      const eyebrow = s.querySelector(".eyebrow")?.textContent ?? "";
      const title = s.querySelector("h2")?.textContent;
      // Eyebrows read "03 · The world moved" or just "03": keep the number.
      const number = eyebrow.split("·")[0].trim();
      return title ? `${number} · ${title}` : eyebrow;
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setLabel(name(entry.target as HTMLElement));
        }
      },
      // A thin band across the middle of the viewport.
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));

    // Back above the first section → the idle label again.
    const onScroll = () => {
      const first = sections[0];
      if (first && first.getBoundingClientRect().top > window.innerHeight / 2) {
        setLabel(idle);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [scope, idle]);

  // Keyed span: the label re-mounts on change so its CSS entrance replays.
  return (
    <a
      href="#top"
      className={`read-current transition-colors hover:text-cream ${className}`}
    >
      <span key={label}>{label}</span>
    </a>
  );
}
