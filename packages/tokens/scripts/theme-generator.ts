/**
 * @file scripts/theme-generator.ts
 * @description Generates scoped brand CSS themes containing palette and isolated extensions.
 */

import type { BrandDefinition } from "../src/schema/tokens.schema";
import { CONTROL_HEIGHTS, ICON_SIZES, SPACING_GRID } from "../src/core";

const DENSITY_SCALE = {
  compact: 0.875,
  standard: 1,
  spacious: 1.125,
} as const;

const DENSITY_SPACING_ALIASES = {
  "card-padding": "space-4",
  "dialog-padding": "space-5",
  "form-field-gap": "space-3",
  "section-gap": "space-5",
  "table-row-padding-x": "space-4",
  "table-row-padding-y": "space-3",
} as const;

function scaleRemToken(value: string, scale: number): string {
  const match = /^(-?\d+(?:\.\d+)?)rem$/.exec(value);
  if (!match) {
    throw new Error(`Cannot scale unsupported density token value: ${value}`);
  }

  const scaledValue = Number((Number(match[1]) * scale).toFixed(3));
  return `${scaledValue}rem`;
}

function formatDensityTokens(brand: BrandDefinition): string {
  const scale = DENSITY_SCALE[brand.density];
  const tokens = { ...SPACING_GRID, ...CONTROL_HEIGHTS, ...ICON_SIZES };

  return Object.entries(tokens)
    .map(([name, value]) => `  --${name}: ${scaleRemToken(value, scale)};`)
    .concat(
      Object.entries(DENSITY_SPACING_ALIASES).map(
        ([alias, token]) =>
          `  --${alias}: ${scaleRemToken(tokens[token], scale)};`,
      ),
    )
    .join("\n");
}

/**
 * Formats brand extensions into CSS custom property declarations.
 *
 * @param brand - Brand definition object
 * @param mode - Color mode (light/dark)
 * @returns Formatted CSS declaration string
 */
export function formatExtensions(
  brand: BrandDefinition,
  mode: "light" | "dark",
): string {
  const common = brand.extensions?.common ?? {};
  const modeExt = brand.extensions?.[mode] ?? {};
  const merged: Record<string, string> = {};

  for (const group of Object.values(common)) {
    if (group && typeof group === "object") {
      Object.assign(merged, group);
    }
  }
  for (const group of Object.values(modeExt)) {
    if (group && typeof group === "object") {
      Object.assign(merged, group);
    }
  }

  const lines = Object.entries(merged).map(
    ([key, val]) => `  --${key}: ${val};`,
  );
  return lines.length > 0
    ? `\n  /* Brand Extensions */\n${lines.join("\n")}`
    : "";
}

/**
 * Generates the complete CSS stylesheet content for a specific brand.
 *
 * @param brand - Brand definition object
 * @returns CSS theme string
 */
