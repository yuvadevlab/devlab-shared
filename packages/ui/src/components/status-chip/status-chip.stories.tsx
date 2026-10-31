import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { StatusChip } from "./status-chip";
import { Flex } from "@/components/layout/flex";

const meta: Meta<typeof StatusChip> = {
  title: "Components/StatusChip",
  component: StatusChip,
};

export default meta;
type Story = StoryObj<typeof StatusChip>;

export const Default: Story = {
  render: () => (
    <Flex gap={3}>
      <StatusChip status="running" />
      <StatusChip status="waiting" />
      <StatusChip status="failed" />
    </Flex>
  ),
};
