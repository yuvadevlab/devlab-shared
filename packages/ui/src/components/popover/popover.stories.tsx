import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { Button } from "@/components/button/button";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Inspect Diagnostics</Button>
      </PopoverTrigger>
      <PopoverContent className="dl-story-w-sm dl-p-4">
        <h4>Diagnostic Parameters</h4>
        <p className="dl-text-sm dl-text-muted-foreground dl-pt-2">
          Realtime heartbeat intervals configured at 15s cadence.
        </p>
      </PopoverContent>
    </Popover>
  ),
};
