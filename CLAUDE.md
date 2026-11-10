# CLAUDE.md — Portfolio project brief

Living doc for this repo. Claude Code loads it automatically at the start of every
session, so it's the fastest way to know what this project is, how it's built, and
what we've changed. **Keep the Changelog at the bottom updated as we work.**

Last updated: 2026-11-10

---

## What this is

Personal portfolio for **Orezi Mena** (product designer, 6+ years across AI, fintech,
climate, blockchain). Deployed to Vercel. Production domain: `https://thecreativemena.com`.

## Stack

- **Next.js 16.4.6** (App Router) + **React 19.2.4** + **TypeScript 5**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`) — most styling actually lives in
  hand-written CSS in `src/app/globals.css`, not utility classes
- **@vercel/analytics** for page analytics
- **agentation** — dev-only annotation toolbar (must never render in production)
- **motion** — gesture/spring library, used only by the publication's screenshot viewer
- Font: **Neue Haas Grotesk Display Pro**, self-hosted from `src/app/fonts/` via
  `next/font/local` (see `layout.tsx`)

Scripts: `npm run dev` · `npm run build` · `npm run start` · `npm run lint`

## Layout & routing

```
src/
  app/
    layout.tsx          Root layout: fonts, metadata/SEO, Analytics, DevToolbar
    not-found.tsx       Custom 404
    template.tsx        Route-level opacity crossfade on navigation
    page.tsx            Home page (work grid + personal/writing lists)
    work/[slug]/page.tsx  Case-study detail pages (SSG from PROJECTS)
    publications/<slug>/  Long-form publications (hand-built page per piece)
    opengraph-image.tsx   Dynamic OG image ("M" monogram)
    robots.ts, sitemap.ts SEO, both read SITE_URL
    icon.png, apple-icon.png  Favicons
    fonts/              Neue Haas .ttf files (source design font)
    globals.css         The bulk of the styling + animation keyframes
  components/
    portfolio.tsx       WorkCard, ListItem, ListRow, SectionLabel (home page pieces)
    reveal.tsx          Scroll-reveal wrapper (.reveal / .reveal-stagger in CSS)
    escape-home.tsx     Esc-to-home key handler on project pages
    reading.tsx         Long-form helpers: scroll reveal + current-section label
    site-footer.tsx     Shared footer (home + case studies)
    dev-toolbar.tsx     Dev-only Agentation loader (dynamic import)
    adaptive-image.tsx  next/image wrapper, lower quality on slow connections
  config/
    site.ts             Single source of truth for SEO/identity (SITE_URL, titles…)
  data/
    projects.ts         The four case studies — read by home grid AND detail pages
    publications.ts     Publications list — home section, sitemap, page metadata
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

### 2026-11-10
- **Audit fixes (motion + design).**
  - *Header calmed:* the avatar bounce is gone (the one-time socials peek is
    the invitation now); the shimmer text runs three passes then rests; the
    breathing dot is the only loop left. Don't add another loop to the header.
  - *Timing:* socials open in 300ms and close in 200ms (exit faster than
    entrance); avatar tilt 300ms.
  - *Press feedback:* text links dim while held (`a:not(.card-press):active`
    in `globals.css`).
  - *Keyboard is instant:* arrow keys in the screenshot viewer swap images
    with no animation; Esc-to-home sets `html[data-instant]` briefly so the
    route fade and header entrance don't replay.
  - *Touch targets:* social icons carry a 45px hit area; viewer buttons 44px.
  - *Section label:* switches without animation when sections change within
    400ms (fast scroll).
  - *Static pages:* hover-only effects on bookshelf and life-away are gated to
    real pointers. Their long (0.75–0.85s) transitions are the book-pull and
    were left as deliberate.
  - *Home sections:* Publications / Personal Projects / Side Quest / Bonus
    became two — "Writing & Projects" (publication featured, then a 2×2 grid)
    and "Side Quest" (2×2 grid) — all on one row style.
  - *Contact:* "Email me" is now the primary link, "Or message me on X" second.
  - *Bio:* "Zo" links to its case study. *Footer:* "© Orezi Mena".
  - *Not done (needs the owner):* a line saying what work he is open to and
    where he is based; a Drift case study; whether to bring the side pages'
    serif into the main site.
