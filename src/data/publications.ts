/*
  Publications listed in the home page "Publications" section.

  Each publication is its own hand-built page under src/app/publications/<slug>/
  (long-form pieces have bespoke layouts, so they are not generated from blocks
  the way case studies are). This file only holds what the home list, sitemap
  and page metadata need.
*/

export type Publication = {
  slug: string;
  href: string;
  title: string;
  /** One line shown under the title on the home page. */
  subtitle: string;
  /** Longer summary used for the page's meta description. */
  description: string;
  /** Thumbnail path under /public/images, without extension. */
  img: string;
  imgExt?: string;
  /** Optional "r g b" hover-glow colour for the home row. */
  tint?: string;
};

export const PUBLICATIONS: Publication[] = [
  {
    slug: "the-idea-was-right",
    href: "/publications/the-idea-was-right",
    title: "The Idea Was Right. The Technology Wasn’t Ready.",
    subtitle:
      "Revisiting the AI experiences we designed at Zo in 2024, and what two years of progress make possible.",
    description:
      "Revisiting the AI experiences we designed at Zo in 2024, what held them back, and how two years of technological progress have changed what’s possible.",
    // Cover: one bold glyph on Zo violet — three voices becoming one answer.
    // Source is cover-council.svg beside it (re-export the PNG after edits).
    // glyph-set.svg in the same folder holds the sibling glyphs (echo, debate,
    // clock) in the same style, for future publications.
    img: "publications/the-idea-was-right/cover-council",
    tint: "150 90 255",
  },
];
