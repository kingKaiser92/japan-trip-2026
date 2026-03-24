import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200",
          height: "630",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #1c1b1b 0%, #000000 100%)",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Subtle pattern overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05,
            background: "repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 20px)",
          }}
        />

        {/* Cherry blossom accent line */}
        <div
          style={{
            width: "60px",
            height: "3px",
            background: "#FFB7C5",
            marginBottom: "30px",
            borderRadius: "2px",
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-2px",
            marginBottom: "16px",
          }}
        >
          Japan 2026
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "24px",
            color: "rgba(255,255,255,0.6)",
            letterSpacing: "6px",
            textTransform: "uppercase",
            marginBottom: "40px",
          }}
        >
          April 11 – 23
        </div>

        {/* Leg icons */}
        <div
          style={{
            display: "flex",
            gap: "32px",
            fontSize: "36px",
          }}
        >
          <span>🗼</span>
          <span>🏎️</span>
          <span>⛩️</span>
          <span>💫</span>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            fontSize: "14px",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "4px",
            textTransform: "uppercase",
          }}
        >
          Tokyo · Fuji · Kyoto · Osaka
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
