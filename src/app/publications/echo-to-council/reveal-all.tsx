"use client";

import { useEffect } from "react";

/*
  Scroll-reveal for the publication body.

  The body is one long block of markup (content.tsx), so instead of wrapping
  dozens of blocks in <Reveal>, each block just carries the `.reveal` class and
  this component flips `data-visible` on them as they enter the viewport. The
  hidden state, easing, reduced-motion and no-JS handling all come from the
  existing `.reveal` rules in globals.css / layout.tsx. Renders nothing.
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
