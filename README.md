# Portfolio

Personal portfolio of Orezi Mena, product designer. Live at
[thecreativemena.com](https://www.thecreativemena.com).

Built with Next.js (App Router), React, TypeScript and Tailwind CSS v4, and
deployed on Vercel.

## Run it locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Where things live

- `src/data/projects.ts` — the case studies (copy and image paths). The home
  grid and the `/work/[slug]` pages both read from it.
- `src/config/site.ts` — site name, description and canonical URL used for SEO.
- `src/app/globals.css` — design tokens and all animation.
- `public/bookshelf.html`, `public/life-away.html` — standalone static pages,
  served at `/bookshelf` and `/life-away`.

`CLAUDE.md` has the full project brief, conventions and changelog.
