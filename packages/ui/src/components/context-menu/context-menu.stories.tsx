import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "./context-menu";

const meta: Meta<typeof ContextMenu> = {
  title: "Components/ContextMenu",
  component: ContextMenu,
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="dl-card dl-story-w-md dl-center dl-p-8 dl-select-none">
        Right click here to open context menu
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>View Logs</ContextMenuItem>
        <ContextMenuItem>Restart Execution</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="dl-text-destructive">
          Terminate Session
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
