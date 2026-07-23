/*
  Single source of truth for site-wide SEO/identity values.
  metadataBase, sitemap and robots all read from SITE_URL, so set
  NEXT_PUBLIC_SITE_URL in the deploy environment if the domain changes.

  IMPORTANT: this MUST be the canonical host that serves directly with no
  redirect. The apex (thecreativemena.com) 308-redirects to www, and social
  crawlers (Twitter/X, LinkedIn, iMessage, Slack) don't follow redirects for
  og:image — a redirected image URL renders as "no preview". www is the host
  that returns the OG image with a direct 200, so it's the canonical here.
*/
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thecreativemena.com";

export const SITE_NAME = "Mena";

export const SITE_TITLE = "Mena — Designer, author, and a curious human";

export const SITE_DESCRIPTION =
  "Orezi Mena is a product designer with 6+ years across AI, fintech, climate and blockchain — designing for the teams behind Jito, Drift, Next Green Tech and Zo. Selected work, writing and side quests.";

export const TWITTER_HANDLE = "@Thecreativemena";
