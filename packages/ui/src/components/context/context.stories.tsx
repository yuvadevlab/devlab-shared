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
    <div className="dl-story-w-md space-y-4">
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
