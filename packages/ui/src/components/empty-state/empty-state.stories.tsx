import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./empty-state";
import { ServerOff } from "lucide-react";
import { Button } from "@/components/button/button";

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  render: () => (
    <div className="dl-story-w-md dl-card">
      <EmptyState
        icon={<ServerOff className="dl-icon-lg" />}
        title="No Active Agents Found"
        description="Get started by deploying a new agent pipeline to your cluster."
        action={<Button variant="default">Deploy Agent</Button>}
      />
    </div>
  ),
};
