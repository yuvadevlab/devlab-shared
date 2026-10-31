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
        backgroundColor: "#0d0f17",
        backgroundImage:
          "radial-gradient(circle at 25px 25px, #1a1e2e 2%, transparent 0%), radial-gradient(circle at 75px 75px, #141724 2%, transparent 0%)",
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
            background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 16px rgba(99, 102, 241, 0.3)",
          }}
        >
          <span
            style={{
              color: "#ffffff",
              fontSize: "24px",
              fontWeight: "900",
            }}
          >
            DL
          </span>
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
            backgroundColor: "rgba(99, 102, 241, 0.15)",
            color: "#818cf8",
            border: "1px solid rgba(99, 102, 241, 0.3)",
            fontWeight: "600",
          }}
        >
          v1.1.0
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
        <span>56 Production Components</span>
        <span>•</span>
        <span>OrchestrAI &amp; FinAI Multi-Brand</span>
        <span>•</span>
        <span>Server Syntax Highlighting (Shiki)</span>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
