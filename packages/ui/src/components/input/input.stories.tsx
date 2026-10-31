import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Search, Mail, Eye, Key } from "lucide-react";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text displayed when input is empty",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is non-interactive",
    },
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "search"],
      description: "HTML input type",
    },
  },
  args: {
    placeholder: "Type something...",
    disabled: false,
    type: "text",
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: (args) => (
    <div className="dl-story-w-sm">
      <Input {...args} />
    </div>
  ),
};

export const WithStartIcon: Story = {
  render: () => (
    <div className="dl-story-col dl-story-w-sm">
      <Input
        placeholder="Search agents, workspaces..."
        startIcon={<Search size={16} />}
      />
      <Input
        type="email"
        placeholder="user@devlab.ai"
        startIcon={<Mail size={16} />}
      />
    </div>
  ),
};

export const WithEndIcon: Story = {
  render: () => (
    <div className="dl-story-w-sm">
      <Input
        type="password"
        placeholder="Enter secret key..."
        startIcon={<Key size={16} />}
        endIcon={
          <button
            type="button"
            aria-label="Toggle password visibility"
            className="dl-btn--ghost"
          >
            <Eye size={16} />
          </button>
        }
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="dl-story-w-sm">
      <Input
        disabled
        placeholder="Disabled input field"
        value="System locked parameter"
      />
    </div>
  ),
};
