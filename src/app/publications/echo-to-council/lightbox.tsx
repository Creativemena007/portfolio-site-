"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

/*
  Full-size screenshot viewer for the publication.

  Any screenshot wrapped in a `button.zoom` (see <Shot>) opens here. The viewer
  collects the other screenshots from the same row, so you can move through a
  flow without closing it.

  Gestures (Motion, because a flick has to carry its speed into the landing):
  - Drag sideways  → previous / next. Decided by distance OR flick velocity.
  - Drag down      → dismiss. The backdrop fades with the drag itself (one
                     source of truth: the same `y` value drives both), so it
                     is always exactly as faded as the image is pulled away.
  - Not far enough → springs back, starting from the release velocity.
  Keyboard: ←/→ to move, Esc to close. Focus moves into the viewer and
  returns to the screenshot that opened it.

  Esc is caught in the capture phase and stopped, because the page also has
  an Esc-to-home handler that must not fire while the viewer is open.
*/

type Item = { src: string; alt: string; title: string; text: string };

const SWIPE_DISTANCE = 70; // px sideways to change image
const SWIPE_VELOCITY = 450; // px/s sideways flick
const DISMISS_DISTANCE = 120; // px down to close
const DISMISS_VELOCITY = 600; // px/s downward flick

export function Lightbox({ scope }: { scope: string }) {
  const [items, setItems] = useState<Item[]>([]);
  const [index, setIndex] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Pulling the image down fades the backdrop with it.
  const backdrop = useTransform(y, [0, 320], [1, 0.25]);

  const open = index !== null;
  const count = items.length;

  const close = useCallback(() => {
    setIndex(null);
    opener.current?.focus({ preventScroll: true });
  }, []);

  const go = useCallback(
    (step: number) => {
      setIndex((i) => {
        if (i === null) return i;
        const next = i + step;
        return next < 0 || next >= count ? i : next;
      });
      x.set(0);
      y.set(0);
    },
    [count, x, y]
  );

  // Open from any zoomable screenshot inside the publication.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const button = target?.closest<HTMLElement>(`${scope} button.zoom`);
      if (!button) return;
      const row = button.closest(".strip") ?? button.closest("figure");
      const buttons = Array.from(
        row?.querySelectorAll<HTMLElement>("button.zoom") ?? [button]
      );
      const list = buttons.map((b) => {
        const img = b.querySelector("img");
        const caption = b.closest("figure")?.querySelector("figcaption");
        const title = caption?.querySelector("b")?.textContent ?? "";
        const full = caption?.textContent ?? "";
        return {
          src: b.dataset.full ?? img?.currentSrc ?? "",
          alt: img?.alt ?? "",
          title,
          text: full.slice(title.length).trim(),
        };
      });
      opener.current = button;
      x.set(0);
      y.set(0);
      setItems(list);
      setIndex(Math.max(0, buttons.indexOf(button)));
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [scope, x, y]);

  // Keyboard, scroll lock and focus while open.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopPropagation();
        close();
      } else if (e.key === "ArrowRight") {
        go(1);
      } else if (e.key === "ArrowLeft") {
        go(-1);
      } else if (e.key === "Tab") {
        // Keep focus inside the viewer.
        const focusable = dialog.current?.querySelectorAll<HTMLElement>(
          "button:not([disabled])"
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey, true);
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    dialog.current?.focus({ preventScroll: true });
    return () => {
      document.removeEventListener("keydown", onKey, true);
      root.style.overflow = previousOverflow;
    };
  }, [open, close, go]);

  const item = index !== null ? items[index] : null;
  const spring = { type: "spring" as const, bounce: 0, duration: 0.4 };

  return (
    <AnimatePresence>
      {item && index !== null && (
        <motion.div
          ref={dialog}
          className="pub-lb"
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot viewer"
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
          onClick={close}
        >
          <motion.div className="pub-lb-backdrop" style={{ opacity: backdrop }} />

          <motion.figure
            className="pub-lb-figure"
            style={{ x, y }}
            drag
            dragDirectionLock
            dragElastic={0.7}
            dragMomentum={false}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onClick={(e) => e.stopPropagation()}
            onDragEnd={(_, info) => {
              const { offset, velocity } = info;
              const sideways = Math.abs(offset.x) > Math.abs(offset.y);

              if (
                !sideways &&
                (offset.y > DISMISS_DISTANCE || velocity.y > DISMISS_VELOCITY)
              ) {
                close();
                return;
              }
              if (sideways) {
                const next =
                  offset.x < -SWIPE_DISTANCE || velocity.x < -SWIPE_VELOCITY;
                const prev =
                  offset.x > SWIPE_DISTANCE || velocity.x > SWIPE_VELOCITY;
                if (next && index < count - 1) return go(1);
                if (prev && index > 0) return go(-1);
              }
              // Not far or fast enough: spring home from the release speed.
              animate(x, 0, { ...spring, velocity: velocity.x });
              animate(y, 0, { ...spring, velocity: velocity.y });
            }}
          >
            {/* Keyed inner wrapper: each image fades/settles in on its own,
                without fighting the drag transform on the figure. */}
            <motion.div
              key={index}
              className="pub-lb-shot"
              initial={
                reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }
              }
              animate={{ opacity: 1, scale: 1 }}
              transition={reduceMotion ? { duration: 0.15 } : spring}
            >
              {/* Plain <img>: the original file, already small (393px wide). */}
              <img src={item.src} alt={item.alt} draggable={false} />
            </motion.div>
            <figcaption>
              {item.title && <b>{item.title}</b>}
              {item.text && <span>{item.text}</span>}
            </figcaption>
          </motion.figure>

          <div className="pub-lb-bar" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={index === 0}
              aria-label="Previous screenshot"
            >
              <Arrow dir="left" />
            </button>
            <span aria-live="polite">
              {index + 1} / {count}
            </span>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={index === count - 1}
              aria-label="Next screenshot"
            >
              <Arrow dir="right" />
            </button>
          </div>

          <button
            type="button"
            className="pub-lb-close"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Close viewer"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path
                d="m4 4 10 10M14 4 4 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
      style={dir === "left" ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="m7 4 5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
