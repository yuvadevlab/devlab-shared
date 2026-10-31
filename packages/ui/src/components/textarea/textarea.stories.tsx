import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: () => (
    <div className="dl-story-w-md">
      <Textarea
        placeholder="Enter autonomous system prompt instructions..."
        rows={4}
      />
    </div>
  ),
};
