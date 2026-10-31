import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { StatusBadge } from "./status-badge";

const meta: Meta<typeof StatusBadge> = {
  title: "Components/StatusBadge",
  component: StatusBadge,
  argTypes: {
    status: {
      control: "text",
      description: "Status string text",
    },
  },
  args: {
    status: "Active",
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Default: Story = {};

export const AllStatuses: Story = {
  render: () => (
    <div className="dl-story-row">
      <StatusBadge status="Active" />
      <StatusBadge status="Completed" />
      <StatusBadge status="In Progress" />
      <StatusBadge status="Needs Approval" />
      <StatusBadge status="Failed" />
      <StatusBadge status="Offline" />
    </div>
  ),
};
