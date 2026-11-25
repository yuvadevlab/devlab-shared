import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Reasoning, ReasoningContent, ReasoningTrigger } from "./reasoning";

const meta: Meta<typeof Reasoning> = {
  title: "AI Elements/Reasoning",
  component: Reasoning,
};

export default meta;
type Story = StoryObj<typeof Reasoning>;

export const Streaming: Story = {
  render: () => (
    <div className="dl-story-w-lg">
      <Reasoning isStreaming defaultOpen autoCollapse={false}>
        <ReasoningTrigger />
        <ReasoningContent>
          Checking Dining Out category spend across May 2026 transactions...
          Comparing ₹14,200 actual outflow against ₹10,000 monthly limit.
        </ReasoningContent>
      </Reasoning>
    </div>
  ),
};

export const Completed: Story = {
  render: () => (
    <div className="dl-story-w-lg">
      <Reasoning isStreaming={false} durationMs={2450} defaultOpen>
        <ReasoningTrigger />
        <ReasoningContent>
          1. Aggregated 28 transactions from HDFC Salary and Axis Credit Card.
          2. Identified ₹4,200 budget overrun in Dining Out driven by weekend
          orders. 3. Verified ₹18,500 remaining safe-to-spend buffer for this
          month.
        </ReasoningContent>
      </Reasoning>
    </div>
  ),
};
