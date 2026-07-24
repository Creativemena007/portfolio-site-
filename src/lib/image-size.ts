import { join } from "path";
import sharp from "sharp";

/*
  Build-time image metadata for images that live in /public.

  Two things are read off disk during static generation with sharp (which ships
  with Next anyway), cached per path so the SSG pages don't re-read shared files:

  - intrinsic width/height — next/image needs these (or `fill`) to reserve
    layout space and build the responsive srcset.
  - a tiny blurred base64 preview (blurDataURL) — rendered instantly as a
    placeholder so images never show a blank box while the full file downloads.
    This is the perceived-speed fix for "media takes time to load".
*/

export type ImageMeta = {
  width: number;
  height: number;
  blurDataURL: string;
};

// Kept for callers that only care about dimensions.
export type ImageDimensions = { width: number; height: number };

// 16:10 fallback + a transparent 1px blur so a missing/unreadable file degrades
// gracefully instead of failing the build.
const FALLBACK: ImageMeta = {
  width: 1600,
  height: 1000,
  blurDataURL:
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
};

const cache = new Map<string, ImageMeta>();

export async function getImageMeta(publicPath: string): Promise<ImageMeta> {
  const cached = cache.get(publicPath);
  if (cached) return cached;

  let meta = FALLBACK;
  try {
    const file = join(process.cwd(), "public", publicPath.replace(/^\//, ""));
    const pipeline = sharp(file);
    const { width, height } = await pipeline.metadata();
    // Small (max 16px) low-quality webp — a handful of bytes, blurred up by
    // next/image behind the real image.
    const blur = await sharp(file)
      .resize(16, 16, { fit: "inside" })
      .webp({ quality: 25 })
      .toBuffer();
    if (width && height) {
      meta = {
        width,
        height,
        blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
      };
    }
  } catch {
    // Keep the fallback.
  }

  cache.set(publicPath, meta);
  return meta;
}

/** Resolve a set of image paths into a { path -> meta } lookup. */
export async function getImageMetaMap(
  paths: string[]
): Promise<Record<string, ImageMeta>> {
  const unique = [...new Set(paths)];
  const entries = await Promise.all(
    unique.map(async (p) => [p, await getImageMeta(p)] as const)
  );
  return Object.fromEntries(entries);
}
