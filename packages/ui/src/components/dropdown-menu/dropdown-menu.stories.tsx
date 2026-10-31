import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./dropdown-menu";
import { Button } from "@/components/button/button";
import { MoreHorizontal } from "lucide-react";

const meta: Meta<typeof DropdownMenu> = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Node Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Inspect Metrics</DropdownMenuItem>
        <DropdownMenuItem>Scale Pods</DropdownMenuItem>
        <DropdownMenuItem className="dl-text-destructive">
          Drain Node
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
