import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Sparkles, ArrowRight, Trash2 } from "lucide-react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      description: "Visual style variant of the button",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      description: "Size dimensions of the button",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is non-interactive",
    },
    asChild: {
      table: { disable: true },
    },
    children: {
      control: "text",
      description: "Content inside the button",
    },
  },
  args: {
    children: "Button",
    variant: "default",
    size: "default",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="dl-story-row">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="dl-story-row">
      <Button size="sm">Small</Button>
      <Button size="default">Medium (Default)</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Sparkles Action">
        <Sparkles size={16} />
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="dl-story-row">
      <Button variant="default">
        <Sparkles size={16} />
        <span>Generate AI</span>
      </Button>
      <Button variant="outline">
        <span>Next Step</span>
        <ArrowRight size={16} />
      </Button>
      <Button variant="destructive">
        <Trash2 size={16} />
        <span>Delete Project</span>
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="dl-story-row">
      <Button disabled variant="default">
        Disabled Default
      </Button>
      <Button disabled variant="secondary">
        Disabled Secondary
      </Button>
      <Button disabled variant="outline">
        Disabled Outline
      </Button>
      <Button disabled variant="destructive">
        Disabled Destructive
      </Button>
    </div>
  ),
};
