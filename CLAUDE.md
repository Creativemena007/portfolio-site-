# CLAUDE.md — Portfolio project brief

Living doc for this repo. Claude Code loads it automatically at the start of every
session, so it's the fastest way to know what this project is, how it's built, and
what we've changed. **Keep the Changelog at the bottom updated as we work.**

Last updated: 2026-07-23

---

## What this is

Personal portfolio for **Orezi Mena** (product designer, 6+ years across AI, fintech,
climate, blockchain). Deployed to Vercel. Production domain: `https://thecreativemena.com`.

## Stack

- **Next.js 16.2.10** (App Router) + **React 19.2.4** + **TypeScript 5**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`) — most styling actually lives in
  hand-written CSS in `src/app/globals.css`, not utility classes
- **@vercel/analytics** for page analytics
- **agentation** — dev-only annotation toolbar (must never render in production)
- Font: **Neue Haas Grotesk Display Pro**, self-hosted from `src/app/fonts/` via
  `next/font/local` (see `layout.tsx`)

Scripts: `npm run dev` · `npm run build` · `npm run start` · `npm run lint`

## Layout & routing

```
src/
  app/
    layout.tsx          Root layout: fonts, metadata/SEO, Analytics, Agentation
    template.tsx        Route-level opacity crossfade on navigation
    page.tsx            Home page (work grid + personal/writing lists)
    work/[slug]/page.tsx  Case-study detail pages (SSG from PROJECTS)
    opengraph-image.tsx   Dynamic OG image ("M" monogram)
    robots.ts, sitemap.ts SEO, both read SITE_URL
    icon.png, apple-icon.png  Favicons
    fonts/              Neue Haas .ttf files (source design font)
    globals.css         The bulk of the styling + animation keyframes
  components/
    portfolio.tsx       WorkCard, ListItem, ListRow, SectionLabel (home page pieces)
    reveal.tsx          Scroll-reveal wrapper (.reveal / .reveal-stagger in CSS)
    escape-home.tsx     Esc-to-home key handler on project pages
  config/
    site.ts             Single source of truth for SEO/identity (SITE_URL, titles…)
  data/
    projects.ts         The four case studies — read by home grid AND detail pages
public/
  bookshelf.html        Standalone static page — "The shelf" (books)
  life-away.html        Standalone static page — photo gallery
  fonts/                Neue Haas + DreamBaser .ttf for the standalone HTML pages
  images/               Project + gallery imagery
```

### Two kinds of pages
1. **Next.js pages** — home (`/`) and the four case studies (`/work/jito`, `/work/zo`,
   `/work/ngx`, `/work/arc`). Driven by `PROJECTS` in `src/data/projects.ts`; array
   order also defines the "Next project →" cycle.
2. **Standalone static HTML** in `public/` — `bookshelf.html` and `life-away.html`.
   These are fully self-contained (own `<style>`, own fonts) and are NOT part of the
   React app. Served via clean-URL rewrites (see below).

## Conventions & gotchas

- **Edit content via the config/data files**, not scattered through JSX: `site.ts`
  for identity/SEO, `projects.ts` for case-study copy and image paths.
- **Set `NEXT_PUBLIC_SITE_URL`** in the deploy env if the domain changes — sitemap,
  robots and `metadataBase` all derive from it.
- **Agentation is dev-only.** In `layout.tsx` and the standalone HTML pages it's gated
  to localhost. Never let it ship to production.
- **Reduced motion:** all entrance animations live inside
  `@media (prefers-reduced-motion: no-preference)` blocks in `globals.css`. Keep new
  motion there so reduced-motion users see static content.
- **Standalone HTML pages are hand-maintained** — no build step, no shared components.
  Fonts they use must exist in `public/fonts/`.
- Clean URLs for the static pages are wired in `next.config.ts` `rewrites()`. Link to
  `/bookshelf` and `/life-away` (no `.html`).

---

## Changelog — what we've done

### 2026-07-23
- **Social share image not rendering (Twitter/X, LinkedIn, iMessage, etc.).** The OG
  markup was correct (dynamic `opengraph-image.tsx` "M" monogram, proper
  `og:image`/`twitter:card=summary_large_image` tags). Root cause was the **canonical
  host**: all absolute URLs derive from `SITE_URL`, which defaulted to the apex
  `thecreativemena.com` — but Vercel **308-redirects the apex to `www.`**. Crawlers
  fetch `og:image` exactly and don't follow redirects for it, so they saw a 308 and
  rendered no preview. Fixed by defaulting `SITE_URL` in `src/config/site.ts` to
  `https://www.thecreativemena.com` (the host that serves the image with a direct 200).
  - **Deploy action required:** ensure Vercel's `NEXT_PUBLIC_SITE_URL` env var is
    **unset** (or set to the `www` URL) — if it's pinned to the apex it overrides this.
    Then redeploy and re-scrape (LinkedIn Post Inspector / Facebook Sharing Debugger;
    X re-fetches on a fresh share; iMessage caches hard — test with a cache-busting
    `?v=1` or a different link).
  - *Canonical host rule:* whatever host is set here MUST serve directly (200, no
    redirect). If you'd rather brand the apex, flip Vercel so `www`→apex redirects
    (not apex→`www`) and set this back to the apex.
