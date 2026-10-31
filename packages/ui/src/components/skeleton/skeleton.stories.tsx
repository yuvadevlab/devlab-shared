import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./skeleton";
import { Flex } from "@/components/layout/flex";
import { Stack } from "@/components/layout/stack";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => (
    <div className="dl-story-w-sm">
      <Flex align="center" gap={4}>
        <Skeleton className="dl-skeleton-avatar" />
        <Stack gap={2} className="dl-flex-1">
          <Skeleton className="dl-skeleton-line" />
          <Skeleton className="dl-skeleton-line" />
        </Stack>
      </Flex>
    </div>
  ),
};

export const CardSkeleton: Story = {
  render: () => (
    <div className="dl-card dl-story-w-sm">
      <Stack gap={3}>
        <Skeleton className="dl-skeleton-card-media" />
        <Skeleton className="dl-skeleton-title" />
        <Skeleton className="dl-skeleton-line" />
        <Skeleton className="dl-skeleton-line" />
      </Stack>
    </div>
  ),
};
