/**
 * @file src/index.ts
 * @description Yuva DevLab Design System — Design Tokens & Theme Definitions.
 */

export const THEMES = [
  "orchestrai",
  "finai",
  "portal",
  "logs",
  "vitalai",
] as const;
export type ThemeName = (typeof THEMES)[number];

export const BRAND_MODES = ["light", "dark"] as const;
export type BrandMode = (typeof BRAND_MODES)[number];

/**
 * Brand Theme Configuration Object Interface.
 */
export interface ThemeConfig {
  /** Identifier of the theme */
  readonly name: ThemeName;
  /** Default mode (light/dark) */
  readonly defaultMode: BrandMode;
  /** Human-readable brand label */
  readonly label: string;
  /** Primary body font stack */
  readonly fontSans: string;
  /** Display/Heading font stack */
  readonly fontDisplay: string;
  /** Monospace code/terminal font stack */
  readonly fontMono: string;
  /** Corner radius token */
  readonly radius: string;
  /** Density profile of the brand */
  readonly density: "high" | "standard" | "spacious";
}

export const THEME_CONFIGS: Record<ThemeName, ThemeConfig> = {
  orchestrai: {
    name: "orchestrai",
    defaultMode: "dark",
    label: "OrchestrAI",
    fontSans: '"Manrope", sans-serif',
    fontDisplay: '"Sora", sans-serif',
    fontMono: '"JetBrains Mono", monospace',
    radius: "0.75rem",
    density: "standard",
  },
  finai: {
    name: "finai",
    defaultMode: "dark",
    label: "FinAI",
    fontSans: '"Inter", sans-serif',
    fontDisplay: '"Inter", sans-serif',
    fontMono: '"JetBrains Mono", monospace',
    radius: "0.75rem",
    density: "spacious",
  },
  portal: {
    name: "portal",
    defaultMode: "dark",
    label: "DevLab Portal",
    fontSans: '"Inter", sans-serif',
    fontDisplay: '"Inter", sans-serif',
    fontMono: '"JetBrains Mono", monospace',
    radius: "0.5rem",
    density: "standard",
  },
  logs: {
    name: "logs",
    defaultMode: "dark",
    label: "DevLab Logs",
    fontSans: '"Space Grotesk", sans-serif',
    fontDisplay: '"Space Grotesk", sans-serif',
    fontMono: '"JetBrains Mono", monospace',
    radius: "0.375rem",
    density: "high",
  },
  vitalai: {
    name: "vitalai",
    defaultMode: "dark",
    label: "VitalAI",
    fontSans: '"Inter", sans-serif',
    fontDisplay: '"Barlow Condensed", "Inter", sans-serif',
    fontMono: '"JetBrains Mono", monospace',
    radius: "1rem",
    density: "spacious",
  },
} as const;
