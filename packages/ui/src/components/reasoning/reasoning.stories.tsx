import type { Meta, StoryObj } from "@storybook/react";
import { Reasoning } from "./reasoning";

const meta: Meta<typeof Reasoning> = {
  title: "AI Elements/Reasoning",
  component: Reasoning,
};

export default meta;
type Story = StoryObj<typeof Reasoning>;

/** Collapsible model reasoning region. */
export const Default: Story = {
  args: {
    duration: "2.4s",
    children: "Checking the request and comparing the relevant code paths.",
  },
};
