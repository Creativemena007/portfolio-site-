import { ImageResponse } from "next/og";

// Home-page social share card (also used as the default Twitter image).
// Intentionally imagery-free: a single "M" monogram, white on brand black.
export const alt = "Mena — Designer, author, and a curious human";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "#101010",
          color: "#fdfcf8",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 440,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: -12,
          }}
        >
          M
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 56,
            display: "flex",
            fontSize: 26,
            letterSpacing: 2,
            color: "#807e77",
          }}
        >
          thecreativemena.com
        </div>
      </div>
    ),
    { ...size },
  );
}
