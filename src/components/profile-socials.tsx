"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/*
  Avatar + social links.

  The socials stay tucked behind the avatar and slide out to the right. Uses a
  0fr→1fr grid track so the reveal animates width without a fixed magic number.

  - Mouse: hover the group to reveal (Tailwind's hover variants only apply on
    devices that can hover, so this never sticks on touch).
  - Touch (and click): the avatar is a button that toggles them open/closed.
  - Keyboard: tabbing into the group reveals them (focus-visible, not plain
    focus — a tap focuses the button too, which would stop it toggling shut).
  - Drag: pull the avatar to the right and let go to bring the socials out
    (push it left to tuck them away). It follows the pointer 1:1 with
    rubber-band resistance, then springs home. The direction matches the way
    the links travel, so the gesture needs no explanation.

  On load the socials introduce themselves: they slide out once, hold for a
  moment, then tuck back behind the avatar — showing where they live and how
  they move before anyone has to guess. The peek is skipped under reduced
  motion and cancelled the moment the visitor interacts.

  After that, the avatar bounces on a loop to invite that first interaction (see
  `.avatar-bounce` in globals.css). Once the visitor has opened the socials the
  invitation has done its job, so the bounce stops for good.
*/

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

// The further you pull, the less it follows — real things resist before they
// stop. `limit` is roughly the furthest the avatar can travel.
function rubberBand(distance: number, limit: number) {
  const c = 0.55;
  return (distance * limit * c) / (limit + c * Math.abs(distance));
}

const PEEK_DELAY = 900; // ms after load before the socials slide out
const PEEK_HOLD = 1700; // ms they stay out before tucking back in

const OPEN_DISTANCE = 36; // px pulled right to open
const CLOSE_DISTANCE = 24; // px pushed left to close
const FLICK_VELOCITY = 0.45; // px/ms — a quick flick counts even if short

export function ProfileSocials() {
  const [open, setOpen] = useState(false);
  const [engaged, setEngaged] = useState(false);
  // One-time introduction on load. Kept separate from `open` so the peek
  // never changes what the button reports to assistive tech.
  const [peek, setPeek] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Wait for the header's entrance to settle, then out → hold → back in.
    const show = window.setTimeout(() => setPeek(true), PEEK_DELAY);
    const hide = window.setTimeout(() => setPeek(false), PEEK_DELAY + PEEK_HOLD);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  // Any interaction ends the introduction early.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- derived reset: the visitor took over, so the scripted peek stops
    if (engaged) setPeek(false);
  }, [engaged]);

  // Drag bookkeeping lives in a ref and writes `transform` straight to the
  // button: no re-render per pointer move.
  const drag = useRef({
    active: false,
    moved: false,
    startX: 0,
    dx: 0,
    lastX: 0,
    lastT: 0,
    velocity: 0,
  });

  function onPointerDown(e: React.PointerEvent<HTMLButtonElement>) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const d = drag.current;
    d.active = true;
    d.moved = false;
    d.startX = d.lastX = e.clientX;
    d.lastT = e.timeStamp;
    d.dx = d.velocity = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
    // Tracking is instant — no transition while the finger is down.
    e.currentTarget.style.transition = "none";
    setEngaged(true);
  }

  function onPointerMove(e: React.PointerEvent<HTMLButtonElement>) {
    const d = drag.current;
    if (!d.active) return;
    d.dx = e.clientX - d.startX;
    if (Math.abs(d.dx) > 4) d.moved = true;
    const dt = e.timeStamp - d.lastT;
    if (dt > 0) d.velocity = (e.clientX - d.lastX) / dt;
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
    // Generous to the right (toward the links), stiff to the left.
    const x = rubberBand(d.dx, d.dx > 0 ? 120 : 28);
    e.currentTarget.style.transform = `translateX(${x.toFixed(1)}px)`;
  }

  function onPointerEnd(e: React.PointerEvent<HTMLButtonElement>) {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // Spring home. The slight overshoot is earned: the avatar was thrown.
    e.currentTarget.style.transition = reduce
      ? "transform 150ms ease-out"
      : "transform 520ms cubic-bezier(0.34, 1.45, 0.5, 1)";
    e.currentTarget.style.transform = "";
    if (!d.moved) return; // a plain tap — onClick toggles
    if (d.dx > OPEN_DISTANCE || d.velocity > FLICK_VELOCITY) setOpen(true);
    else if (d.dx < -CLOSE_DISTANCE || d.velocity < -FLICK_VELOCITY)
      setOpen(false);
  }

  return (
    <div
      data-open={open || peek}
      onMouseEnter={() => setEngaged(true)}
      className="enter enter-d1 group flex items-center gap-[10px]"
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="profile-socials"
        aria-label={open ? "Hide social links" : "Show social links"}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onClick={() => {
          // The click that ends a drag must not also toggle.
          if (drag.current.moved) {
            drag.current.moved = false;
            return;
          }
          setOpen((o) => !o);
          setEngaged(true);
        }}
        className="shrink-0 cursor-grab touch-pan-y select-none rounded-full outline-offset-4 [-webkit-tap-highlight-color:transparent] active:cursor-grabbing"
      >
        {/* The bounce lives on an inner wrapper so its transform never
            collides with the drag transform on the button. */}
        <span className={`block ${engaged ? "" : "avatar-bounce"}`}>
          <Image
            src="/images/profile.png"
            alt="Mena"
            width={84}
            height={84}
            priority
            draggable={false}
            className="size-[84px] rounded-full object-cover transition-transform duration-500 ease-out group-hover:rotate-[-8deg] group-hover:scale-105 group-data-[open=true]:rotate-[-8deg] group-data-[open=true]:scale-105 active:scale-95"
          />
        </span>
      </button>
      <div className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-500 ease-out group-hover:grid-cols-[1fr] group-has-[:focus-visible]:grid-cols-[1fr] group-data-[open=true]:grid-cols-[1fr]">
        <div
          id="profile-socials"
          className="flex min-w-0 items-center gap-1.5 overflow-hidden opacity-0 -translate-x-3 transition-[opacity,transform] duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-has-[:focus-visible]:translate-x-0 group-has-[:focus-visible]:opacity-100 group-data-[open=true]:translate-x-0 group-data-[open=true]:opacity-100"
        >
          {SOCIALS.map((s) => (
            <a
              key={s.icon}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="group/social flex size-[37px] shrink-0 items-center justify-center rounded-full bg-surface-2 transition-[background-color,transform] duration-200 ease-out hover:scale-105 hover:bg-white/[0.12] active:scale-95"
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
  );
}
