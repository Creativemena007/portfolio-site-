"use client";

import { useEffect } from "react";

/*
  Page-level behaviour specific to this publication. (The scroll reveal and
  the current-section label are shared: see src/components/reading.tsx.)
*/

/*
  Depth on the opening spread: the three phones drift a few pixels with the
  cursor, the front one further than the two behind it. Decorative, so it only
  runs with a real mouse and never under reduced motion. Positions ease toward
  the cursor each frame (a simple spring-like follow) instead of snapping.
*/
export function HeroParallax({ scope }: { scope: string }) {
  useEffect(() => {
    const stage = document.querySelector<HTMLElement>(`${scope} .hero-stage`);
    if (!stage) return;
    if (
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const phones = Array.from(
      stage.querySelectorAll<HTMLElement>(".hero-phone")
    ).map((el) => ({
      el,
      // Front phone moves with the cursor; the back pair moves against it.
      depth: el.classList.contains("main") ? 10 : -14,
    }));

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;

    const tick = () => {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      for (const { el, depth } of phones) {
        el.style.transform = `translate3d(${(x * depth).toFixed(2)}px, ${(
          y *
          depth *
          0.6
        ).toFixed(2)}px, 0)`;
      }
      const settled =
        Math.abs(targetX - x) < 0.001 && Math.abs(targetY - y) < 0.001;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      // -1 … 1 across the stage, clamped so far-away cursors don't overshoot.
      targetX = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
      targetY = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1));
      if (!frame) frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [scope]);

  return null;
}