- **Case-study detail-page images → `next/image`.** The `/work/[slug]` hero and all
  body images were plain `<img>` at full size (e.g. jito hero was 3150×2100 / 483KB).
  Migrated both to `next/image`. Since these images are authored as bare `/images/…`
  paths in `projects.ts` (no dimensions) and next/image needs width/height, added a
  build-time helper **`src/lib/image-size.ts`** that reads intrinsic dimensions off
  disk with **sharp** (ships with Next; cached per path). The SSG page pre-resolves a
  `{src → {width,height}}` map and passes it to the hero (`priority`, it's the LCP) and
  each image block; `sizes` set to `(max-width:768px) 100vw, 720px`, `h-auto w-full`.
  Verified: jito hero 483KB → **~14KB** (w750, WebP/AVIF); rendered width/height match
  source files exactly, so no layout shift. Body images lazy-load by default.
- **Homepage image perf (the "My Work" scroll stall).** The work grid used plain
  `<img>` tags pointing at unoptimized PNGs — `work-{jito,zo,ngx,arc}.png` were
  1–1.3MB each (arc was 3000×2000), ~4.7MB total, no resizing/lazy-loading — so
  scrolling to the section triggered multi-MB downloads. Migrated the homepage raster
  images to **`next/image`**: `WorkCard` grid (`fill` + `sizes`), the `ListRow`
  thumbnails (`fill`), and the profile avatar (`width/height`, `priority`). SVG
  icons/arrows left as plain `<img>` (next/image needs `dangerouslyAllowSVG`).
  Verified via the optimizer: `work-arc.png` 1.0MB → **28KB** WebP, `work-jito`
  1.2MB → **12KB** (AVIF served to supporting browsers). Below-the-fold images now
  lazy-load automatically.
  - *Note:* rule of thumb going forward — use `next/image` for raster images in the
    React app, not `<img>`.
  - *Still on plain `<img>` (by design):* the standalone `public/*.html` pages —
    they're outside the React app, so no next/image. (Detail pages: done, see the
    newer entry above.)
- **Clean URLs for static pages.** `bookshelf.html`/`life-away.html` were linked with
  their `.html` extension because they're raw files in `public/`. Added `rewrites()` in
  `next.config.ts` mapping `/bookshelf → /bookshelf.html` and `/life-away →
  /life-away.html`, and updated the home-page links in `page.tsx` to the clean paths.
- **Bookshelf page load perf.** The page was 136KB because the "Dream Baser" font was
  inlined twice as base64 (~65KB of render-blocking HTML). Extracted it to
  `public/fonts/DreamBaser-{Bold,Regular}.ttf` and referenced by URL → HTML dropped to
  **~47KB** (fonts now cache + load in parallel). Also added the missing
  `preconnect` to `fonts.gstatic.com` (where Google Font binaries are served from).
  - *Possible future win:* convert the `.ttf` fonts (Dream Baser + Neue Haas) to
    `woff2` (~40% smaller); needs `fonttools`/`brotli`, not installed yet.

<!-- Add new entries at the top, newest first. -->
