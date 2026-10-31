import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./label";
import { Input } from "@/components/input/input";
import { Stack } from "@/components/layout/stack";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render: () => (
    <Stack gap={2} className="dl-story-w-sm">
      <Label htmlFor="cluster-id">Cluster Identifier</Label>
      <Input id="cluster-id" defaultValue="cluster-us-east-1" />
    </Stack>
  ),
};
