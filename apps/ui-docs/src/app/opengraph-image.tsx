import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "DevLab UI — Enterprise Design System";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

/**
 * Dynamic Open Graph Social Preview card generated dynamically via @vercel/og / next/og.
 */
export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        backgroundColor: "#0e1118",
        backgroundImage:
          "radial-gradient(circle at 25px 25px, #161d29 2%, transparent 0%), radial-gradient(circle at 75px 75px, #121822 2%, transparent 0%)",
        backgroundSize: "100px 100px",
        padding: "80px",
        fontFamily: "system-ui, sans-serif",
        color: "#f8fafc",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #38c4d4 0%, #0d8a9e 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 16px rgba(56, 196, 212, 0.3)",
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v16" />
            <path d="M16 13h2" />
            <path d="M16 9h2" />
            <path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z" />
            <path d="M6 13h2" />
            <path d="M6 9h2" />
          </svg>
        </div>
        <span
          style={{
            fontSize: "28px",
            fontWeight: "700",
            letterSpacing: "-0.02em",
            color: "#e2e8f0",
          }}
        >
          DevLab UI
        </span>
        <span
          style={{
            fontSize: "14px",
            padding: "4px 10px",
            borderRadius: "9999px",
            backgroundColor: "rgba(56, 196, 212, 0.15)",
            color: "#38c4d4",
            border: "1px solid rgba(56, 196, 212, 0.3)",
            fontWeight: "600",
          }}
        >
          DESIGN SYSTEM
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <h1
          style={{
            fontSize: "56px",
            fontWeight: "800",
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            margin: 0,
            background: "linear-gradient(to right, #ffffff, #cbd5e1)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Enterprise Design System &amp; Primitives
        </h1>
        <p
          style={{
            fontSize: "24px",
            color: "#94a3b8",
            margin: 0,
            maxWidth: "900px",
            lineHeight: 1.4,
          }}
        >
          Pure CSS multi-brand styling, modular W3C Cascade Layers, accessible
          Radix primitives, and full SSR performance.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "32px",
          borderTop: "1px solid #1e293b",
          paddingTop: "32px",
          width: "100%",
          color: "#64748b",
          fontSize: "16px",
          fontWeight: "500",
        }}
      >
        <span>Production Components</span>
        <span>•</span>
        <span>Multi-Brand Theming</span>
        <span>•</span>
        <span>Server Syntax Highlighting (Shiki)</span>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
