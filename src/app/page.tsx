import {
  ListItem,
  ListRow,
  SectionLabel,
  WorkCard,
} from "@/components/portfolio";
import { Reveal } from "@/components/reveal";
import { PROJECTS } from "@/data/projects";

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
    href: "https://www.amazon.com/Dont-Grow-Up-Rediscovering-wonder/dp/B0GFG5FFK1/ref=tmm_pap_swatch_0?_encoding=UTF8&dib_tag=se&dib=eyJ2IjoiMSJ9.gO7hfji533wYlB9QstsptQ.O4PCHEH0Y1e39xMiumNaQPVK9Uqx7kdkWQQec91z6QA&qid=1784554473&sr=8-1",
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
    variant: "white-cover",
    title: "Book Recommendations",
    subtitle: "Books that have shaped me",
    href: "/bookshelf.html",
  },
];

const SOCIALS = [
  { icon: "icon-x", label: "X", href: "https://x.com/Thecreativemena" },
  {
    icon: "icon-social2",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/thecreativemena/",
  },
  {
    icon: "icon-social3",
    label: "Medium",
    href: "https://medium.com/@thecreativemena",
  },
  {
    icon: "icon-social1",
    label: "Instagram",
    href: "https://www.instagram.com/thecreativemena/",
  },
];

/* -------------------------------- Page --------------------------------- */

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-[888px] px-5 py-16 md:px-6 md:py-28 lg:py-[132px]">
        <div className="flex flex-col gap-20">
          {/* Intro — header + status grouped so their internal spacing is
              independent of the gap before the "My Work" section below. */}
          <div className="flex flex-col gap-8">
            {/* ---------- Header ---------- */}
            <header className="flex max-w-[710px] flex-col gap-6">
              {/* Profile + socials.
                  Socials stay tucked behind the avatar and slide out to the
                  right on hover/focus. Uses a 0fr→1fr grid track so the reveal
                  animates width smoothly without a fixed magic number. */}
              <div className="enter enter-d1 group flex items-center gap-[10px]">
                {/* Avatar: a rare idle nudge hints it's interactive; on hover it
                    tilts toward the socials as if tugging them out. Nudge pauses
                    while hovering so the two motions don't fight. */}
                <div className="avatar-nudge shrink-0 group-hover:[animation-play-state:paused]">
                  <img
                    src="/images/profile.png"
                    alt="Mena"
                    className="size-[84px] rounded-full object-cover transition-transform duration-500 ease-out group-hover:rotate-[-8deg] group-hover:scale-105"
                  />
                </div>
                <div className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-500 ease-out group-hover:grid-cols-[1fr] group-focus-within:grid-cols-[1fr]">
                  <div className="flex min-w-0 items-center gap-1.5 overflow-hidden opacity-0 -translate-x-3 transition-[opacity,transform] duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100">
                    {SOCIALS.map((s) => (
                      <a
                        key={s.icon}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        className="group/social flex size-[37px] shrink-0 items-center justify-center rounded-full bg-surface-2 transition-[background-color,transform] duration-200 ease-out hover:scale-105 hover:bg-white/[0.12]"
                      >
                        <img
                          src={`/images/${s.icon}.svg`}
                          alt=""
                          className="size-[21px] opacity-70 transition-opacity duration-200 group-hover/social:opacity-100"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="enter enter-d2 flex flex-col gap-3">
                <h1 className="text-[22px] font-medium leading-[1.15] tracking-[-0.015em] text-cream-dim md:text-[26px]">
                  Designer, author, and a curious human.
                  <br />
                  Interested in what we build and how it shapes us.
                </h1>
                <div className="flex flex-col gap-4 text-[15px] leading-[1.6] tracking-normal text-muted md:text-[16px]">
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
              {/* Silver pulse dot */}
              <span
                aria-hidden
                className="breathe size-[10px] shrink-0 rounded-full bg-[#c9c9ce] shadow-[0_0_8px_rgba(201,201,206,0.5)]"
              />
              <p className="shimmer-text text-[14px] italic tracking-normal md:text-[16px]">
                Currently designing, writing, running, and trying not to grow up.
              </p>
            </div>
          </div>

          {/* ---------- Sections ---------- */}
          <div className="flex flex-col gap-20 md:gap-[100px]">
            {/* MY WORK */}
            <section className="flex flex-col gap-5">
              <SectionLabel>My Work</SectionLabel>
              <Reveal stagger className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {PROJECTS.map((w) => (
                  <WorkCard key={w.slug} work={w} />
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
                  <ListRow key={item.title} item={item} />
                ))}
              </Reveal>
            </section>

            {/* SIDE QUEST */}
            <section className="flex flex-col gap-5">
              <SectionLabel>Side Quest</SectionLabel>
              <Reveal stagger className="flex flex-col gap-[18px]">
                {SIDE_QUEST.map((item) => (
                  <ListRow key={item.title} item={item} size="lg" />
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
                  <ListRow key={item.title} item={item} />
                ))}
              </Reveal>
            </section>
          </div>
        </div>

        {/* ---------- Footer ---------- */}
        <footer className="mt-24 flex flex-col gap-5 text-[16px] tracking-normal sm:flex-row sm:items-center sm:justify-between md:mt-40">
          <p className="font-medium text-cream">&copy; 2026 Thecreativemena</p>
          <nav className="flex items-center gap-[30px] text-muted-2">
            <a href="#" className="transition-colors hover:text-cream">
              Resume
            </a>
            <a
              href="https://www.linkedin.com/in/thecreativemena/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-cream"
            >
              Linkedin
            </a>
            <a
              href="https://x.com/Thecreativemena"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-cream"
            >
              Twitter (X)
            </a>
          </nav>
        </footer>
      </div>
    </main>
  );
}
