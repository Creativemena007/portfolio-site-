"use client";

import dynamic from "next/dynamic";

/*
  Agentation dev-only annotation toolbar.

  Loaded through a dynamic import so its code lives in its own chunk that is
  only fetched when this component renders. A static `import { Agentation }` in
  layout.tsx put the whole library (~427KB) into a chunk every production page
  downloaded, even though it never rendered. layout.tsx only renders this in
  development, so production never requests the chunk.
*/
const Agentation = dynamic(
  () => import("agentation").then((m) => m.Agentation),
  { ssr: false }
);

export function DevToolbar() {
  if (process.env.NODE_ENV !== "development") return null;
  return <Agentation />;
}
