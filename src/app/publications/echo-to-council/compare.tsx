"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const DIR = "/images/publications/echo-to-council";

/*
  Before/after comparison: one phone frame, drag across it to wipe between the
  2024 screen (left of the handle) and the 2026 screen (right of it).

  Built on plain Pointer Events rather than a library, because nothing here
  needs physics: the divider stays exactly where the finger leaves it.

  - Tracking is 1:1. Position is written straight to the two elements that
    move (the clipped "before" layer and the handle) — no React state per
    pointer move, so dragging never re-renders.
  - `touch-action: pan-y` (in the CSS) lets the page still scroll vertically
    when the gesture starts on the frame.
  - Keyboard: the handle is a real slider (arrows, Home, End).
  - The first time a pair scrolls into view the divider sways once to show it
    can be dragged. It stops the moment the visitor touches it, and never
    plays under reduced motion.
*/
export function Compare({
  before,
  after,
  beforeLabel,
  afterLabel,
  beforeAlt,
  afterAlt,
}: {
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
  beforeAlt: string;
  afterAlt: string;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const beforeLayer = useRef<HTMLDivElement>(null);
  const handle = useRef<HTMLDivElement>(null);
  const pos = useRef(50); // % from the left edge
  const touched = useRef(false);
  const hint = useRef(0); // requestAnimationFrame id of the intro sway

  function setPos(next: number) {
    const p = Math.min(100, Math.max(0, next));
    pos.current = p;
    if (beforeLayer.current) {
      beforeLayer.current.style.clipPath = `inset(0 ${100 - p}% 0 0)`;
    }
    if (handle.current) {
      handle.current.style.left = `${p}%`;
      handle.current.setAttribute("aria-valuenow", String(Math.round(p)));
    }
  }

  function fromPointer(clientX: number) {
    const rect = frame.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(((clientX - rect.left) / rect.width) * 100);
  }

  function stopHint() {
    touched.current = true;
    cancelAnimationFrame(hint.current);
  }

  // One-time sway when the pair first comes into view.
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || touched.current) return;
        io.disconnect();
        const start = performance.now() + 500;
        const duration = 1400;
        const tick = (now: number) => {
          if (touched.current) return;
          const t = Math.min(1, Math.max(0, (now - start) / duration));
          // One full sine cycle: right, back through centre, left, centre.
          setPos(50 + 14 * Math.sin(t * Math.PI * 2));
          if (t < 1) hint.current = requestAnimationFrame(tick);
        };
        hint.current = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(hint.current);
    };
  }, []);

  return (
    <figure className="compare">
      <div
        ref={frame}
        className="compare-frame"
        onPointerDown={(e) => {
          if (e.pointerType === "mouse" && e.button !== 0) return;
          stopHint();
          e.currentTarget.setPointerCapture(e.pointerId);
          e.currentTarget.dataset.dragging = "true";
          fromPointer(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.currentTarget.dataset.dragging === "true") {
            fromPointer(e.clientX);
          }
        }}
        onPointerUp={(e) => {
          e.currentTarget.dataset.dragging = "false";
        }}
        onPointerCancel={(e) => {
          e.currentTarget.dataset.dragging = "false";
        }}
      >
        <Image
          src={`${DIR}/${after}`}
          alt={afterAlt}
          fill
          sizes="320px"
          draggable={false}
        />
        <div
          ref={beforeLayer}
          className="compare-before"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        >
          <Image
            src={`${DIR}/${before}`}
            alt={beforeAlt}
            fill
            sizes="320px"
            draggable={false}
          />
        </div>
        <span className="compare-label is-before">{beforeLabel}</span>
        <span className="compare-label is-after">{afterLabel}</span>
        <div
          ref={handle}
          className="compare-handle"
          style={{ left: "50%" }}
          role="slider"
          tabIndex={0}
          aria-label={`Compare ${beforeLabel} with ${afterLabel}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={50}
          aria-orientation="horizontal"
          onKeyDown={(e) => {
            const step = e.shiftKey ? 20 : 5;
            if (e.key === "ArrowLeft") setPos(pos.current - step);
            else if (e.key === "ArrowRight") setPos(pos.current + step);
            else if (e.key === "Home") setPos(0);
            else if (e.key === "End") setPos(100);
            else return;
            e.preventDefault();
            stopHint();
          }}
        >
          <span className="compare-grip" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M6.5 5 3 9l3.5 4M11.5 5 15 9l-3.5 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
      <figcaption>Drag to compare</figcaption>
    </figure>
  );
}
