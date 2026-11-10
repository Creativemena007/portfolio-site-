import {
  ListItem,
  ListRow,
  SectionLabel,
  WorkCard,
} from "@/components/portfolio";
import { ProfileSocials } from "@/components/profile-socials";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { PROJECTS } from "@/data/projects";
import { PUBLICATIONS } from "@/data/publications";
import { getImageMetaMap } from "@/lib/image-size";

/* ------------------------------- Content ------------------------------- */

const PERSONAL: ListItem[] = [
  {
    img: "ontime",
    variant: "cover",
    title: "Ontime",
    subtitle: "Time zone interpreter tool",
    href: "https://ontime.bymena.design/",
  },
  {
    img: "figma-plugins",
    variant: "cover",
    title: "Figma Plugins",
    subtitle: "Figma Community",
    href: "https://www.figma.com/@thecreativemena",
  },
];

const SIDE_QUEST: ListItem[] = [
  {
    img: "dont-grow-up",
    variant: "cover",
    title: "Don’t Grow Up",
    subtitle:
      "A book about adulthood, curiosity and the parts of ourselves worth protecting.",
    href: "https://www.amazon.com/dp/B0GFG5FFK1",
  },
  {
    img: "playground",
    variant: "cover",
    title: "The Playground",
    subtitle:
      "A room where adults can play, think out loud and feel human again.",
    href: "https://www.entertheplayground.co/",
  },
  {
    img: "life-away",
    imgExt: "jpg",
    variant: "cover",
    title: "Life away from the screen",
    subtitle:
      "Long runs, heavy lifts, unfamiliar places and the moments between them.",
    href: "/life-away",
  },
];

const BONUS: ListItem[] = [
  {
    img: "spotify",
    variant: "white-contain",
    title: "My Spotify Playlist",
    subtitle: "Songs I design, run and think to.",
    href: "https://open.spotify.com/user/3174nubffdkngpueu3c7aj4caovm?si=918a017de10142f3",
  },
  {
    img: "book-recs",
    imgExt: "webp",
    variant: "cover",
    title: "Book Recommendations",
    subtitle: "Books that have shaped me",
    href: "/bookshelf",
  },
];

// Links inside the headline: quiet underline at rest, full cream on hover.
const HEADLINE_LINK =
  "underline decoration-white/25 decoration-1 underline-offset-[5px] transition-colors hover:text-cream hover:decoration-cream";

/* -------------------------------- Page --------------------------------- */

