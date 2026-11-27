/**
 * @file apps/ui-docs/src/app/apple-icon.tsx
 * @description Dynamic Apple Touch Icon for DevLab UI documentation.
 * Generates a 180×180 icon using Next.js ImageResponse showing the BookOpenText icon on the default brand background.
 * @module @yuva-devlab/ui-docs/app
 */

import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

/**
 * Generates the Apple Touch Icon for DevLab UI documentation.
 * Uses the BookOpenText icon matching the app header logo, favicon, and OG image.
 */
export default function Icon(): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0e1118 0%, #131c28 100%)",
        borderRadius: "36px",
        border: "2px solid rgba(56, 196, 212, 0.4)",
      }}
    >
      <div
        style={{
          width: "108px",
          height: "108px",
          borderRadius: "24px",
          background: "linear-gradient(135deg, #38c4d4 0%, #0d8a9e 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 24px rgba(56, 196, 212, 0.4)",
        }}
      >
        <svg
          width="64"
          height="64"
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
    </div>,
    {
      ...size,
    },
  );
}
