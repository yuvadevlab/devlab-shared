import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "./drawer";
import { Button } from "@/components/button/button";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline">Open Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Telemetry Insights</DrawerTitle>
              <DrawerDescription>
                Detailed overview of memory usage and cluster thread allocation.
              </DrawerDescription>
            </DrawerHeader>
            <div className="dl-p-4">
              <p>Cluster load: 42% nominal throughput.</p>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    );
  },
};
