import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Shimmer, ShimmerElement, ShimmerSpeed } from "./shimmer";

const meta: Meta<typeof Shimmer> = {
  title: "AI Elements/Shimmer",
  component: Shimmer,
};

export default meta;
type Story = StoryObj<typeof Shimmer>;

export const ActiveNarration: Story = {
  render: () => (
    <div className="dl-story-col">
      <Shimmer>Scanning 28 transactions from May 2026…</Shimmer>
      <Shimmer speed={ShimmerSpeed.FAST}>
        Comparing Dining Out against ₹10,000 budget…
      </Shimmer>
      <Shimmer active={false}>Completed analysis in 1.8s</Shimmer>
    </div>
  ),
};

export const ParagraphBlock: Story = {
  render: () => (
    <Shimmer as={ShimmerElement.PARAGRAPH}>
      Synthesizing personalized cashflow recommendations…
    </Shimmer>
  ),
};
