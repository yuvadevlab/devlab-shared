import type { Meta, StoryObj } from "@storybook/react";
import { Combobox } from "./combobox";

const meta: Meta<typeof Combobox> = {
  title: "Components/Combobox",
  component: Combobox,
};

export default meta;
type Story = StoryObj<typeof Combobox>;

/** Searchable model picker. */
export const Default: Story = {
  args: {
    options: [
      { label: "GPT-4.1", value: "gpt-4.1" },
      { label: "Claude Sonnet", value: "claude-sonnet" },
      { label: "Gemini Pro", value: "gemini-pro" },
    ],
    placeholder: "Choose a model...",
  },
};
