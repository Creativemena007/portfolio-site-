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
  /** The image's most vivid colour as "r g b", or undefined if it has none
      (greyscale / near-black). Used for the hover glow on home-page cards. */
  tint?: string;
};

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
    const { width, height } = await sharp(file).metadata();
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
        tint: await vividColour(file),
      };
    }
  } catch {
    // Keep the fallback.
  }

  cache.set(publicPath, meta);
  return meta;
}

/*
  The most vivid colour in an image, as "r g b".

  sharp's built-in "dominant colour" returns near-black for these dark product
  shots, which makes a useless glow. Instead: shrink the image, then average
  the pixels weighted by how saturated AND bright they are, so the brand
  colour on screen wins over the dark background. The result is lifted to a
  consistent brightness so every card glows at a similar strength.
*/
async function vividColour(file: string): Promise<string | undefined> {
  const { data, info } = await sharp(file)
    .resize(40, 40, { fit: "cover" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let r = 0;
  let g = 0;
  let b = 0;
  let total = 0;
  for (let i = 0; i < data.length; i += info.channels) {
    const max = Math.max(data[i], data[i + 1], data[i + 2]);
    const min = Math.min(data[i], data[i + 1], data[i + 2]);
    if (max === 0) continue;
    const saturation = (max - min) / max;
    const weight = saturation * saturation * (max / 255);
    if (weight < 0.08) continue; // ignore greys and near-blacks
    r += data[i] * weight;
    g += data[i + 1] * weight;
    b += data[i + 2] * weight;
    total += weight;
  }
  if (total < 4) return undefined; // not enough colour to speak of

  const peak = Math.max(r, g, b) / total;
  const lift = 230 / peak;
  return [r, g, b].map((c) => Math.round((c / total) * lift)).join(" ");
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
