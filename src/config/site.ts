/*
  Single source of truth for site-wide SEO/identity values.
  metadataBase, sitemap and robots all read from SITE_URL, so set
  NEXT_PUBLIC_SITE_URL in the deploy environment if the domain changes.
*/
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://thecreativemena.com";

export const SITE_NAME = "Mena";

export const SITE_TITLE = "Mena — Designer, author, and a curious human";

export const SITE_DESCRIPTION =
  "Orezi Mena is a product designer with 6+ years across AI, fintech, climate and blockchain — designing for the teams behind Jito, Drift, Next Green Tech and Zo. Selected work, writing and side quests.";

export const TWITTER_HANDLE = "@Thecreativemena";
