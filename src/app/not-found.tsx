import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center">
      <div className="mx-auto flex w-full max-w-[888px] flex-col gap-6 px-5 md:px-6">
        <p className="enter enter-d1 text-[13px] font-medium uppercase leading-[1.5] tracking-[4.2px] text-label">
          404
        </p>
        <h1 className="enter enter-d2 text-[22px] font-medium leading-[1.3] tracking-[-0.015em] text-cream-dim md:text-[26px]">
          This page doesn&rsquo;t exist.
        </h1>
        <Link
          href="/"
          className="enter enter-d3 w-fit text-[16px] tracking-normal text-cream decoration-1 underline-offset-4 hover:underline"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
