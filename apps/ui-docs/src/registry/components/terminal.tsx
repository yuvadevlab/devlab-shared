"use client";

import React from "react";
import { Terminal } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";
import { createExampleSource } from "@/lib/create-example-source";

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
        "Expandable command trace with a copyable, scrollable output block.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <div className="w-full max-w-xl">
            <Terminal
              command="pnpm build"
              output={sampleBuildOutput}
              defaultOpen
            />
          </div>
        </div>
      ),
      codeSnippet: createExampleSource({
        imports: ["Terminal"],
        setup: `const output = \`turbo 2.4.4
• Running build in 3 packages
@yuva-devlab/ui:build: ✓ built in 842ms
Tasks: 3 successful, 3 total
Time: 1.624s\`;`,
        body: `<Terminal
  command="pnpm build"
  output={output}
  defaultOpen
/>`,
      }),
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
              isStreaming
              defaultOpen
              output={`[+] Running 3/3
 ✔ Network devlab-network        Created
 ✔ Container devlab-postgres-1   Started
 ✔ Container devlab-redis-1      Started`}
            />
          </div>
        </div>
      ),
      codeSnippet: createExampleSource({
        imports: ["Terminal"],
        setup: `const output = \`[+] Running 3/3
✔ Network devlab-network        Created
✔ Container devlab-postgres-1   Started
✔ Container devlab-redis-1      Started\`;`,
        body: `<Terminal
  command="docker compose up -d"
  output={output}
  isStreaming
  defaultOpen
/>`,
      }),
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "command",
      type: "string",
      default: "—",
      description: "Command displayed in the trace line and output.",
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
      name: "isStreaming",
      type: "boolean",
      default: "false",
      description: "Shows a running indicator and opens output initially.",
    },
    {
      name: "defaultOpen",
      type: "boolean",
      default: "isStreaming",
      description: "Controls whether output is expanded on initial render.",
    },
    {
      name: "status",
      type: '"default" | "running" | "success" | "error"',
      default: "inferred from isStreaming and output",
      description: "Execution state used for the trace line styling.",
    },
    {
      name: "windowControls",
      type: "boolean",
      default: "false",
      description: "Whether to render legacy window dots in the command row.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    {
      name: ".dl-terminal",
      description: "Wrapper for the command trace and output block.",
    },
    {
      name: ".dl-terminal__trigger",
      description:
        "Interactive trace row that expands or collapses the output.",
    },
    {
      name: ".dl-terminal__code-block",
      description: "Theme-aware, scrollable code block for terminal output.",
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
