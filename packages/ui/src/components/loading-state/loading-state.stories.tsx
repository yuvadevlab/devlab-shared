import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { LoadingState } from "./loading-state";

const meta: Meta<typeof LoadingState> = {
  title: "Components/LoadingState",
  component: LoadingState,
};

export default meta;
type Story = StoryObj<typeof LoadingState>;

export const Default: Story = {
  render: () => (
    <div className="dl-card dl-p-8 dl-story-w-md dl-center">
      <LoadingState message="Synthesizing Agent Context..." />
    </div>
  ),
};
