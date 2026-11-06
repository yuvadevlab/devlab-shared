"use client";

import React from "react";
import { Terminal } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

const sampleBuildOutput = `turbo 2.4.4
• Running build in 3 packages
@yuva-devlab/tokens:build: cache hit, replaying logs
@yuva-devlab/ui:build: tsup src/index.ts --format esm,cjs --dts
@yuva-devlab/ui:build: ✓ built in 842ms
@yuva-devlab/portal:build: ✓ Compiled successfully in 1.4s
Tasks:    3 successful, 3 total
Time:     1.624s`;

export default function TerminalDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "default",
      title: "Command Execution Log",
      description:
        "Terminal window container displaying executed command, window control buttons, and logs.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <div className="w-full max-w-xl">
            <Terminal command="pnpm build" output={sampleBuildOutput} />
          </div>
        </div>
      ),
      codeSnippet: `<Terminal
  command="pnpm build"
  output={\`turbo 2.4.4
@yuva-devlab/ui:build: ✓ built in 842ms\`}
/>`,
    },
    {
      id: "streaming",
      title: "Docker Compose Logs",
      description: "Terminal running multi-container setup tasks.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <div className="w-full max-w-xl">
            <Terminal
              command="docker compose up -d"
              output={`[+] Running 3/3
 ✔ Network devlab-network        Created
 ✔ Container devlab-postgres-1   Started
 ✔ Container devlab-redis-1      Started`}
            />
          </div>
        </div>
      ),
      codeSnippet: `<Terminal
  command="docker compose up -d"
  output="[+] Running 3/3..."
/>`,
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "command",
      type: "string",
      default: "—",
      description: "CLI command string displayed in title and prompt line.",
    },
    {
      name: "output",
      type: "string",
      default: "—",
      description: "Preformatted terminal output stream.",
    },
    {
      name: "maxHeight",
      type: "string",
      default: '"16rem"',
      description: "Maximum height for the terminal scrollable area.",
    },
    {
      name: "windowControls",
      type: "boolean",
      default: "true",
      description: "Whether to render Mac-style 3 dots in the terminal header.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    {
      name: ".dl-terminal",
      description: "Monospace dark card container with border styling.",
    },
    {
      name: ".dl-terminal__header",
      description: "Top bar with window dots, title, and copy action.",
    },
    {
      name: ".dl-terminal__output",
      description: "Preformatted scrolling area for shell output.",
    },
    {
      name: ".dl-terminal__prompt-line",
      description: "Highlighted dollar prompt ($) command line.",
    },
  ];

  return (
    <ComponentView
      title="Terminal"
      description="Shell command execution terminal for displaying CLI commands, daemon process outputs, and agent bash tool execution logs."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
