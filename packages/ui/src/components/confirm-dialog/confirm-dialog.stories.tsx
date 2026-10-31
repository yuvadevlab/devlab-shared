import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ConfirmDialog } from "./confirm-dialog";
import { Button } from "@/components/button/button";

const meta: Meta<typeof ConfirmDialog> = {
  title: "Components/ConfirmDialog",
  component: ConfirmDialog,
};

export default meta;
type Story = StoryObj<typeof ConfirmDialog>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Run Agent Task</Button>
        <ConfirmDialog
          open={open}
          onOpenChange={setOpen}
          title="Confirm Workflow Execution"
          description="Are you sure you want to trigger this distributed task across 12 agent nodes?"
          onConfirm={() => setOpen(false)}
        />
      </div>
    );
  },
};