export function generateBrandCss(brand: BrandDefinition): string {
  const lightExt = formatExtensions(brand, "light");
  const darkExt = formatExtensions(brand, "dark");
  const densityTokens = formatDensityTokens(brand);

  return `/**
 * @file styles/themes/${brand.name}.css
 * @description ${brand.label} brand theme tokens and isolated domain extensions.
 */

[data-brand="${brand.name}"],
[data-theme="${brand.name}"],
[data-theme="${brand.name}-light"],
:root[data-brand="${brand.name}"],
:root[data-theme="${brand.name}"],
:root[data-theme="${brand.name}-light"] {
  --radius: ${brand.radius};
  --font-sans: ${brand.fontSans};
  --font-display: ${brand.fontDisplay};
  --font-mono: ${brand.fontMono};
  --theme-font-sans: ${brand.fontSans};
  --theme-font-display: ${brand.fontDisplay};
  --theme-font-mono: ${brand.fontMono};

${densityTokens}

  --background: ${brand.light.background};
  --foreground: ${brand.light.foreground};
  --card: ${brand.light.card};
  --card-foreground: ${brand.light.cardForeground};
  --popover: ${brand.light.popover};
  --popover-foreground: ${brand.light.popoverForeground};
  --primary: ${brand.light.primary};
  --primary-foreground: ${brand.light.primaryForeground};
  --secondary: ${brand.light.secondary};
  --secondary-foreground: ${brand.light.secondaryForeground};
  --muted: ${brand.light.muted};
  --muted-foreground: ${brand.light.mutedForeground};
  --accent: ${brand.light.accent};
  --accent-foreground: ${brand.light.accentForeground};
  --destructive: ${brand.light.destructive};
  --destructive-foreground: ${brand.light.destructiveForeground};
  --warning: ${brand.light.warning};
  --warning-foreground: ${brand.light.warningForeground};
  --success: ${brand.light.success};
  --success-foreground: ${brand.light.successForeground};
  --info: ${brand.light.info};
  --info-foreground: ${brand.light.infoForeground};
  --border: ${brand.light.border};
  --input: ${brand.light.input};
  --ring: ${brand.light.ring};

  --sidebar: ${brand.light.card};
  --sidebar-foreground: ${brand.light.cardForeground};
  --sidebar-primary: ${brand.light.primary};
  --sidebar-primary-foreground: ${brand.light.primaryForeground};
  --sidebar-accent: ${brand.light.accent};
  --sidebar-accent-foreground: ${brand.light.accentForeground};
  --sidebar-border: ${brand.light.border};
  --sidebar-ring: ${brand.light.ring};${lightExt}
}

[data-theme="${brand.name}-dark"],
[data-brand="${brand.name}"][data-theme="dark"],
[data-brand="${brand.name}"][data-theme="${brand.name}-dark"],
[data-brand="${brand.name}"].dark,
[data-brand="${brand.name}"] .dark,
[data-theme="${brand.name}"] .dark,
.dark [data-brand="${brand.name}"],
.dark [data-theme="${brand.name}"],
:root[data-theme="${brand.name}-dark"],
:root[data-brand="${brand.name}"].dark,
:root[data-brand="${brand.name}"][data-theme="dark"],
:root[data-brand="${brand.name}"][data-theme="${brand.name}-dark"],
:root.dark[data-brand="${brand.name}"],
:root.dark[data-theme="${brand.name}"] {
  --radius: ${brand.radius};
${densityTokens}

  --background: ${brand.dark.background};
  --foreground: ${brand.dark.foreground};
  --card: ${brand.dark.card};
  --card-foreground: ${brand.dark.cardForeground};
  --popover: ${brand.dark.popover};
  --popover-foreground: ${brand.dark.popoverForeground};
  --primary: ${brand.dark.primary};
  --primary-foreground: ${brand.dark.primaryForeground};
  --secondary: ${brand.dark.secondary};
  --secondary-foreground: ${brand.dark.secondaryForeground};
  --muted: ${brand.dark.muted};
  --muted-foreground: ${brand.dark.mutedForeground};
  --accent: ${brand.dark.accent};
  --accent-foreground: ${brand.dark.accentForeground};
  --destructive: ${brand.dark.destructive};
  --destructive-foreground: ${brand.dark.destructiveForeground};
  --warning: ${brand.dark.warning};
  --warning-foreground: ${brand.dark.warningForeground};
  --success: ${brand.dark.success};
  --success-foreground: ${brand.dark.successForeground};
  --info: ${brand.dark.info};
  --info-foreground: ${brand.dark.infoForeground};
  --border: ${brand.dark.border};
  --input: ${brand.dark.input};
  --ring: ${brand.dark.ring};

  --sidebar: ${brand.dark.card};
  --sidebar-foreground: ${brand.dark.cardForeground};
  --sidebar-primary: ${brand.dark.primary};
  --sidebar-primary-foreground: ${brand.dark.primaryForeground};
  --sidebar-accent: ${brand.dark.accent};
  --sidebar-accent-foreground: ${brand.dark.accentForeground};
  --sidebar-border: ${brand.dark.border};
  --sidebar-ring: ${brand.dark.ring};${darkExt}
}
`;
}