- **Publication URL renamed** to `/publications/the-idea-was-right` (route
  folder and both asset folders renamed to match). The old
  `/publications/echo-to-council` address 308-redirects to it via
  `redirects()` in `next.config.ts`. Older changelog entries below still use
  the old path when describing the first build.
- **Case-study pages redesigned** (`src/app/work/[slug]/page.tsx`, styles under
  `.cs` in `globals.css`).
  - One left edge on an 880px column; text stops at 680px, figures and section
    rules run the full 880px, the hero steps out to 1080px. Large headline,
    category eyebrow, summary as a lede, facts in a row under the hero.
  - The flat block list is grouped into **numbered sections** at each level-1
    heading (ids from the heading text), so the sticky bar shows the section
    being read plus a reading-progress line.
  - Image alt text is shown as a visible caption.
  - New block types in `projects.ts`: `quote` (pull quote) and `stats`
    (headline numbers). Used only with words/numbers already in the copy:
    Zo (2 quotes, 100k+ / 4.0★), NGX (2 quotes, 70% / Zero).
  - Previous / next project links at the end (`getPreviousProject`).
  - Shared long-form helpers moved to `src/components/reading.tsx`
    (`RevealAll`, `CurrentSection`), used by case studies and the publication;
    `.read-progress` / `.read-current` styles now live in `globals.css`.
  - **Jito copy:** "Marinande" → "Marinade" (4×); the generic filler paragraph
    under "Client Background" was replaced with the factual company
    description that used to be the page summary, and the summary now says
    what the work was. *The new Jito summary is a draft written from the case
    study's own content — the owner should review it.*
  - **Follow-up (web research, owner-approved):** Jito gained a "Where Jito
    Went Next" section with two public figures — $1.4B TVL / largest protocol
    on Solana in May 2024 (The Block, verified) and a $3B+ peak in 2025
    (DefiLlama, via two secondary sources). Framed as the product's growth,
    not a design result. Zo, NGX and Arc now use their home thumbnails as
    heroes. Arc's summary was rewritten from its own "My Role" text.
  - **Arc = DePo / ARC** (owner confirmed; CEO TJ Dunham). Added "Where Arc
    Went Next": the June 2021 Lemonade token sale, the 2022 continuation as
    ARC, and the NFT marketplace launch (1% fee). Sources are a press
    release, IQ.wiki and the project's own Telegram channel — thin, so nothing
    is stated as a metric. The company's later pivot away from the aggregator
    was left out at the owner's request.
  - `public/images/zo/hero.jpg` is an unused portrait photo, not a Zo image.
- **Socials peek on load.** `profile-socials.tsx` slides the social links out
  once ~0.9s after load, holds ~1.7s, then tucks them back (`peek` state, kept
  separate from `open` so `aria-expanded` is unaffected). Skipped under
  reduced motion; cancelled on any interaction. The avatar bounce now starts
  after the peek (3.6s delay) so they never overlap.
