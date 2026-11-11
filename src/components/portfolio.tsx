/*
  Reusable pieces for the portfolio page.

  Card interaction model (matches the Figma source):
  - DEFAULT state = plain (no panel, arrow hidden).
  - HOVER state   = surface panel fades in + up-right arrow appears.
  The featured cards in the design (JITO, Ontime, Don't Grow Up,
  My Spotify Playlist) are simply the hover state of this same component.
*/

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { AdaptiveImage } from "@/components/adaptive-image";

const ARROW_UR = "/images/icon-arrow-ur1.svg";
// icon-arrow-diag is an up-arrow; rotated 90° it reads as a right arrow (→).
const ARROW_RIGHT = "/images/icon-arrow-diag.svg";

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[13px] font-medium uppercase leading-[1.5] tracking-[4.2px] text-label">
      {children}
    </p>
  );
}

type ThumbVariant = "cover" | "white-cover" | "white-contain" | "placeholder";

function thumbClasses(variant: ThumbVariant) {
  switch (variant) {
    case "white-cover":
      return "bg-white";
    case "white-contain":
      return "bg-white p-2.5";
    case "placeholder":
      return "bg-[#d9d9d9]";
    default:
      return "";
  }
}

/* ---------------- Large work card (MY WORK grid) ---------------- */

// The card only needs a subset of Project; accepting Project keeps the home
// grid and the detail pages fed from the same data.
export type Work = Project;

// Sets the --tint custom property that `.card-tint` (globals.css) reads.
function tintStyle(tint?: string) {
  return tint ? ({ "--tint": tint } as React.CSSProperties) : undefined;
}

export function WorkCard({
  work,
  blurDataURL,
  tint,
}: {
  work: Work;
  blurDataURL?: string;
  /** "r g b" — the project's own colour, for the hover glow. */
  tint?: string;
}) {
  return (
    <Link
      href={`/work/${work.slug}`}
      style={tintStyle(tint)}
      className="group card-press card-tint block rounded-[22px] hover:bg-surface-hover md:p-3"
    >
      <div className="relative aspect-[543/475] w-full overflow-hidden rounded-t-[20px]">
        <AdaptiveImage
          src={`/images/${work.img}.png`}
          alt={work.title}
          fill
          sizes="(max-width: 768px) 100vw, 543px"
          placeholder={blurDataURL ? "blur" : undefined}
          blurDataURL={blurDataURL}
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-3 flex items-center justify-between gap-4 md:px-5">
        <span className="text-[16px] font-medium uppercase tracking-[-0.01em] text-cream">
          {work.title}
        </span>
        <div className="flex items-center">
          <span className="whitespace-nowrap text-[16px] tracking-normal text-label transition-colors duration-300 group-hover:text-cream-dim">
            {work.category}
          </span>
          {/* Arrow sits beside the label, collapsed to zero width by default;
              on hover it expands and fades in, nudging the label leftward. */}
          <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-300 ease-out group-hover:grid-cols-[1fr]">
            <span className="overflow-hidden">
              <img
                src={ARROW_RIGHT}
                alt=""
                aria-hidden
                className="ml-2 h-[18px] w-[18px] max-w-none rotate-90 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ---------------- List row (Personal / Side quest / Bonus) ---------------- */

export type ListItem = {
  img?: string;
  imgExt?: string;
  variant: ThumbVariant;
  title: string;
  subtitle: string;
  href?: string;
  /** "r g b" — the thumbnail's own colour, for the hover glow. */
  tint?: string;
};

export function ListRow({
  item,
  size = "sm",
}: {
  item: ListItem;
  size?: "sm" | "lg";
}) {
  // On phones every row uses the same thumbnail, so stacked sections line
  // up; the larger "lg" thumbnail only applies from tablet width up, where
  // those rows sit in a single wide column.
  const thumbSize =
    size === "lg"
      ? "h-[73px] w-[78px] md:h-[95px] md:w-[104px]"
      : "h-[73px] w-[78px]";
  const external = item.href?.startsWith("http");
  return (
    <a
      href={item.href ?? "#"}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      style={tintStyle(item.tint)}
      className="group card-press card-tint relative flex w-full items-center gap-3 rounded-[20px] hover:bg-surface-hover md:p-3"
    >
      <div
        className={`${thumbSize} relative shrink-0 overflow-hidden rounded-l-[16px] ${thumbClasses(
          item.variant
        )}`}
      >
        {item.img && (
          <Image
            src={`/images/${item.img}.${item.imgExt ?? "png"}`}
            alt={item.title}
            fill
            sizes="104px"
            className={`transition-transform duration-300 ease-out group-hover:scale-[1.06] ${
              item.variant === "white-contain"
                ? "object-contain"
                : "object-cover"
            }`}
          />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 transition-transform duration-300 ease-out group-hover:translate-x-1.5">
        {/* The text never stands taller than the thumbnail beside it: the
            title is one line, and the subtitle is one line too (two on the
            larger desktop rows). Anything longer ends in an ellipsis. */}
        <span className="truncate text-[16px] font-medium tracking-[-0.01em] text-cream">
          {item.title}
        </span>
        <span
          className={`text-[16px] tracking-normal text-muted-2 ${
            size === "lg" ? "line-clamp-1 md:line-clamp-2" : "line-clamp-1"
          }`}
        >
          {item.subtitle}
        </span>
      </div>
      {/* Arrow tucked into the top-right corner, 22px from the top and right
          edges (matching the work cards), fading in with a lift on hover. */}
      <img
        src={ARROW_UR}
        alt=""
        aria-hidden
        className="absolute right-[18px] top-[18px] h-[18px] w-[18px] translate-y-1 opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100"
      />
    </a>
  );
}
