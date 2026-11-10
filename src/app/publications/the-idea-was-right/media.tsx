import Image from "next/image";

export { Clip } from "./clip";

const DIR = "/images/publications/the-idea-was-right";

// Phone screenshots are 393×852; the two full-length "outcome" captures are
// taller. next/image needs the real size to reserve space (no layout shift).
const TALL: Record<string, { width: number; height: number }> = {
  "shot-15.jpg": { width: 389, height: 1300 },
  "shot-25.jpg": { width: 389, height: 1300 },
};

export function Shot({
  src,
  alt,
  priority = false,
  zoom = true,
}: {
  src: string;
  alt: string;
  /** Above-the-fold images (the opening spread) load eagerly. */
  priority?: boolean;
  /** Wrap in a button that opens the full-size viewer (see lightbox.tsx). */
  zoom?: boolean;
}) {
  const { width, height } = TALL[src] ?? { width: 393, height: 852 };
  const image = (
    <Image
      src={`${DIR}/${src}`}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes="(max-width: 480px) 62vw, 300px"
    />
  );
  if (!zoom) return image;
  return (
    <button
      type="button"
      className="zoom"
      data-full={`${DIR}/${src}`}
      aria-label={`Open full size: ${alt}`}
    >
      {image}
    </button>
  );
}
