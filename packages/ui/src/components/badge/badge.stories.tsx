import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Bell, Mail } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "@/components/button";
import { Avatar, AvatarFallback } from "@/components/avatar";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "success",
        "warning",
        "info",
        "outline",
      ],
      description: "Visual style variant of the badge",
    },
    count: {
      control: "number",
      description: "Numeric count for notification badge",
    },
    dot: {
      control: "boolean",
      description: "Whether to render a status dot",
    },
  },
  args: {
    children: "Status Badge",
    variant: "default",
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div className="dl-story-row">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Active / Success</Badge>
      <Badge variant="warning">Pending / Warning</Badge>
      <Badge variant="info">Syncing / Info</Badge>
      <Badge variant="destructive">Error / Failed</Badge>
    </div>
  ),
};

export const NotificationCounts: Story = {
  render: () => (
    <div className="dl-story-row">
      <Badge count={5}>
        <Button variant="outline" size="icon">
          <Bell className="size-4" />
        </Button>
      </Badge>

      <Badge count={120} overflowCount={99}>
        <Button variant="outline" size="icon">
          <Mail className="size-4" />
        </Button>
      </Badge>

      <Badge dot>
        <Avatar>
          <AvatarFallback>YP</AvatarFallback>
        </Avatar>
      </Badge>

      <Badge count={3} variant="default">
        <Button variant="secondary">Messages</Button>
      </Badge>
    </div>
  ),
};
