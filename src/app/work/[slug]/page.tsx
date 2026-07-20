import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/reveal";
import { Grain } from "@/components/grain";
import { EscapeHome } from "@/components/escape-home";
import {
  PROJECTS,
  getNextProject,
  getProjectBySlug,
  type ProjectBlock,
} from "@/data/projects";

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
  return {
    title: `${project.title} — Mena`,
    description: project.description || undefined,
  };
}

/* Corner "back" arrow drawn with currentColor so it inherits the link's text
   color and brightens with it on hover. */
function ArrowBack() {
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
        d="M9 5 4 10l5 5M4 10h9a7 7 0 0 1 7 7v2"
        stroke="currentColor"
        strokeWidth="1.5"
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
function Block({ block }: { block: ProjectBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="mt-28 mb-6 text-[28px] font-bold leading-tight tracking-[0.01em] text-cream first:mt-0 md:text-[32px]">
          {block.text}
        </h2>
      );
    case "text":
      return (
        <p className="mb-6 text-[18px] leading-[1.7] tracking-[0.03em] text-muted md:text-[20px]">
          {block.body}
        </p>
      );
    case "list": {
      const cls =
        "mb-6 flex flex-col gap-3.5 pl-6 text-[18px] leading-[1.7] tracking-[0.03em] text-muted marker:text-label md:text-[20px]";
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
    case "image":
      return (
        <Reveal className="my-12 overflow-hidden rounded-[24px] bg-surface">
          <img
            src={block.src}
            alt={block.alt ?? ""}
            loading="lazy"
            className={`w-full ${block.contain ? "object-contain" : "object-cover"}`}
          />
        </Reveal>
      );
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

  return (
    <main className="relative min-h-screen bg-bg [zoom:0.8]">
      <Grain />
      <EscapeHome />

      {/* Top nav — pinned so "Go back home" / "Next project" stay reachable
          while scrolling the case study. Esc also returns home. */}
      <div className="sticky top-0 z-20 border-b border-white/5 bg-bg/70 backdrop-blur-md">
        <nav className="mx-auto flex w-full max-w-[900px] items-center justify-between px-6 py-5 text-[15px] font-medium uppercase tracking-[0.18em] text-label md:px-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-colors hover:text-cream"
          >
            <ArrowBack />
            Go back home
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

      <div className="relative z-10 mx-auto w-full max-w-[900px] px-6 pb-16 pt-16 md:px-8 md:pb-[72px] md:pt-20">
        {/* Header */}
        <header className="flex flex-col gap-6">
          <h1 className="text-[32px] font-bold leading-tight tracking-[0.01em] text-cream md:text-[40px]">
            {project.headline ?? project.title}
          </h1>
          {project.description && (
            <p className="text-[18px] leading-[1.6] tracking-[0.03em] text-muted md:text-[20px]">
              {project.description}
            </p>
          )}
          {project.visitUrl && (
            <a
              href={project.visitUrl}
              target="_blank"
              rel="noreferrer"
              className="group mt-2 flex w-fit items-center gap-1.5 text-[20px] tracking-[0.03em] text-cream"
            >
              Visit link
              <img
                src="/images/icon-arrow-diag.svg"
                alt=""
                aria-hidden
                className="size-5 rotate-90 transition-transform group-hover:translate-x-0.5"
              />
            </a>
          )}
        </header>

        {/* Hero */}
        {project.hero && (
          <div className="mt-16 overflow-hidden rounded-[28px]">
            <img
              src={project.hero}
              alt={`${project.title} — hero`}
              className="w-full object-cover"
            />
          </div>
        )}

        {/* Meta table */}
        {project.meta && project.meta.length > 0 && (
          <dl className="mt-16">
            {project.meta.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-4 border-b border-white/10 py-4 text-[18px] tracking-[0.03em] md:text-[20px]"
              >
                <dt className="text-muted">{row.label}</dt>
                <dd className="text-right text-cream-dim">{row.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {/* Body */}
        {project.content.length > 0 && (
          <div className="mt-24">
            {project.content.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-[120px] flex flex-col gap-6 text-[20px] tracking-[0.03em] sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium text-cream">&copy; 2026 Thecreativemena</p>
          <nav className="flex items-center gap-[38px] text-muted-2">
            <a href="#" className="hover:text-cream">
              Writing
            </a>
            <a href="#" className="hover:text-cream">
              Linkedin
            </a>
            <a href="#" className="hover:text-cream">
              Twitter (X)
            </a>
          </nav>
        </footer>
      </div>
    </main>
  );
}
