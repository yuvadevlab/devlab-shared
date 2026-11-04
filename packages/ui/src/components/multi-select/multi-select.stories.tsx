import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MultiSelect } from "./multi-select";

const sampleOptions = [
  { label: "Engineering", value: "eng" },
  { label: "Product Management", value: "pm" },
  { label: "UX / UI Design", value: "design" },
  { label: "Quality Assurance", value: "qa" },
  { label: "DevOps & Cloud", value: "devops" },
  { label: "Security & IAM", value: "security" },
];

const meta: Meta<typeof MultiSelect> = {
  title: "Components/MultiSelect",
  component: MultiSelect,
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text when nothing is selected",
    },
    disabled: {
      control: "boolean",
      description: "Whether the multi-select dropdown is disabled",
    },
    maxCount: {
      control: "number",
      description: "Maximum tag chips displayed before collapsing into +N more",
    },
    showActions: {
      control: "boolean",
      description: "Whether Select All and Clear buttons are visible",
    },
  },
  args: {
    options: sampleOptions,
    placeholder: "Select teams...",
    disabled: false,
    maxCount: 3,
    showActions: true,
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

export const Default: Story = {
  render: (args) => (
    <div className="dl-story-w-sm">
      <MultiSelect {...args} />
    </div>
  ),
};

export const WithPresetSelections: Story = {
  render: () => (
    <div className="dl-story-w-sm">
      <MultiSelect
        options={sampleOptions}
        defaultValue={["eng", "design"]}
        placeholder="Select teams..."
      />
    </div>
  ),
};

export const CompactMaxChips: Story = {
  render: () => (
    <div className="dl-story-w-sm">
      <MultiSelect
        options={sampleOptions}
        defaultValue={["eng", "pm", "design", "security"]}
        maxCount={2}
        placeholder="Select teams..."
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="dl-story-w-sm">
      <MultiSelect
        disabled
        options={sampleOptions}
        defaultValue={["eng"]}
        placeholder="Select teams..."
      />
    </div>
  ),
};
