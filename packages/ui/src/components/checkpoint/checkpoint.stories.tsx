import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkpoint } from "./checkpoint";

const meta: Meta<typeof Checkpoint> = {
  title: "AI Elements/Checkpoint",
  component: Checkpoint,
};

export default meta;
type Story = StoryObj<typeof Checkpoint>;

export const Default: Story = {
  render: () => (
    <div className="dl-story-w-md">
      <Checkpoint
        label="Created git commit 8f9b1c"
        onRestore={() => alert("Restored to commit 8f9b1c")}
      />
    </div>
  ),
};

export const WithoutRestore: Story = {
  render: () => (
    <div className="dl-story-w-md">
      <Checkpoint label="Model switched to Claude 3.5 Sonnet" />
    </div>
  ),
};
