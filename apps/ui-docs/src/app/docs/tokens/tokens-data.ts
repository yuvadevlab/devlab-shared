/**
 * @file tokens-data.ts
 * @description Constant datasets for design tokens documentation display.
 */

export interface SemanticColorDef {
  readonly name: string;
  readonly role: string;
  readonly desc: string;
}

export const SEMANTIC_COLORS: readonly SemanticColorDef[] = [
  {
    name: "--primary",
    role: "Primary Brand",
    desc: "Main brand interactive color for primary buttons and focus states.",
  },
  {
    name: "--secondary",
    role: "Secondary Surface",
    desc: "Subtle neutral action backgrounds and supporting elements.",
  },
  {
    name: "--accent",
    role: "Accent Highlight",
    desc: "Interactive hover states, active menu items, and selection glow.",
  },
  {
    name: "--muted",
    role: "Muted Surface",
    desc: "Subdued backgrounds, disabled states, and skeleton loaders.",
  },
  {
    name: "--background",
    role: "Page Background",
    desc: "Root canvas color for pages and deep backgrounds.",
  },
  {
    name: "--foreground",
    role: "Primary Text",
    desc: "High-contrast text color for primary headings and body.",
  },
  {
    name: "--card",
    role: "Card Surface",
    desc: "Surface background for cards, modals, and popovers.",
  },
  {
    name: "--border",
    role: "Standard Border",
    desc: "Subtle border line dividing surfaces, inputs, and tables.",
  },
  {
    name: "--destructive",
    role: "Destructive / Error",
    desc: "Errors, destructive buttons, and critical status callouts.",
  },
  {
    name: "--success",
    role: "Success",
    desc: "Completed states, positive trends, and operational badges.",
  },
  {
    name: "--warning",
    role: "Warning",
    desc: "Cautionary alerts, pending reviews, and paused states.",
  },
  {
    name: "--info",
    role: "Information",
    desc: "Informational banners, active sync indicators, and links.",
  },
] as const;

export interface RadiusDef {
  readonly token: string;
  readonly value: string;
  readonly example: string;
}

export const RADII: readonly RadiusDef[] = [
  { token: "--radius-sm", value: "calc(var(--radius) - 4px)", example: "4px" },
  { token: "--radius-md", value: "calc(var(--radius) - 2px)", example: "6px" },
  { token: "--radius-lg", value: "var(--radius)", example: "8px / 12px" },
  { token: "--radius-xl", value: "calc(var(--radius) + 4px)", example: "16px" },
  {
    token: "--radius-2xl",
    value: "calc(var(--radius) + 8px)",
    example: "20px",
  },
] as const;
