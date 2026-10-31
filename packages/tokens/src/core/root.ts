/**
 * @file src/core/root.ts
 * @description Universal baseline palette, surface defaults, and interactive resets.
 */

import type { BrandPalette } from "../schema/tokens.schema";

/**
 * Universal root fallback palette for light mode.
 */
export const ROOT_LIGHT_PALETTE: BrandPalette = {
  background: "oklch(0.985 0 0)",
  foreground: "oklch(0.18 0.01 260)",
  card: "oklch(1 0 0)",
  cardForeground: "oklch(0.18 0.01 260)",
  popover: "oklch(1 0 0)",
  popoverForeground: "oklch(0.18 0.01 260)",
  primary: "oklch(0.35 0.04 260)",
  primaryForeground: "oklch(0.99 0 0)",
  secondary: "oklch(0.96 0.005 260)",
  secondaryForeground: "oklch(0.2 0.01 260)",
  muted: "oklch(0.96 0.005 260)",
  mutedForeground: "oklch(0.5 0.01 260)",
  accent: "oklch(0.94 0.01 260)",
  accentForeground: "oklch(0.2 0.01 260)",
  destructive: "oklch(0.6 0.22 25)",
  destructiveForeground: "oklch(0.99 0 0)",
  warning: "oklch(0.75 0.14 80)",
  warningForeground: "oklch(0.2 0.02 80)",
  success: "oklch(0.65 0.15 150)",
  successForeground: "oklch(0.99 0 0)",
  info: "oklch(0.68 0.13 245)",
  infoForeground: "oklch(0.99 0 0)",
  border: "oklch(0.92 0.005 260)",
  input: "oklch(0.92 0.005 260)",
  ring: "oklch(0.35 0.04 260)",
};

/**
 * Universal root fallback palette for dark mode.
 */
export const ROOT_DARK_PALETTE: BrandPalette = {
  background: "oklch(0.16 0.01 260)",
  foreground: "oklch(0.97 0.003 260)",
  card: "oklch(0.2 0.01 260)",
  cardForeground: "oklch(0.97 0.003 260)",
  popover: "oklch(0.2 0.01 260)",
  popoverForeground: "oklch(0.97 0.003 260)",
  primary: "oklch(0.75 0.05 260)",
  primaryForeground: "oklch(0.15 0.01 260)",
  secondary: "oklch(0.25 0.01 260)",
  secondaryForeground: "oklch(0.97 0.003 260)",
  muted: "oklch(0.25 0.01 260)",
  mutedForeground: "oklch(0.7 0.01 260)",
  accent: "oklch(0.3 0.02 260)",
  accentForeground: "oklch(0.95 0.005 260)",
  destructive: "oklch(0.65 0.2 25)",
  destructiveForeground: "oklch(0.97 0.003 0)",
  warning: "oklch(0.75 0.14 80)",
  warningForeground: "oklch(0.15 0.02 80)",
  success: "oklch(0.7 0.15 150)",
  successForeground: "oklch(0.15 0.01 260)",
  info: "oklch(0.72 0.12 245)",
  infoForeground: "oklch(0.15 0.01 260)",
  border: "oklch(1 0 0 / 10%)",
  input: "oklch(1 0 0 / 14%)",
  ring: "oklch(0.75 0.05 260)",
};

/**
 * Universal root chart fallback palette.
 */
export const ROOT_CHARTS = {
  "chart-1": "oklch(0.6 0.15 250)",
  "chart-2": "oklch(0.65 0.15 150)",
  "chart-3": "oklch(0.7 0.12 70)",
  "chart-4": "oklch(0.75 0.14 80)",
  "chart-5": "oklch(0.6 0.18 25)",
} as const;

/**
 * Baseline interactive reset styles governed by Cascade Layer @layer dl-base.
 */
export const BASE_RESETS_CSS = `
@layer dl-base {
  button,
  a,
  select,
  summary,
  [role="button"],
  [role="tab"],
  [type="button"],
  [type="submit"],
  [type="reset"] {
    cursor: pointer;
  }

  button:disabled,
  a[aria-disabled="true"],
  [aria-disabled="true"],
  [type="button"]:disabled,
  [type="submit"]:disabled {
    cursor: not-allowed;
  }

  :focus:not(:focus-visible) {
    outline: none;
  }

  ::selection {
    background: color-mix(in oklab, var(--primary) 28%, transparent);
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: var(--border) transparent;
  }
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 9999px;
  }

  button,
  input,
  select,
  textarea {
    letter-spacing: 0;
    font-family: inherit;
  }

  [role="option"] {
    position: relative;
  }

  [data-slot="breadcrumb-separator"] svg {
    width: 0.875rem;
    height: 0.875rem;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
    }
  }
}
`;
