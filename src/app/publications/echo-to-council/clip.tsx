"use client";

import { useEffect, useRef, useState } from "react";

const DIR = "/videos/publications/echo-to-council";

/*
  Screen recording that behaves like a looping GIF, without the cost.

  - Nothing downloads until the clip is near the viewport (preload="none");
    the poster image holds its place.
  - It plays only while on screen and pauses when scrolled away, so six clips
    on one page never decode at the same time.
  - Tap or click to pause and resume. A clip the visitor paused stays paused
    when it scrolls back into view — their choice outranks autoplay.
  - Reduced-motion visitors get a still poster with normal video controls
    instead of autoplay.
*/
export function Clip({ name, label }: { name: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const onScreen = useRef(false);
  const [paused, setPaused] = useState(false);
  const [native, setNative] = useState(false); // reduced motion → browser controls

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reads a browser preference after mount (SSR can't know it)
      setNative(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen.current = entry.isIntersecting;
        if (entry.isIntersecting && video.dataset.userPaused !== "true") {
          // play() rejects if the browser blocks it; the poster stays up.
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.1 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  function toggle() {
    const video = ref.current;
    if (!video) return;
    const next = !paused;
    video.dataset.userPaused = String(next);
    if (next) video.pause();
    else if (onScreen.current) video.play().catch(() => {});
    setPaused(next);
  }

  const video = (
    <video
      ref={ref}
      src={`${DIR}/${name}.mp4`}
      poster={`${DIR}/${name}-poster.jpg`}
      muted
      loop
      playsInline
      preload="none"
      controls={native}
      aria-label={label}
    />
  );

  if (native) return video;

  return (
    <button
      type="button"
      className="clip"
      data-paused={paused}
      onClick={toggle}
      aria-pressed={paused}
      aria-label={`${label} — ${paused ? "play" : "pause"}`}
    >
      {video}
      <span className="clip-badge" aria-hidden>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          {paused ? (
            <path d="M5 3.2v9.6a.6.6 0 0 0 .92.5l7.3-4.8a.6.6 0 0 0 0-1L5.92 2.7A.6.6 0 0 0 5 3.2Z" />
          ) : (
            <path d="M4.5 3h2v10h-2zM9.5 3h2v10h-2z" />
          )}
        </svg>
      </span>
    </button>
  );
}
