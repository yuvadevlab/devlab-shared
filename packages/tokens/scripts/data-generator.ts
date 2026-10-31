/**
 * @file scripts/data-generator.ts
 * @description Generates IDE CSS custom data and TypeScript constants.
 */

import { ALL_BRANDS } from "../src/brands";

/**
 * Generates HTML/CSS custom data for native IDE autocompletion.
 */
export function generateCssDataJson(): {
  classes: Array<{ name: string; description: string }>;
} {
  const classes = [
    {
      name: "dl-display",
      description: "Display heading: 3rem (48px) / 1.15 / 800 weight",
    },
    {
      name: "dl-h1",
      description: "Level 1 Heading: 2.25rem (36px) / 1.2 / 700 weight",
    },
    {
      name: "dl-h2",
      description: "Level 2 Heading: 1.75rem (28px) / 1.25 / 600 weight",
    },
    {
      name: "dl-h3",
      description: "Level 3 Heading: 1.375rem (22px) / 1.3 / 600 weight",
    },
    {
      name: "dl-h4",
      description: "Level 4 Heading: 1.125rem (18px) / 1.35 / 600 weight",
    },
    {
      name: "dl-h5",
      description: "Level 5 Heading: 1rem (16px) / 1.4 / 500 weight",
    },
    {
      name: "dl-h6",
      description: "Level 6 Heading: 0.875rem (14px) / 1.45 / 500 weight",
    },
    {
      name: "dl-body-lg",
      description: "Large Body Text: 1.125rem (18px) / 1.55 / 400 weight",
    },
    {
      name: "dl-body",
      description: "Default Body Text: 0.9375rem (15px) / 1.5 / 400 weight",
    },
    {
      name: "dl-body-sm",
      description: "Small Body Text: 0.8125rem (13px) / 1.45 / 400 weight",
    },
    {
      name: "dl-caption",
      description: "Caption / Footnote: 0.75rem (12px) / 1.4 / 500 weight",
    },
    {
      name: "dl-code",
      description:
        "Monospace Inline Code: 0.8125rem (13px) / 1.45 / 400 weight",
    },
    {
      name: "dl-metric",
      description:
        "Metric Display: 2rem (32px) / 1.2 / 700 weight / tabular-nums",
    },
    {
      name: "glass",
      description: "Surface glassmorphism effect with backdrop-blur",
    },
    {
      name: "execution-grid",
      description: "Technical background grid pattern",
    },
    {
      name: "topology-grid",
      description: "Technical background dotted topology grid",
    },
  ];
  return { classes };
}

/**
 * Generates TypeScript color and chart constants for JavaScript/Recharts consumers.
 */
export function generateTsConstants(): string {
  const brandExports = ALL_BRANDS.map((b) => {
    const rawJson = JSON.stringify(b.extensions ?? {}, null, 2);
    const cleanObj = rawJson.replace(/"([a-zA-Z_$][a-zA-Z0-9_$]*)":/g, "$1:");
    return `export const ${b.name.toUpperCase()}_EXTENSIONS = ${cleanObj} as const;`;
  });

  return `/**
 * @file src/generated/index.ts
 * @description Auto-generated brand extension color tokens and charts for Recharts / TypeScript consumers.
 */

${brandExports.join("\n\n")}
`;
}
