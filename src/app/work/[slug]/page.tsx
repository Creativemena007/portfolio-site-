import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EscapeHome } from "@/components/escape-home";
import { QuestItem } from "@/components/quest";
import { CurrentSection, RevealAll } from "@/components/reading";
import { SiteFooter } from "@/components/site-footer";
import {
  PROJECTS,
  getNextProject,
  getPreviousProject,
  getProjectBySlug,
  type ProjectBlock,
} from "@/data/projects";
import { getImageMetaMap, type ImageMeta } from "@/lib/image-size";

/*
  Case-study page.

  Layout (styles live under `.cs` in globals.css):
  - Header: category, a large headline, the one-paragraph summary, visit link.
  - Hero steps out wide; the at-a-glance facts sit directly under it.
  - The body is grouped into numbered sections, one per top-level heading in
    the data, each with its own id. That gives the sticky bar a "you are here"
    label and the page a steady rhythm instead of one unbroken column.
  - Text keeps a 680px measure; images step out to 880px with their alt text
    shown as a caption.
  - Ends with previous / next project, so reading can continue either way.
*/

// Body images render up to 880px wide on desktop, viewport-width below.
const FIGURE_SIZES = "(max-width: 920px) 100vw, 880px";
const HERO_SIZES = "(max-width: 1120px) 100vw, 1080px";

/* Pre-render all four project pages at build time. */
export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const description =
    project.description || `${project.title} — a case study by Mena.`;
  const url = `/work/${slug}`;
  // Prefer the case-study hero; fall back to the home-grid thumbnail.
  const ogImage = project.hero ?? `/images/${project.img}.png`;
  const ogTitle = `${project.title} — Mena`;

  return {
    // The root title template renders this as "<title> — Mena".
    title: project.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: ogTitle,
      description,
      url,
      images: [{ url: ogImage, alt: ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImage],
    },
  };
}

/* Corner "back" arrow drawn with currentColor so it inherits the link's text
   color and brightens with it on hover. */
function ArrowBack() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 256 256"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <polyline
        points="136 96 88 48 40 96"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="232 192 88 192 88 48"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M13.5 5.5 20 12l-6.5 6.5M20 12H4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* --------------------------- Sections ---------------------------------- */

