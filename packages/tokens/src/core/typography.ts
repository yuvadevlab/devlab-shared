/**
 * @file src/core/typography.ts
 * @description Universal typographic hierarchy and scale definition.
 */

import type { BaseTypographyScale } from "../schema/tokens.schema";

/**
 * Standard typographic scale shared across all brands and applications.
 */
export const BASE_TYPOGRAPHY_SCALE: BaseTypographyScale = {
  display: {
    fontFamily: "var(--font-display)",
    fontWeight: 800,
    fontSize: "3rem",
    lineHeight: 1.15,
    letterSpacing: "-0.03em",
  },
  h1: {
    fontFamily: "var(--font-display)",
    fontWeight: 700,
    fontSize: "2.25rem",
    lineHeight: 1.2,
    letterSpacing: "-0.025em",
  },
  h2: {
    fontFamily: "var(--font-display)",
    fontWeight: 600,
    fontSize: "1.75rem",
    lineHeight: 1.25,
    letterSpacing: "-0.02em",
  },
  h3: {
    fontFamily: "var(--font-sans)",
    fontWeight: 600,
    fontSize: "1.375rem",
    lineHeight: 1.3,
    letterSpacing: "-0.015em",
  },
  h4: {
    fontFamily: "var(--font-sans)",
    fontWeight: 600,
    fontSize: "1.125rem",
    lineHeight: 1.35,
    letterSpacing: "-0.01em",
  },
  h5: {
    fontFamily: "var(--font-sans)",
    fontWeight: 500,
    fontSize: "1rem",
    lineHeight: 1.4,
    letterSpacing: "-0.005em",
  },
  h6: {
    fontFamily: "var(--font-sans)",
    fontWeight: 500,
    fontSize: "0.875rem",
    lineHeight: 1.45,
    letterSpacing: "0",
  },
  bodyLg: {
    fontFamily: "var(--font-sans)",
    fontWeight: 400,
    fontSize: "1.125rem",
    lineHeight: 1.55,
    letterSpacing: "-0.01em",
  },
  body: {
    fontFamily: "var(--font-sans)",
    fontWeight: 400,
    fontSize: "0.9375rem",
    lineHeight: 1.5,
    letterSpacing: "0",
  },
  bodySm: {
    fontFamily: "var(--font-sans)",
    fontWeight: 400,
    fontSize: "0.8125rem",
    lineHeight: 1.45,
    letterSpacing: "0.005em",
  },
  caption: {
    fontFamily: "var(--font-sans)",
    fontWeight: 500,
    fontSize: "0.75rem",
    lineHeight: 1.4,
    letterSpacing: "0.01em",
  },
  code: {
    fontFamily: "var(--font-mono)",
    fontWeight: 400,
    fontSize: "0.8125rem",
    lineHeight: 1.45,
    letterSpacing: "0",
  },
  metric: {
    fontFamily: "var(--font-sans)",
    fontWeight: 700,
    fontSize: "2rem",
    lineHeight: 1.2,
    letterSpacing: "-0.02em",
    tabularNums: true,
  },
} as const;
