import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CopyButton } from "./copy-button";
import { Flex } from "@/components/layout/flex";

const meta: Meta<typeof CopyButton> = {
  title: "Components/CopyButton",
  component: CopyButton,
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const Default: Story = {
  render: () => (
    <Flex align="center" gap={3} className="dl-card dl-p-4 dl-story-w-md">
      <code className="dl-flex-1">pnpm add @yuva-devlab/ui</code>
      <CopyButton textToCopy="pnpm add @yuva-devlab/ui" />
    </Flex>
  ),
};
