"use client";

import { useEffect, useState } from "react";

/*
  Two small page-level behaviours for the publication. Both attach to markup
  that is rendered on the server (content.tsx), so they find it in the DOM
  rather than wrapping it.
*/

/*
  The label on the right of the sticky bar: "Publication" at the top, then the
  section you are reading ("03 · What changed in AI since 2024"). It tracks
  whichever section crosses the middle of the viewport.
*/
export function CurrentSection({ scope }: { scope: string }) {
  const [label, setLabel] = useState("Publication");

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(`${scope} section[id]`)
    );
    const name = (s: HTMLElement) => {
      const eyebrow = s.querySelector(".eyebrow")?.textContent ?? "";
      const title = s.querySelector("h2")?.textContent;
      // Eyebrows read "03 · The world moved": keep the number, use the title.
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

    // Back above the first section → the generic label again.
    const onScroll = () => {
      const first = sections[0];
      if (first && first.getBoundingClientRect().top > window.innerHeight / 2) {
        setLabel("Publication");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [scope]);

  // Keyed span: the label re-mounts on change so its CSS entrance replays.
  return (
    <a href="#top" className="pub-current transition-colors hover:text-cream">
      <span key={label}>{label}</span>
    </a>
  );
}

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
