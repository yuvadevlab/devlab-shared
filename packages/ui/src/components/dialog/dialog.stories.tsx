import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./dialog";
import { Button } from "@/components/button/button";
import { Input } from "@/components/input/input";
import { Stack } from "@/components/layout/stack";

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="default">Edit Agent Profile</Button>
          </DialogTrigger>
          <DialogContent className="dl-story-w-md">
            <DialogHeader>
              <DialogTitle>Edit Agent Profile</DialogTitle>
              <DialogDescription>
                Make changes to your autonomous agent parameters here. Click
                save when complete.
              </DialogDescription>
            </DialogHeader>
            <Stack gap={3}>
              <div>
                <label className="dl-label">Agent Name</label>
                <Input defaultValue="DevLab Core Agent" />
              </div>
              <div>
                <label className="dl-label">Model Endpoint</label>
                <Input defaultValue="gemini-2.5-pro" />
              </div>
            </Stack>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
};
