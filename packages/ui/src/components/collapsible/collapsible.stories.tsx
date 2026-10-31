import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./collapsible";
import { Button } from "@/components/button/button";
import { ChevronsUpDown } from "lucide-react";
import { Stack } from "@/components/layout/stack";

const meta: Meta<typeof Collapsible> = {
  title: "Components/Collapsible",
  component: Collapsible,
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="dl-story-w-sm dl-card dl-p-4">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="dl-story-row dl-flex--between">
            <h4>Agent Configuration</h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronsUpDown size={16} />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <Stack gap={2} className="dl-pt-4">
              <div>Timeout: 30,000ms</div>
              <div>Max Iterations: 25</div>
              <div>Cache Strategy: Semantic OKLCH</div>
            </Stack>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  },
};
