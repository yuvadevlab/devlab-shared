/**
 * @file scripts/root-generator.ts
 * @description Generates root.css, utilities.css, styles.css, and preset.css.
 */

import {
  BORDER_RADII,
  CONTROL_HEIGHTS,
  ICON_SIZES,
  ROOT_CHARTS,
  ROOT_DARK_PALETTE,
  ROOT_LIGHT_PALETTE,
  SEMANTIC_SPACING,
  SPACING_GRID,
  BASE_RESETS_CSS,
  UTILITIES_CSS,
} from "../src/core";

/**
 * Generates the root.css content with universal variables and baseline resets.
 */
export function generateRootCss(): string {
  const radiiLines = Object.entries(BORDER_RADII)
    .map(([k, v]) => `    --${k}: ${v};`)
    .join("\n");
  const heightLines = Object.entries(CONTROL_HEIGHTS)
    .map(([k, v]) => `    --${k}: ${v};`)
    .join("\n");
  const iconLines = Object.entries(ICON_SIZES)
    .map(([k, v]) => `    --${k}: ${v};`)
    .join("\n");
  const spaceLines = Object.entries(SPACING_GRID)
    .map(([k, v]) => `    --${k}: ${v};`)
    .join("\n");
  const semanticSpaceLines = Object.entries(SEMANTIC_SPACING)
    .map(([k, v]) => `    --${k}: ${v};`)
    .join("\n");
  const lightColors = Object.entries(ROOT_LIGHT_PALETTE)
    .map(([k, v]) => `    --${k}: ${v};`)
    .join("\n");
  const darkColors = Object.entries(ROOT_DARK_PALETTE)
    .map(([k, v]) => `    --${k}: ${v};`)
    .join("\n");
  const chartLines = Object.entries(ROOT_CHARTS)
    .map(([k, v]) => `    --${k}: ${v};`)
    .join("\n");

  return `/**
 * @file styles/root.css
 * @description Baseline normalizations, design tokens, and interactive element resets.
 * Governed by W3C Cascade Layers.
 */

@layer dl-tokens {
  :root {
    --radius: 0.5rem;
${radiiLines}

    /* Component Control Dimensions */
${heightLines}

    /* Icon Sizing Tokens */
${iconLines}

    /* Spacing Grid */
${spaceLines}

    /* Semantic Padding & Gap Defaults */
${semanticSpaceLines}

    /* Surfaces & Baseline Colors */
${lightColors}

    /* Sidebar Fallback */
    --sidebar: oklch(1 0 0);
    --sidebar-foreground: oklch(0.18 0.01 260);
    --sidebar-primary: oklch(0.35 0.04 260);
    --sidebar-primary-foreground: oklch(0.99 0 0);
    --sidebar-accent: oklch(0.95 0.01 260);
    --sidebar-accent-foreground: oklch(0.2 0.01 260);
    --sidebar-border: oklch(0.92 0.005 260);
    --sidebar-ring: oklch(0.35 0.04 260);

    /* Charts */
${chartLines}

    /* Typography Fallbacks */
    --theme-font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    --theme-font-display: var(--theme-font-sans);
    --theme-font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    --font-sans: var(--theme-font-sans);
    --font-display: var(--theme-font-display);
    --font-mono: var(--theme-font-mono);
  }

  .dark,
  [data-theme="dark"] {
${darkColors}

    --sidebar: oklch(0.18 0.01 260);
    --sidebar-foreground: oklch(0.97 0.003 260);
    --sidebar-primary: oklch(0.75 0.05 260);
    --sidebar-primary-foreground: oklch(0.15 0.01 260);
    --sidebar-accent: oklch(0.26 0.01 260);
    --sidebar-accent-foreground: oklch(0.97 0.003 260);
    --sidebar-border: oklch(1 0 0 / 10%);
    --sidebar-ring: oklch(0.75 0.05 260);

${chartLines}
  }
}
${BASE_RESETS_CSS}`;
}

/**
 * Generates the utilities.css stylesheet content.
 */
export function generateUtilitiesCss(): string {
  return `/**
 * @file styles/utilities.css
 * @description Surface styling, kinetic animations, and toast feedback states.
 * Governed by W3C Cascade Layers.
 */
${UTILITIES_CSS}`;
}

/**
 * Generates the master styles.css stylesheet importing all tokens and themes.
 */
export function generateStylesCss(brandNames: readonly string[]): string {
  const themeImports = brandNames
    .map((name) => `@import "./themes/${name}.css";`)
    .join("\n");

  return `/**
 * @file styles/styles.css
 * @description Master stylesheet for @yuva-devlab/tokens.
 * Contains base CSS custom properties, utility classes, and brand theme definitions.
 */

@import "./root.css";
@import "./typography.css";
@import "./utilities.css";

${themeImports}
`;
}

/**
 * Generates the preset.css stylesheet.
 */
export function generatePresetCss(): string {
  return `/**
 * @file styles/preset.css
 * @description Preset stylesheet importing base tokens, utilities, and brand themes.
 */
@import "./styles.css";
`;
}
