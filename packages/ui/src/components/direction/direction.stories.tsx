import type { Meta, StoryObj } from "@storybook/react";
import { Direction } from "./direction";

const meta: Meta<typeof Direction> = {
  title: "Components/Direction",
  component: Direction,
};

export default meta;
type Story = StoryObj<typeof Direction>;

/** Left-to-right content. */
export const LeftToRight: Story = {
  args: { dir: "ltr", children: "The quick brown fox." },
};

/** Right-to-left content. */
export const RightToLeft: Story = {
  args: { dir: "rtl", lang: "ar", children: "مرحبا، كيف يمكنني مساعدتك؟" },
};
