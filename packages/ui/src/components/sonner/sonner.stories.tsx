import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toaster, toast } from "./sonner";
import { Button } from "@/components/button/button";

const meta: Meta<typeof Toaster> = {
  title: "Components/Toaster",
  component: Toaster,
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  render: () => (
    <div className="dl-story-row">
      <Toaster />
      <Button
        variant="default"
        onClick={() => toast("Autonomous workflow initialized.")}
      >
        Default Toast
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.success("Model checkpoint successfully saved to registry.")
        }
      >
        Success Toast
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.warning("High token consumption detected (85% of quota).")
        }
      >
        Warning Toast
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          toast.error("Execution error: Sandbox process timeout exceeded.")
        }
      >
        Error Toast
      </Button>
    </div>
  ),
};

export const WithAction: Story = {
  render: () => (
    <div>
      <Toaster />
      <Button
        variant="default"
        onClick={() =>
          toast("Agent deployment failed", {
            description: "Cluster nodepool unschedulable due to resource quota",
            action: {
              label: "Retry",
              // eslint-disable-next-line no-console
              onClick: () => console.log("Retrying deployment..."),
            },
          })
        }
      >
        Toast with Action
      </Button>
    </div>
  ),
};
