import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ContextUsage } from "./context";

const meta: Meta<typeof ContextUsage> = {
  title: "AI Elements/ContextUsage",
  component: ContextUsage,
};

export default meta;
type Story = StoryObj<typeof ContextUsage>;

export const Default: Story = {
  render: () => (
    <div className="dl-story-w-md dl-story-col">
      <ContextUsage
        label="Claude 3.5 Sonnet (200k)"
        usedTokens={48200}
        maxTokens={200000}
        breakdown={{
          inputTokens: 42000,
          outputTokens: 6200,
          cachedTokens: 38000,
        }}
      />

      <ContextUsage
        label="Context Warning (78%)"
        usedTokens={156000}
        maxTokens={200000}
        breakdown={{
          inputTokens: 142000,
          outputTokens: 14000,
        }}
      />

      <ContextUsage
        label="Context Near Limit (94%)"
        usedTokens={188000}
        maxTokens={200000}
        breakdown={{
          inputTokens: 170000,
          outputTokens: 18000,
        }}
      />
    </div>
  ),
};

export const CompactHoverPill: Story = {
  render: () => (
    <div className="dl-story-row">
      <ContextUsage
        variant="compact"
        label="Gemini 2.5 Pro (1M)"
        usedTokens={64200}
        maxTokens={200000}
        breakdown={{
          inputTokens: 52000,
          outputTokens: 12200,
          reasoningTokens: 8400,
          cachedTokens: 31000,
        }}
      />
    </div>
  ),
};
