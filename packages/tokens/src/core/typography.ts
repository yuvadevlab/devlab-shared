/**
 * @file src/core/typography.ts
 * @description Universal typographic hierarchy and scale definition.
 */

import type { BaseTypographyScale } from "../schema/tokens.schema";

/**
 * Standard typographic scale shared across all brands and applications.
 * Implements fluid intrinsic scaling via CSS clamp() across mobile and desktop viewports.
 */
export const BASE_TYPOGRAPHY_SCALE: BaseTypographyScale = {
  display: {
    fontFamily: "var(--font-display)",
    fontWeight: 800,
    fontSize: "clamp(2rem, 1.6rem + 1.8vw, 3rem)",
    lineHeight: 1.15,
    letterSpacing: "-0.03em",
  },
  h1: {
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "clamp(1.625rem, 1.35rem + 1.2vw, 2.25rem)",
    lineHeight: 1.2,
    letterSpacing: "-0.025em",
  },
  h2: {
    fontFamily: "var(--font-display)",
    fontWeight: 600,
    fontSize: "clamp(1.375rem, 1.15rem + 0.9vw, 1.75rem)",
    lineHeight: 1.25,
    letterSpacing: "-0.02em",
  },
  h3: {
    fontFamily: "var(--font-sans)",
    fontWeight: 600,
    fontSize: "clamp(1.125rem, 1rem + 0.5vw, 1.375rem)",
    lineHeight: 1.3,
    letterSpacing: "-0.015em",
  },
  h4: {
    fontFamily: "var(--font-sans)",
    fontWeight: 600,
    fontSize: "clamp(1rem, 0.92rem + 0.35vw, 1.125rem)",
    lineHeight: 1.35,
    letterSpacing: "-0.01em",
  },
  h5: {
    fontFamily: "var(--font-sans)",
    fontWeight: 500,
    fontSize: "clamp(0.9375rem, 0.88rem + 0.25vw, 1rem)",
    lineHeight: 1.4,
    letterSpacing: "-0.005em",
  },
  h6: {
    fontFamily: "var(--font-sans)",
    fontWeight: 500,
    fontSize: "clamp(0.8125rem, 0.77rem + 0.2vw, 0.875rem)",
    lineHeight: 1.45,
    letterSpacing: "0",
  },
  bodyLg: {
    fontFamily: "var(--font-sans)",
    fontWeight: 400,
    fontSize: "clamp(1rem, 0.92rem + 0.35vw, 1.125rem)",
    lineHeight: 1.55,
    letterSpacing: "-0.01em",
  },
  body: {
    fontFamily: "var(--font-sans)",
    fontWeight: 400,
    fontSize: "clamp(0.875rem, 0.85rem + 0.12vw, 0.9375rem)",
    lineHeight: 1.5,
    letterSpacing: "0",
  },
  bodySm: {
    fontFamily: "var(--font-sans)",
    fontWeight: 400,
    fontSize: "clamp(0.75rem, 0.72rem + 0.1vw, 0.8125rem)",
    lineHeight: 1.45,
    letterSpacing: "0.005em",
  },
  caption: {
    fontFamily: "var(--font-sans)",
    fontWeight: 500,
    fontSize: "clamp(0.6875rem, 0.65rem + 0.08vw, 0.75rem)",
    lineHeight: 1.4,
    letterSpacing: "0.01em",
  },
  code: {
    fontFamily: "var(--font-mono)",
    fontWeight: 400,
    fontSize: "clamp(0.75rem, 0.72rem + 0.1vw, 0.8125rem)",
    lineHeight: 1.45,
    letterSpacing: "0",
  },
  metric: {
    fontFamily: "var(--font-sans)",
    fontWeight: 700,
    fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2rem)",
    lineHeight: 1.2,
    letterSpacing: "-0.02em",
    tabularNums: true,
  },
} as const;
