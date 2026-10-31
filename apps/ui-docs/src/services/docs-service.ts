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
    title: "2. Configure globals.css",
    description:
      "Import the design tokens and component styles into your app's global stylesheet with native Cascade Layers (@layer):",
    codeSnippet: `/* Native W3C Cascade Layers */
@layer dl-reset, dl-tokens, dl-components, dl-layout, dl-utilities, dl-app;

@import "@yuva-devlab/tokens/preset.css";
@import "@yuva-devlab/tokens/themes/orchestrai.css";
@import "@yuva-devlab/ui/styles.css";

/* (Optional) If your application uses Tailwind CSS 4: */
/* @import "tailwindcss"; */`,
    language: "css",
  },
  {
    id: "use-components",
    title: "3. Use Components & Layout Primitives",
    description:
      "Compose layouts and UI components with full TypeScript type safety and zero runtime styling overhead:",
    codeSnippet: `import { Button, Stack, Flex, Input, Badge, Card } from "@yuva-devlab/ui";

export default function MyPage() {
  return (
    <Card>
      <Stack gap="4">
        <Flex justify="between" align="center">
          <h2>DevLab Project</h2>
          <Badge variant="success">Active</Badge>
        </Flex>
        <Input placeholder="Enter prompt..." />
        <Button variant="default">Deploy Agent</Button>
      </Stack>
    </Card>
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
