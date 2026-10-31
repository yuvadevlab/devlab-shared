import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./hover-card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/avatar/avatar";
import { Stack } from "@/components/layout/stack";
import { Flex } from "@/components/layout/flex";

const meta: Meta<typeof HoverCard> = {
  title: "Components/HoverCard",
  component: HoverCard,
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="dl-cursor-pointer dl-text-primary">@devlab-ai</span>
      </HoverCardTrigger>
      <HoverCardContent className="dl-story-w-sm">
        <Flex gap={3}>
          <Avatar>
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <Stack gap={1}>
            <h4 className="dl-font-semibold">DevLab Foundation</h4>
            <p className="dl-text-sm dl-text-muted-foreground">
              Autonomous cognitive execution platform.
            </p>
          </Stack>
        </Flex>
      </HoverCardContent>
    </HoverCard>
  ),
};
