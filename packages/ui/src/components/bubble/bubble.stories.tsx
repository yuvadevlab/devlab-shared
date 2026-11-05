import type { Meta, StoryObj } from "@storybook/react";
import { Bubble } from "./bubble";

const meta: Meta<typeof Bubble> = {
  title: "AI Elements/Bubble",
  component: Bubble,
};

export default meta;
type Story = StoryObj<typeof Bubble>;

/** Assistant message bubble. */
export const Assistant: Story = {
  args: { children: "I found the cause of the issue." },
};

/** User message bubble. */
export const User: Story = {
  args: { role: "user", children: "Can you explain this error?" },
};
