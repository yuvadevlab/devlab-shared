import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./sheet";
import { Button } from "@/components/button/button";

const meta: Meta<typeof Sheet> = {
  title: "Components/Sheet",
  component: Sheet,
};

export default meta;
type Story = StoryObj<typeof Sheet>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline">Open Side Sheet</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Agent Run Configuration</SheetTitle>
            <SheetDescription>
              Configure sandbox parameters and thread allowances.
            </SheetDescription>
          </SheetHeader>
          <div className="dl-p-4">
            <p>Execution Mode: Autonomous Agent Swarm</p>
          </div>
        </SheetContent>
      </Sheet>
    );
  },
};