- **In Real Life** added as the first Personal Projects row (`public/images/irl.png`
  is irl's own icon). Its link currently points at a single event page dated
  22 Nov 2026 — replace with a public landing page when one exists.
- **Colour system: one text ramp.** The section labels (`--color-label`,
  `#726f64`) were an olive grey sitting between two neutral greys, and failed
  contrast (3.8:1). All text greys now share the cream's faint warmth and
  pass AA: `muted #a8a69f` (body), `muted-2 #918f88` (secondary/captions),
  `label #807e77` (uppercase labels). Roles and contrast figures are
  documented beside the tokens in `globals.css` — pick by role, don't add a
  sixth grey. The shimmer status text moved from a cool silver to the same
  warm family; unused `--color-italic` removed. Token names are unchanged.
  *Not done:* hairlines and surfaces still use ad-hoc `white/5`, `white/10`
  values rather than tokens; the standalone HTML pages keep their own colours.
- **Delight pass (gestures + colour).** Reviewed with the gestures skill.
  - **Accent colour now has a job.** The orange `--color-accent` was defined
    but unused. It is reserved for "live" signals only: the status dot, the
    publication's reading-progress line, `::selection`, and `:focus-visible`
    rings (global rule in `globals.css`). Don't use it decoratively.
  - **Card tint.** Home cards/rows glow in their own image's colour on hover
    (`.card-tint` + `--tint: "r g b"`). The colour is read at build time by
    `vividColour()` in `src/lib/image-size.ts` (saturation-weighted average —
    sharp's "dominant" returns near-black for dark product shots). Override
    with `tint` in `projects.ts` / `publications.ts` when the photo misleads
    (Jito's hands read salmon; the publication thumb is too dark).
  - **Pull the avatar** (`profile-socials.tsx`): drag right to bring the
    socials out, left to tuck them away; rubber-band tracking written straight
    to `transform`, springs home on release. Hand-rolled Pointer Events so the
    home page does not load an animation library. The bounce moved to an
    inner wrapper so it can't fight the drag transform.
  - **Publication:** `compare.tsx` (drag-to-compare before/after, keyboard
    slider, one-time hint sway), `lightbox.tsx` (tap a screenshot → full-size
    viewer; swipe sideways for next/previous, swipe down to dismiss, backdrop
    opacity derived from the drag), `clip.tsx` (tap to pause/resume),
    `page-effects.tsx` (current section in the sticky bar; cursor parallax on
    the opening phones, mouse-only).
  - **New dependency: `motion`** — used only by the lightbox, so it is only
    in the publication route's bundle. Keep it out of the home page.
  - *Gotcha:* the lightbox stops Esc in the capture phase because
    `EscapeHome` would otherwise navigate home while the viewer is open.
- **Publications.** New home-page section (under My Work) fed by
  `src/data/publications.ts`, and the first piece at
  `/publications/echo-to-council` ("Echo chamber → Council and Debate", Zo).
  - Ported from a standalone HTML piece (Geist, violet theme, 2.4MB with 25
    base64 screenshots) into a real route in the portfolio style.
  - `content.tsx` is the body, machine-converted once from the original HTML
    and now **hand-maintained** — edit copy there. It keeps the original
    class names (`.gap`, `.shift`, `.pair`, `.tn` …); `publication.css`
    restyles all of them, scoped under `.pub`. The three SVG diagrams read CSS
    variables (`--accent`, `--dim`, `--line` …) that `.pub` remaps to the
    cream/near-black palette, so they recolour without touching the SVGs.
  - Media: screenshots in `public/images/publications/the-idea-was-right/`
    (`<Shot>`, next/image); six recordings + posters in
    `public/videos/publications/the-idea-was-right/` (`<Clip>`: `preload="none"`,
    plays only while on screen, controls instead of autoplay under reduced
    motion).
  - `reveal-all.tsx` flips `data-visible` on every `.pub .reveal` block, reusing
    the global `.reveal` CSS instead of wrapping each block in `<Reveal>`.
  - **Editorial layout** (reviewed against the Emil Kowalski and Apple design
    skills). Title is now "The Idea Was Right. The Technology Wasn't Ready."
    with a narrative lede. Rules live at the top of `publication.css`:
    centre is only for glance moments (masthead, opening spread, pull quote,
    stats, captions under images); section openers, intros and all running
    text share one left edge on the text measure; text sits
    on a 680px measure and media steps out to 880/1000/1080; phones carry one
    shared shadow and the older screen is pushed back behind the new one (hero
    spread, before/after pairs, which alternate sides); one spacing scale
    (`--s-*`, section gap 176px desktop / 112px phone). Screenshot rows wrap
    into a centred gallery on desktop and become a swipe rail on phones.
    Masthead has a byline (name · date · reading time) and the sticky bar has
    a CSS-only reading-progress hairline (`.pub-progress`, scroll-driven
    animation, hidden where unsupported).
    *Gotcha:* inside `.pub`, set `margin-block` (not the `margin` shorthand)
    on text elements — the measure rules centre section children with
    `margin-inline: auto`, and a later shorthand silently un-centres them.
  - To add another publication: new folder under `src/app/publications/`, add
    an entry to `publications.ts` (home list + sitemap pick it up).
- **Review + cleanup pass before new work.** Lint, type check and build all clean
  (0 lint warnings, `npm audit --omit=dev` = 0).
  - **Agentation no longer ships to production.** The static
    `import { Agentation }` in `layout.tsx` put the whole library (~427KB) in a
    chunk every live page downloaded, even though the `NODE_ENV` check stopped it
    rendering. Now loaded via `next/dynamic` inside
    `src/components/dev-toolbar.tsx`, so it is its own chunk that is only fetched
    in development. *Rule:* never statically import a dev-only library from a
    server component; gate the import, not just the render.
  - **Next 16.2.10 → 16.4.6** (+ `eslint-config-next`), then `npm audit fix`.
    Remaining advisories are dev-only (eslint toolchain `minimatch`).
  - **Avatar is a tap toggle for the socials** (`src/components/profile-socials.tsx`,
    client component). They were hover/focus-only, so touch visitors never saw
    them. Now: hover reveals on mouse, tap/click on the avatar toggles them,
    keyboard focus (`focus-visible`) reveals them. Don't switch back to
    `focus-within` — a tap focuses the button, which would stop it closing.
  - **Headline words are links** (`page.tsx`, `HEADLINE_LINK`): "Designer" →
    `#work` (the My Work section, same page), "author" → the book on Amazon,
    "curious human" → Instagram (both new tab). Thin dim underline at rest.
  - **Avatar "tap me" bounce** (`.avatar-bounce` in `globals.css`): game-style
    squash-and-stretch hop about every 3s, replacing the old `avatar-nudge`. It
    stops permanently once the visitor hovers or taps the avatar.
  - **Static pages are now shareable/indexable.** `bookshelf.html` and
    `life-away.html` got description, canonical, `og:*` and `twitter:*` tags
    (hardcoded to the `www` host — update by hand if the domain changes) and are
    listed in `sitemap.ts`.
  - **AdaptiveImage no longer double-downloads.** If the image already finished
    loading at full quality before the effect runs, it stays; it only drops to
    q40 for images not yet fetched.
  - **Shared footer** in `src/components/site-footer.tsx` (year from build time);
    **custom 404** in `src/app/not-found.tsx`.
  - **Tidy:** removed create-next-app SVGs, three unused icons, the unused
    `contain` block option; `arc/overview.png` was byte-identical to
    `work-arc.png`, so the case study now points at the latter; `zo/hero.jpg`
    recompressed 2.6MB → 451KB (2000px wide); README rewritten; package renamed
    `portfolio`.
  - **Git account:** this repo's local git config uses the GitHub CLI login
    (`Creativemena007`) for github.com — the machine default (`Menaisworking`)
    has no write access.
  - **Dev server:** port 3000 is often taken by another project; `.claude/launch.json`
    runs this one on **3100**.

### 2026-07-24
- **Bandwidth-gated image rendition (landing page).** Added
  `src/components/adaptive-image.tsx` — a client wrapper over `next/image` that
  lowers requested `quality` (75 → 40) when the visitor is on a slow connection
  or has Data Saver on, read from the Network Information API
  (`navigator.connection` — Chromium-only; Safari/Firefox/SSR default to full
  quality, only ever downgrading on positive evidence). Wired into `WorkCard`
  (the heavy "My Work" grid). Hydration-safe: SSR + first client render use
  "full", the tier re-evaluates in an effect after mount (below-fold cards are
  lazy, so only one fetch happens, at the settled tier).
  - **Gotcha:** Next 16 only optimizes `quality` values on the
    `images.qualities` allowlist (default `[75]`) — any other value 400s
    ("q parameter not allowed"). Added `images.qualities: [40, 75]` in
    `next.config.ts`. If you add more tiers, allowlist them there too.
  - Verified: work-jito q=75 → 12KB vs q=40 → 8.5KB (~30% lighter).
- **Incident: local deps downgraded to Next 9.3.3.** On Jul 23 ~11:13 something
  (likely a Cursor extension/agent install) rewrote `package.json` to
  `next@^9.3.3` + regenerated the lockfile + `npm install`ed it, breaking local
  builds (Next 9 can't run React 19 / App Router). Production was unaffected
  (Vercel builds from git, which kept `next@16.2.10`). Fixed by
  `git checkout HEAD -- package.json package-lock.json && npm install` (broken
  copies backed up in the session scratchpad). If local builds suddenly fail on
  config/`next.config.ts`, check `node_modules/next/package.json` version first.

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
