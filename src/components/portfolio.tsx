/*
  Reusable pieces for the portfolio page.

  Card interaction model (matches the Figma source):
  - DEFAULT state = plain (no panel, arrow hidden).
  - HOVER state   = surface panel fades in + up-right arrow appears.
  The featured cards in the design (JITO, Ontime, Don't Grow Up,
  My Spotify Playlist) are simply the hover state of this same component.
*/

import Link from "next/link";
import type { Project } from "@/data/projects";

const ARROW_UR = "/images/icon-arrow-ur1.svg";
// icon-arrow-diag is an up-arrow; rotated 90° it reads as a right arrow (→).
const ARROW_RIGHT = "/images/icon-arrow-diag.svg";

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[16px] font-medium uppercase leading-[1.5] tracking-[5.28px] text-label">
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
      return "bg-white p-3";
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

export function WorkCard({ work }: { work: Work }) {
  return (
    <Link
      href={`/work/${work.slug}`}
      className="group card-press block rounded-[28px] p-4 hover:bg-white/10"
    >
      <div className="aspect-[543/475] w-full overflow-hidden rounded-t-[24px]">
        <img
          src={`/images/${work.img}.png`}
          alt={work.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-4 flex items-center justify-between gap-4 px-6">
        <span className="text-[20px] font-medium uppercase tracking-[0.03em] text-cream">
          {work.title}
        </span>
        <div className="flex items-center">
          <span className="whitespace-nowrap text-[20px] tracking-[0.03em] text-label transition-colors duration-300 group-hover:text-cream-dim">
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
                className="ml-2.5 h-[22px] w-[22px] max-w-none rotate-90 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
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
};

export function ListRow({
  item,
  size = "sm",
}: {
  item: ListItem;
  size?: "sm" | "lg";
}) {
  const thumbSize =
    size === "lg" ? "h-[119px] w-[130px]" : "h-[91px] w-[98px]";
  const external = item.href?.startsWith("http");
  return (
    <a
      href={item.href ?? "#"}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="group card-press relative flex w-full items-center gap-4 rounded-[24px] p-4 hover:bg-white/10"
    >
      <div
        className={`${thumbSize} shrink-0 overflow-hidden rounded-l-[20px] ${thumbClasses(
          item.variant
        )}`}
      >
        {item.img && (
          <img
            src={`/images/${item.img}.${item.imgExt ?? "png"}`}
            alt={item.title}
            className={`h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.06] ${
              item.variant === "white-contain"
                ? "object-contain"
                : "object-cover"
            }`}
          />
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 transition-transform duration-300 ease-out group-hover:translate-x-1.5">
        <span className="text-[20px] font-medium tracking-[0.03em] text-cream">
          {item.title}
        </span>
        <span className="text-[20px] tracking-[0.03em] text-muted-2">
          {item.subtitle}
        </span>
      </div>
      {/* Arrow tucked into the top-right corner, 22px from the top and right
          edges (matching the work cards), fading in with a lift on hover. */}
      <img
        src={ARROW_UR}
        alt=""
        aria-hidden
        className="absolute right-[22px] top-[22px] h-[22px] w-[22px] translate-y-1 opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100"
      />
    </a>
  );
}
