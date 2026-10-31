import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./tooltip";
import { Button } from "@/components/button/button";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover for Info</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Autonomous Agent Worker #42</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