export default async function Home() {
  // Build-time image data for the home page: tiny blurred previews for the
  // work-grid thumbnails (so each card shows something instantly), and each
  // image's own colour for the hover glow on cards and rows.
  const thumb = (item: { img?: string; imgExt?: string }) =>
    `/images/${item.img}.${item.imgExt ?? "png"}`;
  const lists = [...PUBLICATIONS, ...PERSONAL, ...SIDE_QUEST, ...BONUS];
  const meta = await getImageMetaMap([
    ...PROJECTS.map((p) => `/images/${p.img}.png`),
    ...lists.map(thumb),
  ]);
  // An explicit tint in the data wins over the one read from the image.
  const withTint = <T extends { img?: string; imgExt?: string; tint?: string }>(
    item: T
  ) => ({
    ...item,
    tint: item.tint ?? meta[thumb(item)]?.tint,
  });

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-[888px] px-5 py-16 md:px-6 md:py-28 lg:py-[132px]">
        <div className="flex flex-col gap-20">
          {/* Intro — header + status grouped so their internal spacing is
              independent of the gap before the "My Work" section below. */}
          <div className="flex flex-col gap-8">
            {/* ---------- Header ---------- */}
            <header className="flex max-w-[710px] flex-col gap-6">
              <ProfileSocials />

              {/* Bio */}
              <div className="enter enter-d2 flex flex-col gap-5">
                <h1 className="text-[22px] font-normal leading-[1.3] tracking-[-0.015em] text-cream-dim md:text-[26px]">
                  {/* Each identity links to its proof: the work below, the
                      book, and Instagram (the Playground + life outside
                      design). A thin dim underline marks them as links without
                      cluttering the headline; it brightens on hover. */}
                  <a href="#work" className={HEADLINE_LINK}>
                    Designer
                  </a>
                  ,{" "}
                  <a
                    href="https://www.amazon.es/-/en/Dont-Grow-Up-Rediscovering-wonder/dp/B0GFG5FFK1"
                    target="_blank"
                    rel="noreferrer"
                    className={HEADLINE_LINK}
                  >
                    author
                  </a>
                  , and a{" "}
                  <a
                    href="https://www.instagram.com/thecreativemena/"
                    target="_blank"
                    rel="noreferrer"
                    className={HEADLINE_LINK}
                  >
                    curious human
                  </a>
                  .
                  <br />
                  {/* The aside: same size, stepped back in tone. */}
                  <span className="text-muted">
                    Interested in what we build and how it shapes us.
                  </span>
                </h1>
                <div className="flex flex-col gap-5 text-[15px] leading-[1.75] tracking-normal text-muted md:text-[16px]">
                  <p>
                    For over six years, I&rsquo;ve designed products across AI,
                    fintech, climate and blockchain, working with teams behind{" "}
                    <a
                      href="https://www.jito.network"
                      target="_blank"
                      rel="noreferrer"
                      className="font-normal text-cream-dim decoration-1 underline-offset-4 transition-colors hover:underline"
                    >
                      Jito
                    </a>
                    ,{" "}
                    <a
                      href="https://www.drift.trade"
                      target="_blank"
                      rel="noreferrer"
                      className="font-normal text-cream-dim decoration-1 underline-offset-4 transition-colors hover:underline"
                    >
                      Drift.trade
                    </a>
                    ,{" "}
                    <a
                      href="https://nextgreenx.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="font-normal text-cream-dim decoration-1 underline-offset-4 transition-colors hover:underline"
                    >
                      Next Green Tech
                    </a>{" "}
                    and <span className="text-cream-dim">Zo</span>.
                  </p>
                  <p>
                    Away from the screen, I write, speak, run unreasonable
                    distances and create spaces where adults can feel human
                    again.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="enter enter-d3 flex items-center gap-7">
                <a
                  href="https://x.com/Thecreativemena"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-1.5 text-[16px] tracking-normal text-cream"
                >
                  <span className="decoration-1 underline-offset-4 group-hover:underline">
                    Send a message
                  </span>
                  <img
                    src="/images/icon-arrow-diag.svg"
                    alt=""
                    aria-hidden
                    className="size-4 rotate-90 transition-transform group-hover:translate-x-0.5"
                  />
                </a>
                <a
                  href="mailto:hello@thecreativemena.com"
                  className="text-[16px] tracking-normal text-cream decoration-1 underline-offset-4 hover:underline"
                >
                  Prefer email?
                </a>
              </div>
            </header>

            {/* ---------- Status ---------- */}
            <div className="enter enter-d4 flex items-center gap-2">
              {/* Live dot — the accent colour is reserved for "live" signals */}
              <span
                aria-hidden
                className="breathe size-[10px] shrink-0 rounded-full bg-accent shadow-[0_0_10px_rgb(245_132_4/0.6)]"
              />
              <p className="shimmer-text text-[14px] italic tracking-normal md:text-[16px]">
                Currently designing, writing, running, and trying not to grow up.
              </p>
            </div>
          </div>

          {/* ---------- Sections ---------- */}
          <div className="flex flex-col gap-20 md:gap-[100px]">
            {/* MY WORK */}
            <section id="work" className="flex scroll-mt-10 flex-col gap-5">
              <SectionLabel>My Work</SectionLabel>
              <Reveal stagger className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {PROJECTS.map((w) => (
                  <WorkCard
                    key={w.slug}
                    work={w}
                    blurDataURL={meta[`/images/${w.img}.png`]?.blurDataURL}
                    tint={w.tint ?? meta[`/images/${w.img}.png`]?.tint}
                  />
                ))}
              </Reveal>
            </section>

            {/* PUBLICATIONS */}
            <section className="flex flex-col gap-5">
              <SectionLabel>Publications</SectionLabel>
              <Reveal stagger className="flex flex-col gap-[18px]">
                {PUBLICATIONS.map((p) => (
                  <ListRow
                    key={p.slug}
                    size="lg"
                    item={withTint({
                      img: p.img,
                      imgExt: p.imgExt,
                      variant: "cover" as const,
                      title: p.title,
                      subtitle: p.subtitle,
                      href: p.href,
                      tint: p.tint,
                    })}
                  />
                ))}
              </Reveal>
            </section>

            {/* PERSONAL PROJECTS */}
            <section className="flex flex-col gap-5">
              <SectionLabel>Personal Projects</SectionLabel>
              <Reveal
                stagger
                className="grid grid-cols-1 gap-[18px] md:grid-cols-2"
              >
                {PERSONAL.map((item) => (
                  <ListRow key={item.title} item={withTint(item)} />
                ))}
              </Reveal>
            </section>

            {/* SIDE QUEST */}
            <section className="flex flex-col gap-5">
              <SectionLabel>Side Quest</SectionLabel>
              <Reveal stagger className="flex flex-col gap-[18px]">
                {SIDE_QUEST.map((item) => (
                  <ListRow key={item.title} item={withTint(item)} size="lg" />
                ))}
              </Reveal>
            </section>

            {/* BONUS */}
            <section className="flex flex-col gap-5">
              <SectionLabel>Bonus</SectionLabel>
              <Reveal
                stagger
                className="grid grid-cols-1 gap-[18px] md:grid-cols-2"
              >
                {BONUS.map((item) => (
                  <ListRow key={item.title} item={withTint(item)} />
                ))}
              </Reveal>
            </section>
          </div>
        </div>

        <SiteFooter className="md:mt-40" />
      </div>
    </main>
  );
}
