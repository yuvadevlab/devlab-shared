/**
 * @file src/brands/ai-studio.tokens.ts
 * @description DevLab AI Studio brand definition with dark-first indigo/obsidian control plane palette and compact developer density.
 * @author yuva.devlab@gmail.com
 */

import type { BrandDefinition } from "../schema/tokens.schema";

/**
 * DevLab AI Studio brand theme specification for the central AI Gateway & Control Plane.
 */
export const AI_STUDIO_BRAND: BrandDefinition = {
  name: "ai-studio",
  label: "DevLab AI Studio",
  fontSans: '"Inter", sans-serif',
  fontDisplay: '"Inter", sans-serif',
  fontMono: '"JetBrains Mono", monospace',
  radius: "0.5rem",
  density: "compact",
  light: {
    background: "oklch(0.985 0.003 275)",
    foreground: "oklch(0.18 0.01 275)",
    card: "oklch(0.99 0.003 275)",
    cardForeground: "oklch(0.18 0.01 275)",
    popover: "oklch(1 0 0)",
    popoverForeground: "oklch(0.18 0.01 275)",
    primary: "oklch(0.54 0.22 276)",
    primaryForeground: "oklch(0.99 0 0)",
    secondary: "oklch(0.95 0.006 275)",
    secondaryForeground: "oklch(0.24 0.01 275)",
    muted: "oklch(0.95 0.006 275)",
    mutedForeground: "oklch(0.48 0.01 275)",
    accent: "oklch(0.93 0.04 276)",
    accentForeground: "oklch(0.32 0.14 276)",
    destructive: "oklch(0.55 0.2 24)",
    destructiveForeground: "oklch(0.99 0 0)",
    warning: "oklch(0.58 0.15 78)",
    warningForeground: "oklch(0.18 0.02 78)",
    success: "oklch(0.52 0.16 155)",
    successForeground: "oklch(0.99 0 0)",
    info: "oklch(0.52 0.14 235)",
    infoForeground: "oklch(0.99 0 0)",
    border: "oklch(0.88 0.008 275)",
    input: "oklch(0.88 0.008 275)",
    ring: "oklch(0.54 0.22 276)",
  },
  dark: {
    background: "oklch(0.145 0.008 275)",
    foreground: "oklch(0.94 0.006 275)",
    card: "oklch(0.175 0.008 275)",
    cardForeground: "oklch(0.94 0.006 275)",
    popover: "oklch(0.205 0.009 275)",
    popoverForeground: "oklch(0.94 0.006 275)",
    primary: "oklch(0.65 0.22 276)",
    primaryForeground: "oklch(0.985 0.004 275)",
    secondary: "oklch(0.225 0.009 275)",
    secondaryForeground: "oklch(0.88 0.006 275)",
    muted: "oklch(0.205 0.009 275)",
    mutedForeground: "oklch(0.63 0.012 275)",
    accent: "oklch(0.32 0.09 276 / 40%)",
    accentForeground: "oklch(0.87 0.11 276)",
    destructive: "oklch(0.69 0.2 24)",
    destructiveForeground: "oklch(0.985 0.004 275)",
    warning: "oklch(0.79 0.16 78)",
    warningForeground: "oklch(0.145 0.008 78)",
    success: "oklch(0.74 0.17 155)",
    successForeground: "oklch(0.145 0.008 155)",
    info: "oklch(0.73 0.13 235)",
    infoForeground: "oklch(0.145 0.008 235)",
    border: "oklch(0.265 0.009 275)",
    input: "oklch(0.265 0.009 275)",
    ring: "oklch(0.65 0.22 276)",
  },
  extensions: {
    common: {
      domain: {
        "text-body": "0.75rem",
        "text-body-sm": "0.6875rem",
        "text-caption": "0.625rem",
        "text-label": "0.6875rem",
        "text-btn": "0.6875rem",
        "input-font-size": "0.6875rem",
        "table-head-font-size": "0.5625rem",
        "table-cell-font-size": "0.625rem",
        "control-height-sm": "1.75rem",
        "control-height-md": "2.125rem",
        "input-height-md": "2.125rem",
        "card-padding": "1.0625rem",
      },
      charts: {
        "chart-1": "oklch(0.65 0.22 276)",
        "chart-2": "oklch(0.74 0.17 155)",
        "chart-3": "oklch(0.79 0.16 78)",
        "chart-4": "oklch(0.73 0.13 235)",
        "chart-5": "oklch(0.76 0.13 56)",
      },
    },
    light: {
      domain: {
        sidebar: "oklch(0.97 0.004 275)",
        "sidebar-border": "oklch(0.88 0.008 275)",
      },
    },
    dark: {
      domain: {
        sidebar: "oklch(0.125 0.008 275)",
        "sidebar-border": "oklch(0.25 0.009 275)",
      },
    },
  },
};
