"use client";

import { Spark, useQuest } from "@/components/quest";
import { QUEST, QUEST_TOTAL, resetQuest } from "@/lib/quest";

/* Draft — the owner should rewrite this in his own words. */
const UNLOCK_NOTE =
  "You looked behind things, which is most of what design is. Thank you for taking the long way round. I'd love to hear which find was your favourite.";

const MAIL =
  "mailto:hello@thecreativemena.com?subject=" +
  encodeURIComponent("I finished the side quest");

export function Journal() {
  const found = useQuest();
  const count = found.length;
  const complete = count === QUEST_TOTAL;

  return (
    <div className="mt-12 flex flex-col gap-12">
      <header className="enter enter-d2 flex flex-col gap-4">
        <p className="text-[13px] font-medium uppercase leading-[1.5] tracking-[4.2px] text-label">
          Side Quest
        </p>
        <h1 className="text-[40px] font-medium leading-none tracking-[-0.03em] text-cream md:text-[56px]">
          Journal
        </h1>
        <p className="text-[16px] leading-[1.7] text-muted">
          {QUEST_TOTAL} things are hidden around this site, each marked with a
          small spark. Every one you find tells you something about me.
        </p>

        {/* The collection at a glance: one pip per item. */}
        <div className="mt-2 flex items-center gap-4">
          <div className="flex gap-2" aria-hidden>
            {QUEST.map((q) => (
              <Spark
                key={q.id}
                filled={found.includes(q.id)}
                className={`size-4 ${found.includes(q.id) ? "text-cream" : "text-label/70"}`}
              />
            ))}
          </div>
          <p className="text-[14px] tabular-nums text-muted-2">
            {count} of {QUEST_TOTAL} found
          </p>
        </div>
      </header>

      {complete && (
        <section className="journal-unlock enter enter-d3 flex flex-col gap-4 rounded-[20px] border border-white/10 bg-surface p-6 md:p-8">
          <p className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-cream-dim">
            <span className="size-[8px] rounded-full bg-accent shadow-[0_0_10px_rgb(245_132_4/0.6)]" />
            Unlocked
          </p>
          <h2 className="text-[26px] font-medium leading-[1.15] tracking-[-0.02em] text-cream md:text-[30px]">
            You found all {QUEST_TOTAL}.
          </h2>
          <p className="text-[16px] leading-[1.7] text-muted">{UNLOCK_NOTE}</p>
          <a
            href={MAIL}
            className="w-fit text-[16px] text-cream decoration-1 underline-offset-4 hover:underline"
          >
            Write to me →
          </a>
        </section>
      )}

      <ol className="enter enter-d3 flex flex-col">
        {QUEST.map((q, i) => {
          const has = found.includes(q.id);
          return (
            <li
              key={q.id}
              className="grid grid-cols-[28px_1fr] gap-x-4 gap-y-2 border-t border-white/[0.07] py-6"
            >
              <span className="pt-[3px] text-[13px] tabular-nums text-label">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-2">
                <h3
                  className={`flex items-center gap-2 text-[18px] font-medium tracking-[-0.01em] ${has ? "text-cream" : "text-muted-2"}`}
                >
                  <Spark
                    filled={has}
                    className={`size-3 shrink-0 ${has ? "text-cream" : "text-label"}`}
                  />
                  {has ? q.name : "Not found yet"}
                </h3>
                <p
                  className={`text-[15px] leading-[1.7] ${has ? "text-muted" : "italic text-muted-2"}`}
                >
                  {has ? q.story : q.hint}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      {count > 0 && (
        <button
          type="button"
          onClick={() => {
            if (window.confirm("Clear everything you've found and start again?"))
              resetQuest();
          }}
          className="w-fit text-[14px] text-muted-2 transition-colors hover:text-cream"
        >
          Start over
        </button>
      )}
    </div>
  );
}
