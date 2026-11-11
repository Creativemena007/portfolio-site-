"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  QUEST,
  QUEST_EVENT,
  QUEST_TOTAL,
  collect,
  parse,
  readRaw,
  subscribe,
} from "@/lib/quest";

/*
  Side Quest UI.

  - <QuestItem id>: the collectible. Every hidden thing on the site uses the
    same small four-point spark, so once you've found one you recognise the
    rest. Dim at rest, it brightens and turns under a mouse; tap to collect.
  - <QuestHud>: the counter, bottom-left on every page. It doesn't exist
    until the first find, so visitors who never play never see it. On a find
    it opens for a moment to name what you found, then settles back to "2/7".
    It links to the Journal.
*/

/* Ids found so far. The server (and first client render) see none. */
export function useQuest() {
  const raw = useSyncExternalStore(subscribe, readRaw, () => "[]");
  return useMemo(() => parse(raw), [raw]);
}

export function Spark({
  filled = false,
  className = "",
}: {
  filled?: boolean;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        d="M12 2.5c.7 5.2 2.8 7.6 9.5 9.5-6.7 1.9-8.8 4.3-9.5 9.5-.7-5.2-2.8-7.6-9.5-9.5 6.7-1.9 8.8-4.3 9.5-9.5Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={filled ? 0 : 1.6}
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* For finds that happen through a gesture rather than a tap. */
export { collect as collectQuest };

export function QuestItem({
  id,
  className = "",
}: {
  id: string;
  className?: string;
}) {
  const found = useQuest().includes(id);
  const [pop, setPop] = useState(false);
  const [twinkle, setTwinkle] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const entry = QUEST.find((q) => q.id === id);

  // The first time an unfound spark comes into view, it twinkles once so the
  // eye catches it. Once per page view; CSS skips it under reduced motion.
  useEffect(() => {
    const el = ref.current;
    if (!el || found) return;
    let timer: number | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        timer = window.setTimeout(() => setTwinkle(true), 350);
      },
      { threshold: 1 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, [found]);

  if (!entry) return null;

  return (
    <button
      type="button"
      data-found={found}
      data-pop={pop}
      data-twinkle={twinkle && !pop}
      ref={ref}
      aria-label={
        found ? `${entry.name}, already in your journal` : "Something hidden. Collect it"
      }
      onClick={() => {
        if (collect(id)) {
          setPop(true);
        } else {
          // Already found: remind them where it went.
          window.dispatchEvent(
            new CustomEvent(QUEST_EVENT, { detail: { id, fresh: false } }),
          );
        }
      }}
      onAnimationEnd={() => {
        setPop(false);
        setTwinkle(false);
      }}
      className={`quest-item ${className}`}
    >
      <Spark filled={found} />
    </button>
  );
}

type Flash = { text: string; key: number };

export function QuestHud() {
  const found = useQuest();
  const pathname = usePathname();
  const [flash, setFlash] = useState<Flash | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let timer: number | undefined;
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<{ id?: string; fresh?: boolean }>)
        .detail;
      const entry = QUEST.find((q) => q.id === detail?.id);
      if (!entry) return;
      const count = parse(readRaw()).length;
      const text = !detail.fresh
        ? `${entry.name} is in your journal`
        : count === QUEST_TOTAL
          ? `All ${QUEST_TOTAL} found. Open your journal`
          : `Found ${entry.name}`;
      setMessage(text);
      setFlash({ text, key: Date.now() });
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setFlash(null), 3200);
    };
    window.addEventListener(QUEST_EVENT, onChange);
    return () => {
      window.removeEventListener(QUEST_EVENT, onChange);
      window.clearTimeout(timer);
    };
  }, []);

  if (pathname === "/journal" || found.length === 0) return null;

  return (
    <div className="quest-hud-wrap">
      <Link
        href="/journal"
        className="quest-hud"
        data-flash={flash !== null}
        aria-label={`Side quest: ${found.length} of ${QUEST_TOTAL} found. Open your journal`}
      >
        <Spark filled className="size-3 shrink-0 text-cream" />
        <span className="tabular-nums">
          {found.length}/{QUEST_TOTAL}
        </span>
        <span className="quest-hud-msg" aria-hidden>
          <span>{message}</span>
        </span>
      </Link>
      <span role="status" className="sr-only">
        {flash?.text ?? ""}
      </span>
    </div>
  );
}
