import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Terminal, TerminalEntryLevel, type TerminalEntry } from "./terminal";

const meta: Meta<typeof Terminal> = {
  title: "AI Elements/Terminal",
  component: Terminal,
};

export default meta;
type Story = StoryObj<typeof Terminal>;

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

export const Default: Story = {
  args: {
    command: "pnpm --filter @yuva-devlab/ui build",
    output: `tsup src/index.ts --format esm,cjs --dts
✓ ESM dist/index.js 114.2 KB
✓ DTS dist/index.d.ts 48.9 KB`,
  },
};

export const StructuredTelemetry: Story = {
  render: () => (
    <div className="dl-story-w-lg">
      <Terminal
        command="Live Agent Telemetry"
        entries={sampleEntries}
        isStreaming
      />
    </div>
  ),
};
