/*
  Route-level crossfade. Unlike layout.tsx, a template re-mounts on every
  navigation, so the `.route-fade` CSS entrance replays each time — softening
  the hard document swap between the home page and the project pages into a
  quick opacity crossfade. Opacity-only (no transform) so it never disturbs the
  sticky nav on project pages, and so it layers cleanly under the per-element
  `.enter` stagger rather than fighting it. Reduced-motion users get no fade:
  the `.route-fade` rule lives inside a prefers-reduced-motion:no-preference
  block in globals.css.
*/
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-fade">{children}</div>;
}
