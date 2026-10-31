/**
 * @file scripts/theme-generator.ts
 * @description Generates scoped brand CSS themes containing palette and isolated extensions.
 */

import type { BrandDefinition } from "../src/schema/tokens.schema";

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
