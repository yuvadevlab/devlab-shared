import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";

const meta: Meta<typeof ToggleGroup> = {
  title: "Components/ToggleGroup",
  component: ToggleGroup,
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  render: () => {
    const [align, setAlign] = useState("center");
    return (
      <ToggleGroup
        type="single"
        value={align}
        onValueChange={(v) => v && setAlign(v)}
      >
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeft size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <AlignCenter size={16} />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <AlignRight size={16} />
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
};
