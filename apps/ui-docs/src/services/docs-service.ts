import "server-only";
import { highlightCode } from "@/services/highlight-service";

export interface InstallationStep {
  id: string;
  title: string;
  description?: string;
  codeSnippet: string;
  language: string;
  highlightedHtml?: string;
}

const INSTALLATION_STEPS: InstallationStep[] = [
  {
    id: "install-deps",
    title: "1. Install Dependencies",
    description:
      "Install the core UI components and design token packages via pnpm:",
    codeSnippet: "pnpm add @yuva-devlab/ui @yuva-devlab/tokens",
    language: "bash",
  },
  {
    id: "configure-css",
    title: "2. Configure globals.css with W3C Cascade Layers",
    description:
      "Import core design tokens and your brand theme in your root CSS stylesheet using standard W3C Cascade Layers (@layer):",
    codeSnippet: `/* Establish W3C Cascade Layer hierarchy */
@layer dl-base, dl-tokens, dl-components, dl-layout, dl-utilities, dl-app;

@import "@yuva-devlab/tokens/styles.css";
@import "@yuva-devlab/tokens/themes/finai.css";
@import "@yuva-devlab/ui/styles.css";`,
    language: "css",
  },
  {
    id: "vscode-autocomplete",
    title: "3. Enable Native VS Code Autocomplete",
    description:
      "Enable instant IDE autocomplete for all DevLab utility classes (dl-display, dl-h1..dl-h6, glass, execution-grid) with zero marketplace extensions in .vscode/settings.json:",
    codeSnippet: `{
  "css.customData": ["./node_modules/@yuva-devlab/tokens/css-data.json"],
  "html.customData": ["./node_modules/@yuva-devlab/tokens/css-data.json"]
}`,
    language: "json",
  },
  {
    id: "use-typography-primitives",
    title: "4. Render UI & Typography Primitives",
    description:
      "Compose layouts and typography with decoupled semantic HTML levels (as) and visual design scales (size, variant):",
    codeSnippet: `import { Heading, Text, Button, Card, Stack, Flex, Badge } from "@yuva-devlab/ui";

export default function PortfolioOverview() {
  return (
    <Card>
      <Stack gap={4}>
        <Flex justify="between" align="center">
          <Heading as="h1" size="h2">Portfolio Analytics</Heading>
          <Badge variant="default">Live</Badge>
        </Flex>

        <Text variant="caption">Updated in real-time</Text>
        <Text variant="metric">$1,248,390.50</Text>

        <Button variant="primary">Execute Rebalance</Button>
      </Stack>
    </Card>
  );
}`,
    language: "tsx",
  },
  {
    id: "use-brand-extensions",
    title: "5. Use Type-Safe Brand Extensions for Charts",
    description:
      "Import brand-specific color constants for Recharts, canvas, or WebGL with full TypeScript autocompletion:",
    codeSnippet: `import { FINAI_EXTENSIONS } from "@yuva-devlab/tokens";
import { AreaChart, Area } from "recharts";

export function EquityChart({ data }) {
  return (
    <AreaChart data={data}>
      <Area
        dataKey="bullish"
        stroke={FINAI_EXTENSIONS.common.charts["chart-bullish"]}
        fill={FINAI_EXTENSIONS.common.charts["chart-bullish"]}
      />
    </AreaChart>
  );
}`,
    language: "tsx",
  },
];

/**
 * Server-only service to retrieve installation guide steps
 * with pre-rendered Shiki syntax highlighting.
 */
export async function getInstallationSteps(): Promise<InstallationStep[]> {
  return Promise.all(
    INSTALLATION_STEPS.map(async (step) => ({
      ...step,
      highlightedHtml: await highlightCode(step.codeSnippet, step.language),
    })),
  );
}
