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
      "Import Tailwind CSS, the token preset, your brand theme, and component styles into your app's global stylesheet:",
    codeSnippet: `@import "tailwindcss";
@import "@yuva-devlab/tokens/preset.css";
@import "@yuva-devlab/tokens/themes/orchestrai.css";
@import "@yuva-devlab/ui/styles.css";

@custom-variant dark (&:where(.dark, .dark *));

@layer base {
  * {
    border-color: var(--border);
  }
  body {
    background-color: var(--background);
    color: var(--foreground);
    font-family: var(--font-sans);
  }
}`,
    language: "css",
  },
  {
    id: "use-components",
    title: "3. Use Components with Full Type Safety",
    description:
      "Import and use components anywhere in your React or Next.js tree:",
    codeSnippet: `import { Button, Input, Badge, Dialog } from "@yuva-devlab/ui";

export default function MyPage() {
  return (
    <div className="p-6 space-y-4">
      <Badge variant="success">Connected</Badge>
      <Input placeholder="Enter prompt..." />
      <Button variant="default">Deploy Agent</Button>
    </div>
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
