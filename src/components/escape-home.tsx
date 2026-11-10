"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/*
  Pressing Escape anywhere on a project page returns to the home page.
  Renders nothing — it only wires up the key listener.
*/
export function EscapeHome() {
  const router = useRouter();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      // A keyboard action should be instant: suppress the route fade and the
      // header entrance on the page we land on (see globals.css).
      const root = document.documentElement;
      root.dataset.instant = "true";
      window.setTimeout(() => delete root.dataset.instant, 1200);
      router.push("/");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return null;
}
