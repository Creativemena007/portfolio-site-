import { ImageResponse } from "next/og";

// Home-page social share card (also used as the default Twitter image).
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
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#101010",
          padding: 88,
          color: "#fdfcf8",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 10,
            color: "#726f64",
          }}
        >
          PORTFOLIO
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 128, fontWeight: 700 }}>
            Mena
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 44,
              color: "#a0a09d",
              marginTop: 20,
              maxWidth: 920,
            }}
          >
            Designer, author, and a curious human.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#888888" }}>
          thecreativemena.com
        </div>
      </div>
    ),
    { ...size },
  );
}