type Section = {
  /** Anchor id; undefined for blocks that come before the first heading. */
  id?: string;
  title?: string;
  blocks: ProjectBlock[];
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/* Split the flat block list into sections at each top-level heading. */
function toSections(content: ProjectBlock[]): Section[] {
  const sections: Section[] = [];
  const seen = new Map<string, number>();
  for (const block of content) {
    if (block.type === "heading" && (block.level ?? 1) === 1) {
      const base = slugify(block.text) || "section";
      const n = seen.get(base) ?? 0;
      seen.set(base, n + 1);
      sections.push({
        id: n ? `${base}-${n + 1}` : base,
        title: block.text,
        blocks: [],
      });
    } else {
      if (sections.length === 0) sections.push({ blocks: [] });
      sections[sections.length - 1].blocks.push(block);
    }
  }
  return sections;
}

function Block({
  block,
  meta,
}: {
  block: ProjectBlock;
  meta: Record<string, ImageMeta>;
}) {
  switch (block.type) {
    case "heading":
      // Level 1 is the section title (rendered by the section). Level 2 is a
      // sub-heading; level 3 a small uppercase step label.
      return block.level === 3 ? (
        <h4 className="cs-step">{block.text}</h4>
      ) : (
        <h3 className="cs-sub">{block.text}</h3>
      );
    case "text":
      return <p>{block.body}</p>;
    case "list": {
      const items = block.items.map((item, i) => <li key={i}>{item}</li>);
      return block.ordered ? <ol>{items}</ol> : <ul>{items}</ul>;
    }
    case "quote":
      return <blockquote className="cs-quote reveal">{block.text}</blockquote>;
    case "stats":
      return (
        <dl className="cs-stats reveal">
          {block.items.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      );
    case "image": {
      const m = meta[block.src];
      return (
        <figure className={`cs-fig reveal ${block.light ? "is-light" : ""}`}>
          <div className="cs-fig-frame">
            <Image
              src={block.src}
              alt={block.alt ?? ""}
              width={m?.width ?? 1600}
              height={m?.height ?? 1000}
              sizes={FIGURE_SIZES}
              placeholder={m?.blurDataURL ? "blur" : undefined}
              blurDataURL={m?.blurDataURL}
            />
          </div>
          {/* The alt text doubles as a visible caption; hidden from screen
              readers here because the image already announces it. */}
          {block.alt && <figcaption aria-hidden>{block.alt}</figcaption>}
        </figure>
      );
    }
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const next = getNextProject(slug);
  const previous = getPreviousProject(slug);

  // Resolve intrinsic dimensions for every image on the page (hero + body) so
  // next/image can reserve space and build responsive srcsets.
  const imageSrcs = [
    ...(project.hero ? [project.hero] : []),
    ...project.content.flatMap((b) => (b.type === "image" ? [b.src] : [])),
  ];
  const meta = await getImageMetaMap(imageSrcs);

  // Number the titled sections 01, 02, … (blocks before the first heading
  // form an untitled intro and take no number).
  let count = 0;
  const sections = toSections(project.content).map((section) => ({
    ...section,
    number: section.title ? String(++count).padStart(2, "0") : undefined,
  }));

  return (
    <main className="relative min-h-screen">
      <EscapeHome />
      <RevealAll scope=".cs" />

      {/* Top bar — pinned so navigation stays reachable while scrolling. The
          middle shows the section being read; Esc also returns home. */}
      <div className="sticky top-0 z-20 border-b border-hairline bg-bg/70 backdrop-blur-md">
        <nav className="mx-auto flex w-full max-w-[880px] items-center justify-between gap-6 px-5 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-label md:px-6">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 transition-colors hover:text-cream"
          >
            <ArrowBack />
            Home
          </Link>
          <CurrentSection
            scope=".cs"
            idle={project.title}
            className="hidden flex-1 text-center sm:block"
          />
          <Link
            href={`/work/${next.slug}`}
            className="flex shrink-0 items-center gap-2.5 transition-colors hover:text-cream"
          >
            Next project
            <ArrowRight />
          </Link>
        </nav>
        <div className="read-progress" aria-hidden />
      </div>

      <article
        id="top"
        className="cs relative z-10 px-5 pt-[52px] md:px-6 md:pt-16"
      >
        <header className="cs-head enter enter-d1">
          <p className="eyebrow">{project.category} · Case study</p>
          <h1>{project.headline ?? project.title}</h1>
          {project.description && (
            <p className="cs-lede">{project.description}</p>
          )}
          {project.visitUrl && (
            <a
              href={project.visitUrl}
              target="_blank"
              rel="noreferrer"
              className="cs-visit group"
            >
              Visit link
              <img
                src="/images/icon-arrow-diag.svg"
                alt=""
                aria-hidden
                className="size-4 rotate-90 transition-transform group-hover:translate-x-0.5"
              />
            </a>
          )}
        </header>

        {project.hero && (
          <div className="cs-hero enter enter-d2">
            <Image
              src={project.hero}
              alt={`${project.title} — hero`}
              width={meta[project.hero]?.width ?? 1600}
              height={meta[project.hero]?.height ?? 1000}
              sizes={HERO_SIZES}
              placeholder={meta[project.hero]?.blurDataURL ? "blur" : undefined}
              blurDataURL={meta[project.hero]?.blurDataURL}
              priority
            />
          </div>
        )}

        {project.meta && project.meta.length > 0 && (
          <dl className="cs-meta enter enter-d3">
            {project.meta.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {sections.map((section, i) => {
          const blocks = section.blocks.map((block, j) => (
            <Block key={j} block={block} meta={meta} />
          ));
          // Blocks before the first heading have no title of their own.
          if (!section.title) {
            return (
              <div key={i} className="cs-intro">
                {blocks}
              </div>
            );
          }
          return (
            <section key={section.id} id={section.id}>
              <div className="cs-sechead">
                <span className="eyebrow">{section.number}</span>
                <h2>{section.title}</h2>
              </div>
              {blocks}
            </section>
          );
        })}

        {/* Keep reading: either direction. */}
        <nav className="cs-more" aria-label="More case studies">
          <Link href={`/work/${previous.slug}`}>
            <span className="eyebrow">Previous</span>
            <span className="cs-more-title">{previous.title}</span>
          </Link>
          <Link href={`/work/${next.slug}`} className="is-next">
            <span className="eyebrow">Next</span>
            <span className="cs-more-title">{next.title}</span>
          </Link>
        </nav>

        {/* End mark. Reading to the end finds one of the Side Quest items. */}
        <div className="cs-endmark">
          <QuestItem id="ending" />
        </div>
      </article>

      {/* The shared footer sits outside `.cs` so the case-study text styles
          don't restyle it. */}
      <div className="relative z-10 px-5 pb-[52px] md:px-6 md:pb-[58px]">
        <div className="mx-auto max-w-[880px]">
          <SiteFooter />
        </div>
      </div>
    </main>
  );
}
