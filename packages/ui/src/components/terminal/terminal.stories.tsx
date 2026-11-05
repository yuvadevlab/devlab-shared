import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Terminal, TerminalHeader, TerminalOutput } from "./terminal";

const meta: Meta<typeof Terminal> = {
  title: "AI Elements/Terminal",
  component: Terminal,
};

export default meta;
type Story = StoryObj<typeof Terminal>;

const sampleOutput = `turbo 2.4.4
• Packages in scope: @yuva-devlab/portal, @yuva-devlab/ui, @yuva-devlab/tokens
• Running build in 3 packages
@yuva-devlab/tokens:build: cache hit, replaying logs
@yuva-devlab/ui:build: tsup src/index.ts --format esm,cjs --dts
@yuva-devlab/ui:build: ✓ built in 842ms
@yuva-devlab/portal:build: ✓ Compiled successfully in 1.4s
Tasks:    3 successful, 3 total
Cached:   1 cached, 3 total
Time:     1.624s`;

export const Default: Story = {
  render: () => (
    <div className="dl-story-w-lg">
      <Terminal command="pnpm build" output={sampleOutput} defaultOpen />
    </div>
  ),
};

export const StreamingLogs: Story = {
  render: () => (
    <div className="dl-story-w-lg">
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
  ),
};

export const CustomComposition: Story = {
  render: () => (
    <div className="dl-story-w-lg">
      <div className="dl-terminal">
        <TerminalHeader
          command="git push origin main"
          output="Pushing to repo..."
        />
        <TerminalOutput command="git push origin main">
          {`Enumerating objects: 14, done.
Counting objects: 100% (14/14), done.
Writing objects: 100% (8/8), 1.42 KiB | 1.42 MiB/s, done.
Total 8 (delta 6), reused 0 (delta 0), pack-reused 0
To github.com:yuvadevlab/devlab-shared.git
   20025f7..e5519f8  main -> main`}
        </TerminalOutput>
      </div>
    </div>
  ),
};
