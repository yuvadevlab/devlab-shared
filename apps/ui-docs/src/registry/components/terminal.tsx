"use client";

import React from "react";
import {
  Terminal,
  TerminalEntryLevel,
  type TerminalEntry,
} from "@yuva-devlab/ui";
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
@yuva-devlab/ui:build: ✓ built in 842ms`;

const sampleEntries: TerminalEntry[] = [
  {
    id: "1",
    elapsedMs: 120,
    level: TerminalEntryLevel.CTX,
    message: "Loaded 4 accounts, 28 transactions, 5 budgets",
  },
  {
    id: "2",
    elapsedMs: 410,
    level: TerminalEntryLevel.TOOL,
    message: "transactions.summarize",
    detail: "48ms",
  },
  {
    id: "3",
    elapsedMs: 1450,
    level: TerminalEntryLevel.DONE,
    message: "Grounded response finalized",
  },
];

const COMMAND_CODE = `import { Terminal } from "@yuva-devlab/ui";

const BUILD_LOG = \`turbo 2.4.4
• Running build in 3 packages
@yuva-devlab/tokens:build: cache hit, replaying logs
@yuva-devlab/ui:build: ✓ built in 842ms\`;

export function TerminalCommandDemo() {
  return <Terminal command="pnpm build" output={BUILD_LOG} />;
}`;

const TELEMETRY_CODE = `import {
  Terminal,
  TerminalEntryLevel,
  type TerminalEntry,
} from "@yuva-devlab/ui";

const ENTRIES: TerminalEntry[] = [
  {
    id: "1",
    elapsedMs: 120,
    level: TerminalEntryLevel.CTX,
    message: "Loaded 4 accounts, 28 transactions",
  },
  {
    id: "2",
    elapsedMs: 410,
    level: TerminalEntryLevel.TOOL,
    message: "transactions.summarize",
    detail: "48ms",
  },
];

export function LiveTelemetryTerminalDemo() {
  return (
    <Terminal
      command="Live Agent Stream"
      entries={ENTRIES}
      isStreaming
    />
  );
}`;

export default function TerminalDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "default",
      title: "Command Execution Log",
      description:
        "Terminal window container displaying executed command, controls, and output.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <Terminal command="pnpm build" output={sampleBuildOutput} />
        </div>
      ),
      codeSnippet: COMMAND_CODE,
    },
    {
      id: "telemetry",
      title: "Live Structured Telemetry Stream",
      description:
        "Timestamped agent execution events with severity badges and live auto-scroll.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <Terminal
            command="Live Agent Stream"
            entries={sampleEntries}
            isStreaming
          />
        </div>
      ),
      codeSnippet: TELEMETRY_CODE,
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "command",
      type: "string",
      default: "—",
      description: "CLI command or stream title displayed in header.",
    },
    {
      name: "entries",
      type: "TerminalEntry[]",
      default: "—",
      description: "Structured timestamped log entries with level badges.",
    },
    {
      name: "isStreaming",
      type: "boolean",
      default: "false",
      description: "Shows live running badge and auto-scrolls new rows.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    { name: ".dl-terminal", description: "Monospace terminal container." },
    { name: ".dl-terminal__header", description: "Top toolbar with controls." },
    { name: ".dl-terminal__entries", description: "Structured log row list." },
  ];

  return (
    <ComponentView
      title="Terminal"
      description="Execution terminal for displaying CLI outputs and live structured agent telemetry logs."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
