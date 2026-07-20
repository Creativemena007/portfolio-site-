"use client";

import { useEffect, useRef, useState } from "react";

/*
  Scroll-reveal wrapper. Renders a <div> that fades + lifts into place the
  first time it enters the viewport. Pair with the `.reveal` / `.reveal-stagger`
  styles in globals.css — those hold the hidden state and easing.

  - stagger: cascade the reveal across direct children (used for card grids).
  - Reduced-motion users never see hidden content: the `.reveal` hidden state
    lives inside a prefers-reduced-motion:no-preference block, so it simply
    doesn't apply for them (no JS branch needed here).
  - No-JS is handled by a <noscript> override in layout.tsx.
*/
export function Reveal({
  children,
  className = "",
  stagger = false,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-visible={visible}
      className={`${stagger ? "reveal-stagger" : "reveal"} ${className}`}
    >
      {children}
    </div>
  );
}
