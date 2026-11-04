import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Kbd, KbdGroup } from "./kbd";

const meta: Meta<typeof Kbd> = {
  title: "Components/Kbd",
  component: Kbd,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "ghost"],
      description: "Visual appearance style",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Keycap dimensions",
    },
  },
  args: {
    variant: "default",
    size: "md",
    children: "⌘K",
  },
};

export default meta;
type Story = StoryObj<typeof Kbd>;

export const Default: Story = {
  render: (args) => <Kbd {...args} />,
};

export const Sizes: Story = {
  render: () => (
    <div className="dl-flex-row-gap-3 dl-items-center">
      <Kbd size="sm">⌘K</Kbd>
      <Kbd size="md">⌘K</Kbd>
      <Kbd size="lg">⌘K</Kbd>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="dl-flex-row-gap-3 dl-items-center">
      <Kbd variant="default">Ctrl</Kbd>
      <Kbd variant="outline">Alt</Kbd>
      <Kbd variant="ghost">Shift</Kbd>
    </div>
  ),
};

export const ShortcutGroup: Story = {
  render: () => (
    <div className="dl-flex-col-gap-3">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>

      <KbdGroup separator="+">
        <Kbd>Ctrl</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>P</Kbd>
      </KbdGroup>
    </div>
  ),
};
