/**
 * @file src/index.ts
 * @description Yuva DevLab Design System — Design Tokens & Theme Definitions.
 */

export const THEMES = ["orchestrai", "finai", "portal"] as const;
export type ThemeName = (typeof THEMES)[number];

export const BRAND_MODES = ["light", "dark"] as const;
export type BrandMode = (typeof BRAND_MODES)[number];

export interface ThemeConfig {
  readonly name: ThemeName;
  readonly defaultMode: BrandMode;
  readonly label: string;
}

export const THEME_CONFIGS: Record<ThemeName, ThemeConfig> = {
  orchestrai: {
    name: "orchestrai",
    defaultMode: "dark",
    label: "OrchestrAI",
  },
  finai: {
    name: "finai",
    defaultMode: "dark",
    label: "FinAI",
  },
  portal: {
    name: "portal",
    defaultMode: "dark",
    label: "DevLab Portal",
  },
} as const;
