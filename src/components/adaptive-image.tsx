"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

/*
  Bandwidth-gated image rendition.

  Wraps next/image and lowers the requested `quality` when the visitor is on a
  constrained connection, so heavy landing-page media ships far fewer bytes to
  people who'd otherwise wait on it. next/image already right-sizes per viewport
  via srcset; this adds a second lever — perceptual quality — keyed to the
  network rather than the screen.

  Signal: the Network Information API (navigator.connection) — Save-Data and
  effectiveType. It's Chromium-only, so Safari/Firefox (and no-JS/SSR) fall back
  to full quality. That's the safe default: we only ever downgrade when we have
  positive evidence the connection is slow, never speculatively.

  Hydration: SSR and the first client render both use "full" so the markup
  matches; the tier is re-evaluated in an effect after mount. Below-the-fold
  cards are lazy, so their single fetch happens after the tier settles — no
  double download.
*/

type Tier = "full" | "lite";

// next/image default is 75. "lite" trades visible-but-acceptable softness for a
// large byte saving on small screens / slow links.
const QUALITY: Record<Tier, number> = { full: 75, lite: 40 };

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
  addEventListener?: (type: "change", listener: () => void) => void;
  removeEventListener?: (type: "change", listener: () => void) => void;
};

function getConnection(): NetworkInformation | undefined {
  if (typeof navigator === "undefined") return undefined;
  return (navigator as Navigator & { connection?: NetworkInformation })
    .connection;
}

function detectTier(): Tier {
  const c = getConnection();
  if (!c) return "full";
  if (c.saveData) return "lite";
  if (c.effectiveType && ["slow-2g", "2g", "3g"].includes(c.effectiveType)) {
    return "lite";
  }
  return "full";
}

export function AdaptiveImage(props: Omit<ImageProps, "quality">) {
  const [tier, setTier] = useState<Tier>("full");

  useEffect(() => {
    const update = () => setTier(detectTier());
    update();
    const c = getConnection();
    c?.addEventListener?.("change", update);
    return () => c?.removeEventListener?.("change", update);
  }, []);

  return <Image {...props} quality={QUALITY[tier]} />;
}
