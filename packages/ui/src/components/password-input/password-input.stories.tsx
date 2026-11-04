import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PasswordInput } from "./password-input";

const meta: Meta<typeof PasswordInput> = {
  title: "Components/PasswordInput",
  component: PasswordInput,
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text displayed when field is empty",
    },
    disabled: {
      control: "boolean",
      description: "Whether the password input is non-interactive",
    },
    showToggle: {
      control: "boolean",
      description: "Whether to render the eye show/hide toggle action",
    },
  },
  args: {
    placeholder: "Enter password...",
    disabled: false,
    showToggle: true,
  },
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  render: (args) => (
    <div className="dl-story-w-sm">
      <PasswordInput {...args} />
    </div>
  ),
};

export const WithValue: Story = {
  render: () => (
    <div className="dl-story-w-sm">
      <PasswordInput defaultValue="correct-horse-battery-staple" />
    </div>
  ),
};

export const WithoutToggle: Story = {
  render: () => (
    <div className="dl-story-w-sm">
      <PasswordInput
        showToggle={false}
        placeholder="Password without visibility toggle"
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="dl-story-w-sm">
      <PasswordInput disabled defaultValue="supersecrettoken" />
    </div>
  ),
};
