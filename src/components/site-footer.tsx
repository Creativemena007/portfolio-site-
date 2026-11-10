/*
  Shared footer for the home page and the case-study pages.
  The year is read at build time (the site is fully static), so it rolls over
  on the first deploy of a new year.
*/

const LINKS = [
  {
    label: "Resume",
    href: "https://github.com/user-attachments/files/24366703/MENA.CV.2026.pdf",
  },
  { label: "Linkedin", href: "https://www.linkedin.com/in/thecreativemena/" },
  { label: "Twitter (X)", href: "https://x.com/Thecreativemena" },
];

export function SiteFooter({ className = "" }: { className?: string }) {
  return (
    <footer
      className={`mt-24 flex flex-col gap-5 text-[16px] tracking-normal sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      <p className="font-medium text-cream">
        &copy; {new Date().getFullYear()} Thecreativemena
      </p>
      <nav className="flex items-center gap-[30px] text-muted-2">
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-cream"
          >
            {l.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
