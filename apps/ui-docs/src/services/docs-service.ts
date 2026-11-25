import "server-only";
import { THEMES, THEME_CONFIGS, type ThemeName } from "@yuva-devlab/tokens";
import { highlightCode } from "@/services/highlight-service";

export interface InstallationStep {
  id: string;
  title: string;
  description?: string;
  codeSnippet: string;
  language: string;
  highlightedHtml?: string;
}

interface BrandExtensionExample {
  exportName: string;
  tokenKey: string;
}

const BRAND_EXTENSION_EXAMPLES: Record<ThemeName, BrandExtensionExample> = {
  orchestrai: { exportName: "ORCHESTRAI_EXTENSIONS", tokenKey: "chart-1" },
  finai: { exportName: "FINAI_EXTENSIONS", tokenKey: "chart-bullish" },
  portal: { exportName: "PORTAL_EXTENSIONS", tokenKey: "chart-1" },
  logs: { exportName: "LOGS_EXTENSIONS", tokenKey: "chart-info" },
  vitalai: { exportName: "VITALAI_EXTENSIONS", tokenKey: "chart-volt" },
  quantai: { exportName: "QUANTAI_EXTENSIONS", tokenKey: "chart-actual" },
};

/**
 * Generates ordered installation and setup steps tailored to the active brand theme.
 */
export function buildInstallationSteps(brand: ThemeName): InstallationStep[] {
  const themeLabel = THEME_CONFIGS[brand].label;
  const extension = BRAND_EXTENSION_EXAMPLES[brand];

  return [
    {
      id: "install-deps",
      title: "1. Install Packages",
      description:
        "Install the component library, design tokens, and self-hosted variable font packages:",
      codeSnippet: `pnpm add @yuva-devlab/ui @yuva-devlab/tokens
pnpm add @fontsource-variable/inter @fontsource-variable/jetbrains-mono`,
      language: "bash",
    },
    {
      id: "next-config",
      title: "2. Configure Next.js Transpilation",
      description:
        "Add @yuva-devlab/ui and @yuva-devlab/tokens to transpilePackages in next.config.ts:",
      codeSnippet: `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@yuva-devlab/ui", "@yuva-devlab/tokens"],
};

export default nextConfig;`,
      language: "tsx",
    },
    {
      id: "configure-css",
      title: "3. Configure globals.css with W3C Cascade Layers",
      description: `Establish deterministic W3C Cascade Layers, import tokens, the ${themeLabel} theme, pure platform component styles, and bind fonts in src/app/globals.css:`,
      codeSnippet: `/* 1. Establish W3C Cascade Layer precedence */
@layer dl-reset, dl-tokens, dl-components, dl-layout, dl-utilities, dl-app;

/* 2. Self-hosted typography & canonical design system stylesheets */
@import "@fontsource-variable/inter/wght.css";
@import "@fontsource-variable/jetbrains-mono/wght.css";
@import "@yuva-devlab/tokens/preset.css";
@import "@yuva-devlab/tokens/themes/${brand}.css";
@import "@yuva-devlab/ui/styles.css";

/* 3. Font binding for root and active brand scope */
:root,
html,
body,
[data-brand="${brand}"],
[data-theme="${brand}"] {
  --font-sans: "Inter Variable", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono Variable", ui-monospace, monospace;
}

/* 4. App-specific semantic styles always live in @layer dl-app */
@layer dl-app {
  body {
    margin: 0;
  }
}`,
      language: "css",
    },
    {
      id: "root-layout",
      title: "4. Bind Brand Theme in Root Layout",
      description: `Set data-brand="${brand}" and data-theme="${brand}" on <html> (and wrap with ThemeProvider / Toaster when using dynamic light & dark mode):`,
      codeSnippet: `import type { ReactNode } from "react";
import { Toaster } from "@yuva-devlab/ui";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-brand="${brand}" data-theme="${brand}">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}`,
      language: "tsx",
    },
    {
      id: "vscode-autocomplete",
      title: "5. Enable Native VS Code CSS Autocomplete",
      description:
        "Enable IDE autocomplete for DevLab semantic classes (.dl-display, .dl-h1..dl-h6, .dl-grid, .dl-card) in .vscode/settings.json:",
      codeSnippet: `{
  "css.customData": ["./node_modules/@yuva-devlab/tokens/css-data.json"],
  "html.customData": ["./node_modules/@yuva-devlab/tokens/css-data.json"]
}`,
      language: "json",
    },
    {
      id: "use-primitives",
      title: "6. Render UI & Typography Primitives",
      description:
        "Compose layouts, cards, typography, and AI elements with pure platform CSS components:",
      codeSnippet: `import {
  Badge,
  Button,
  Card,
  Flex,
  Heading,
  Stack,
  Text,
} from "@yuva-devlab/ui";

export default function OverviewCard() {
  return (
    <Card>
      <Stack gap={4}>
        <Flex justify="between" align="center">
          <Heading as="h1" size="h2">Service Telemetry</Heading>
          <Badge variant="default">Live</Badge>
        </Flex>

        <Text variant="caption">Updated in real time</Text>
        <Text variant="metric">99.98%</Text>

        <Button variant="primary">Inspect Details</Button>
      </Stack>
    </Card>
  );
}`,
      language: "tsx",
    },
    {
      id: "use-brand-extensions",
      title: "7. Use Type-Safe Brand Extensions for Charts",
      description: `Import OKLCH palette constants for ${themeLabel} from @yuva-devlab/tokens for Recharts, canvas, or custom visualizations:`,
      codeSnippet: `import { ${extension.exportName} } from "@yuva-devlab/tokens";
import { Area, AreaChart } from "recharts";

interface TelemetryPoint {
  timestamp: string;
  value: number;
}

export function TelemetryChart({ data }: { data: TelemetryPoint[] }) {
  const strokeColor = ${extension.exportName}.common.charts["${extension.tokenKey}"];

  return (
    <AreaChart width={480} height={240} data={data}>
      <Area dataKey="value" stroke={strokeColor} fill={strokeColor} />
    </AreaChart>
  );
}`,
      language: "tsx",
    },
  ];
}

/**
 * Server-only helper highlighting installation guide steps for a single brand.
 */
export async function getInstallationSteps(
  brand: ThemeName = "orchestrai",
): Promise<InstallationStep[]> {
  const steps = buildInstallationSteps(brand);
  return Promise.all(
    steps.map(async (step) => ({
      ...step,
      highlightedHtml: await highlightCode(step.codeSnippet, step.language),
    })),
  );
}

/**
 * Server-only helper pre-highlighting installation guides across all supported brands.
 */
export async function getInstallationStepsByBrand(): Promise<
  Record<ThemeName, InstallationStep[]>
> {
  const entries = await Promise.all(
    THEMES.map(
      async (brand) => [brand, await getInstallationSteps(brand)] as const,
    ),
  );
  return Object.fromEntries(entries) as Record<ThemeName, InstallationStep[]>;
}
