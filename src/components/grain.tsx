/*
  Full-bleed background grain. Tiles a uniform-noise texture across the entire
  page (full width and full scroll height) under a color-burn blend, so it sits
  quietly behind the near-black background. Shared by the home page and the
  project detail pages so they stay visually identical.
*/
export function Grain() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 mix-blend-color-burn"
      style={{
        backgroundImage: "url('/images/bg-texture.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "1512px 1512px",
        backgroundPosition: "top center",
      }}
    />
  );
}
