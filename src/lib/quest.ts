/*
  Side Quest: seven things hidden around the site. Finding one adds it to the
  visitor's Journal (/journal) and tells a short story about Mena.

  Progress lives in this browser's localStorage, so there are no accounts and
  nothing leaves the device. The standalone pages in public/ (bookshelf,
  life-away) share the same key through public/quest.js — keep the ids, names
  and TOTAL there in step with this list.
*/

export type QuestEntry = {
  id: string;
  name: string;
  /* Shown in the Journal before it's found: where to look, never exactly. */
  hint: string;
  /* Shown once found. Drafts written from the site's own content — the owner
     should review the voice. */
  story: string;
};

export const QUEST: QuestEntry[] = [
  {
    id: "spark",
    name: "The Spark",
    hint: "The home page has a section named after this game.",
    story:
      "That section is called Side Quest because everything in it is something nobody asked me to do: a book, a room where adults can play, long runs. They are also the things that taught me the most.",
  },
  {
    id: "pull",
    name: "The Pull",
    hint: "Some things on the home page move if you pull them.",
    story:
      "My avatar hides my social links. Hardly anyone found them, so now they peek out once when the page loads, and you can drag the avatar to bring them back. You just did.",
  },
  {
    id: "ending",
    name: "The Last Page",
    hint: "Read a case study all the way to the end.",
    story:
      "Each case study ends with what happened after the work shipped. A design isn't finished when it's handed over; it's finished when people use it.",
  },
  {
    id: "echo",
    name: "The Echo",
    hint: "It's in the essay about an idea that came too early.",
    story:
      "I designed Echo in 2024, before the tools it needed existed. Two years later the same idea came back as Council and Debate. Sometimes being early just means waiting.",
  },
  {
    id: "lost",
    name: "The Wrong Turn",
    hint: "Go somewhere that doesn't exist.",
    story:
      "You found a page that isn't there. Plenty of good things start as a wrong turn.",
  },
  {
    id: "shelf",
    name: "The Bookmark",
    hint: "Look along the shelf.",
    story:
      "These are the books I keep coming back to. Reading them is part of how I ended up writing my own, Don't Grow Up.",
  },
  {
    id: "run",
    name: "The Long Run",
    hint: "Somewhere away from the screen.",
    story:
      "I run unreasonable distances. A lot of design problems quietly solve themselves somewhere around the halfway point.",
  },
];

export const QUEST_TOTAL = QUEST.length;

const KEY = "mena:side-quest";
const EVENT = "quest:change";

/* Raw stored value; kept as a string so it is a stable snapshot for
   useSyncExternalStore. */
export function readRaw(): string {
  try {
    return localStorage.getItem(KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

export function parse(raw: string): string[] {
  try {
    const ids = JSON.parse(raw);
    return Array.isArray(ids)
      ? ids.filter((id) => QUEST.some((q) => q.id === id))
      : [];
  } catch {
    return [];
  }
}

/* Adds an item. Returns true only the first time it's found. */
export function collect(id: string): boolean {
  const found = parse(readRaw());
  if (found.includes(id)) return false;
  try {
    localStorage.setItem(KEY, JSON.stringify([...found, id]));
  } catch {
    // Storage blocked (private mode): the find still shows, it just won't stick.
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { id, fresh: true } }));
  return true;
}

export function resetQuest() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
  window.dispatchEvent(new CustomEvent(EVENT, { detail: {} }));
}

export function subscribe(onChange: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) onChange();
  };
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export const QUEST_EVENT = EVENT;
