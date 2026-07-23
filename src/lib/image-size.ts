import { join } from "path";
import sharp from "sharp";

/*
  Build-time intrinsic dimensions for images that live in /public.

  next/image needs a width/height (or `fill`) to reserve layout space and build
  the responsive srcset. The case-study images are authored as plain "/images/…"
  paths in src/data/projects.ts (no dimensions), so we read them off disk during
  static generation with sharp — which ships with Next anyway. Results are cached
  per path so the four SSG pages don't re-read shared files.
*/

export type ImageDimensions = { width: number; height: number };

// 16:10 fallback so a missing/unreadable file degrades gracefully instead of
// failing the build.
const FALLBACK: ImageDimensions = { width: 1600, height: 1000 };

const cache = new Map<string, ImageDimensions>();

export async function getImageDimensions(
  publicPath: string
): Promise<ImageDimensions> {
  const cached = cache.get(publicPath);
  if (cached) return cached;

  let dims = FALLBACK;
  try {
    const file = join(process.cwd(), "public", publicPath.replace(/^\//, ""));
    const meta = await sharp(file).metadata();
    if (meta.width && meta.height) {
      dims = { width: meta.width, height: meta.height };
    }
  } catch {
    // Keep the fallback; getDimensionsMap logs nothing so the build stays clean.
  }

  cache.set(publicPath, dims);
  return dims;
}

/** Resolve a set of image paths into a { path -> dimensions } lookup. */
export async function getDimensionsMap(
  paths: string[]
): Promise<Record<string, ImageDimensions>> {
  const unique = [...new Set(paths)];
  const entries = await Promise.all(
    unique.map(async (p) => [p, await getImageDimensions(p)] as const)
  );
  return Object.fromEntries(entries);
}
