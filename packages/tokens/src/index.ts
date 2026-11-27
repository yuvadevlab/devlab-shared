/**
 * @file src/index.ts
 * @description Yuva DevLab Design System — Design Tokens & Theme Definitions.
 */

import { ALL_BRANDS, BRAND_MAP } from "./brands";

export type ThemeName = keyof typeof BRAND_MAP;
export const THEMES = Object.keys(BRAND_MAP) as ThemeName[];

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

export const THEME_CONFIGS: Record<ThemeName, ThemeConfig> = Object.fromEntries(
  ALL_BRANDS.map((b) => [
    b.name,
    {
      name: b.name as ThemeName,
      defaultMode: "dark" as BrandMode,
      label: b.label,
      fontSans: b.fontSans,
      fontDisplay: b.fontDisplay,
      fontMono: b.fontMono,
      radius: b.radius,
      density: b.density === "compact" ? "high" : b.density,
    },
  ]),
) as Record<ThemeName, ThemeConfig>;

export * from "./schema/tokens.schema";
export * from "./core";
export * from "./brands";
export * from "./generated";
