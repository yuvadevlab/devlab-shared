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

export const SEMANTIC_COLORS: SemanticColorToken[] = [
  {
    name: "--primary",
    role: "Primary Brand",
    desc: "Main brand interactive color for buttons and focus.",
  },
  {
    name: "--secondary",
    role: "Secondary Surface",
    desc: "Subtle neutral action backgrounds.",
  },
  {
    name: "--accent",
    role: "Accent Highlight",
    desc: "Interactive hover states and selection glow.",
  },
  {
    name: "--muted",
    role: "Muted Surface",
    desc: "Subdued backgrounds and disabled states.",
  },
  {
    name: "--background",
    role: "Page Background",
    desc: "Root canvas color for pages and backdrops.",
  },
  {
    name: "--foreground",
    role: "Primary Text",
    desc: "High-contrast text color for headings and body.",
  },
  {
    name: "--card",
    role: "Card Surface",
    desc: "Surface background for cards and dialogs.",
  },
  {
    name: "--border",
    role: "Standard Border",
    desc: "Subtle border line dividing surfaces.",
  },
  {
    name: "--destructive",
    role: "Destructive",
    desc: "Errors, destructive buttons, and critical alerts.",
  },
  {
    name: "--success",
    role: "Success",
    desc: "Completed states and positive indicators.",
  },
  {
    name: "--warning",
    role: "Warning",
    desc: "Cautionary alerts and pending reviews.",
  },
  {
    name: "--info",
    role: "Information",
    desc: "Informational banners and telemetry sync.",
  },
];

export const RADII: RadiusToken[] = [
  { token: "--radius-sm", value: "calc(var(--radius) - 4px)", example: "4px" },
  { token: "--radius-md", value: "calc(var(--radius) - 2px)", example: "6px" },
  { token: "--radius-lg", value: "var(--radius)", example: "8px / 12px" },
  {
    token: "--radius-xl",
    value: "calc(var(--radius) + 4px)",
    example: "16px",
  },
  {
    token: "--radius-2xl",
    value: "calc(var(--radius) + 8px)",
    example: "20px",
  },
];

export const TYPOGRAPHY: TypographyToken[] = [
  {
    token: "--font-sans",
    role: "UI & Text",
    value: "Inter, system-ui, sans-serif",
  },
  {
    token: "--font-display",
    role: "Brand Display",
    value: '"Barlow Condensed", "Sora", sans-serif',
  },
  {
    token: "--font-mono",
    role: "Code & Logs",
    value: "JetBrains Mono, monospace",
  },
];
