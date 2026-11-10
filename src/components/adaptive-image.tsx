"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

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
  cards are lazy, so their single fetch happens after the tier settles.

  No double download: an image that was already on screen starts fetching at
  full quality from the server HTML, before this effect runs. If it has
  finished by then, we keep it — swapping to "lite" would download the same
  picture a second time, on exactly the connections we're trying to spare.
*/

type Tier = "full" | "lite";

// next/image default is 75. "lite" trades visible-but-acceptable softness for a
// large byte saving on small screens / slow links. Both values must be on the
// `images.qualities` allowlist in next.config.ts.
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

export function AdaptiveImage({
  alt,
  ...props
}: Omit<ImageProps, "quality" | "ref">) {
  const ref = useRef<HTMLImageElement>(null);
  const [tier, setTier] = useState<Tier>("full");

  useEffect(() => {
    const update = () => {
      const img = ref.current;
      // Already downloaded — changing quality now would only fetch it again.
      if (img?.complete && img.naturalWidth > 0) return;
      setTier(detectTier());
    };
    update();
    const c = getConnection();
    c?.addEventListener?.("change", update);
    return () => c?.removeEventListener?.("change", update);
  }, []);

  return <Image {...props} ref={ref} alt={alt} quality={QUALITY[tier]} />;
}
