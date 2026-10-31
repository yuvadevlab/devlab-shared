import "server-only";

export interface SemanticColorToken {
  name: string;
  role: string;
  desc: string;
}

export interface RadiusToken {
  token: string;
  value: string;
  example: string;
}

export interface TypographyToken {
  token: string;
  role: string;
  value: string;
}

const SEMANTIC_COLORS: SemanticColorToken[] = [
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
];

const RADII: RadiusToken[] = [
  { token: "--radius-sm", value: "calc(var(--radius) - 4px)", example: "4px" },
  { token: "--radius-md", value: "calc(var(--radius) - 2px)", example: "6px" },
  { token: "--radius-lg", value: "var(--radius)", example: "8px / 12px" },
  { token: "--radius-xl", value: "calc(var(--radius) + 4px)", example: "16px" },
  {
    token: "--radius-2xl",
    value: "calc(var(--radius) + 8px)",
    example: "20px",
  },
];

const TYPOGRAPHY: TypographyToken[] = [
  {
    token: "--font-sans",
    role: "UI & Text",
    value: "Inter, system-ui, sans-serif",
  },
  {
    token: "--font-display",
    role: "Brand & VitalAI Condensed Display",
    value: '"Barlow Condensed", "Sora", sans-serif',
  },
  {
    token: "--font-mono",
    role: "Code & Logs Matrix",
    value: "JetBrains Mono, monospace",
  },
];

/**
 * Server-only service providing tokens definitions and specifications.
 */
export async function getTokensCatalog() {
  return {
    semanticColors: SEMANTIC_COLORS,
    radii: RADII,
    typography: TYPOGRAPHY,
  };
}
