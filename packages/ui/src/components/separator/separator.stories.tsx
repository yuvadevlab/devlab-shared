import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./separator";
import { Stack } from "@/components/layout/stack";

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  render: () => (
    <Stack gap={3} className="dl-story-w-sm">
      <div>Active Cluster Region</div>
      <Separator />
      <div>US-East (N. Virginia)</div>
    </Stack>
  ),
};
