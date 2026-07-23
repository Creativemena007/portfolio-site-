import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/reveal";
import { EscapeHome } from "@/components/escape-home";
import {
  PROJECTS,
  getNextProject,
  getProjectBySlug,
  type ProjectBlock,
} from "@/data/projects";
import { getDimensionsMap, type ImageDimensions } from "@/lib/image-size";

// Full-width case-study images render at 720px on desktop, viewport-width below.
const CASE_STUDY_SIZES = "(max-width: 768px) 100vw, 720px";

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

/* Per-block spacing lives here so headings hug the text beneath them while a
   generous gap opens before each new section. */
function Block({
  block,
  dims,
}: {
  block: ProjectBlock;
  dims: Record<string, ImageDimensions>;
}) {
  switch (block.type) {
    case "heading": {
      // Three tiers build the case-study hierarchy so nested content reads as
      // nested: L1 = major section (large, bold, generous space above),
      // L2 = subsection (medium, semibold), L3 = step (small uppercase eyebrow).
      const level = block.level ?? 1;
      if (level === 2) {
        return (
          <h3 className="mt-14 mb-4 text-[18px] font-semibold leading-[1.3] tracking-[-0.005em] text-cream md:text-[20px]">
            {block.text}
          </h3>
        );
      }
      if (level === 3) {
        return (
          <h4 className="mt-10 mb-3 text-[13px] font-semibold uppercase leading-[1.4] tracking-[0.12em] text-cream-dim">
            {block.text}
          </h4>
        );
      }
      return (
        <h2 className="mt-[90px] mb-5 text-[22px] font-bold leading-[1.15] tracking-[-0.01em] text-cream first:mt-0 md:text-[26px]">
          {block.text}
        </h2>
      );
    }
    case "text":
      return (
        <p className="mb-5 text-[15px] leading-[1.7] tracking-normal text-muted md:text-[16px]">
          {block.body}
        </p>
      );
    case "list": {
      const cls =
        "mb-5 flex flex-col gap-3 pl-5 text-[15px] leading-[1.7] tracking-normal text-muted marker:text-label md:text-[16px]";
      return block.ordered ? (
        <ol className={`list-decimal ${cls}`}>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul className={`list-disc ${cls}`}>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    }
    case "image": {
      const { width, height } = dims[block.src] ?? { width: 1600, height: 1000 };
      return (
        <Reveal
          className={`my-10 overflow-hidden rounded-[20px] ${
            block.light ? "bg-white p-4 md:p-6" : "bg-surface"
          }`}
        >
          <Image
            src={block.src}
            alt={block.alt ?? ""}
            width={width}
            height={height}
            sizes={CASE_STUDY_SIZES}
            className="h-auto w-full"
          />
        </Reveal>
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

  // Resolve intrinsic dimensions for every image on the page (hero + body) so
  // next/image can reserve space and build responsive srcsets.
  const imageSrcs = [
    ...(project.hero ? [project.hero] : []),
    ...project.content.flatMap((b) => (b.type === "image" ? [b.src] : [])),
  ];
  const dims = await getDimensionsMap(imageSrcs);

  return (
    <main className="relative min-h-screen">
      <EscapeHome />

      {/* Top nav — pinned so "Go back home" / "Next project" stay reachable
          while scrolling the case study. Esc also returns home. */}
      <div className="sticky top-0 z-20 border-b border-white/5 bg-bg/70 backdrop-blur-md">
        <nav className="mx-auto flex w-full max-w-[720px] items-center justify-between px-5 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-label md:px-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-colors hover:text-cream"
          >
            <ArrowBack />
            Home
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="flex items-center gap-2.5 transition-colors hover:text-cream"
          >
            Next project
            <ArrowRight />
          </Link>
        </nav>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[720px] px-5 pb-[52px] pt-[52px] md:px-6 md:pb-[58px] md:pt-16">
        {/* Header */}
        <header className="enter enter-d1 flex flex-col gap-5">
          <h1 className="text-[26px] font-bold leading-[1.1] tracking-[-0.015em] text-cream md:text-[32px]">
            {project.headline ?? project.title}
          </h1>
          {project.description && (
            <p className="text-[15px] leading-[1.6] tracking-normal text-muted md:text-[16px]">
              {project.description}
            </p>
          )}
          {project.visitUrl && (
            <a
              href={project.visitUrl}
              target="_blank"
              rel="noreferrer"
              className="group mt-2 flex w-fit items-center gap-1.5 text-[16px] tracking-normal text-cream"
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

        {/* Hero */}
        {project.hero && (
          <div className="enter enter-d2 mt-[52px] overflow-hidden rounded-[22px]">
            <Image
              src={project.hero}
              alt={`${project.title} — hero`}
              width={dims[project.hero]?.width ?? 1600}
              height={dims[project.hero]?.height ?? 1000}
              sizes={CASE_STUDY_SIZES}
              priority
              className="h-auto w-full"
            />
          </div>
        )}

        {/* Meta table */}
        {project.meta && project.meta.length > 0 && (
          <dl className="mt-[52px]">
            {project.meta.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-4 border-b border-white/10 py-3.5 text-[15px] tracking-normal md:text-[16px]"
              >
                <dt className="text-muted">{row.label}</dt>
                <dd className="text-right text-cream-dim">{row.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {/* Body */}
        {project.content.length > 0 && (
          <div className="mt-20">
            {project.content.map((block, i) => (
              <Block key={i} block={block} dims={dims} />
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-24 flex flex-col gap-5 text-[16px] tracking-normal sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium text-cream">&copy; 2026 Thecreativemena</p>
          <nav className="flex items-center gap-[30px] text-muted-2">
            <a
              href="https://github.com/user-attachments/files/24366703/MENA.CV.2026.pdf"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cream"
            >
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
