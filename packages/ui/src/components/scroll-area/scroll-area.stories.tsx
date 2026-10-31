import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ScrollArea } from "./scroll-area";
import { Stack } from "@/components/layout/stack";

const meta: Meta<typeof ScrollArea> = {
  title: "Components/ScrollArea",
  component: ScrollArea,
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  render: () => (
    <div className="dl-story-w-sm dl-card">
      <ScrollArea className="dl-h-48 dl-p-4">
        <Stack gap={2}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="dl-p-2 dl-card dl-text-sm">
              Log stream trace #{i + 1}
            </div>
          ))}
        </Stack>
      </ScrollArea>
    </div>
  ),
};
