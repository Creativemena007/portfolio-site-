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
      if (e.key === "Escape") router.push("/");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  return null;
}
