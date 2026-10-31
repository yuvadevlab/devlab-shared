import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./toggle";
import { Bold } from "lucide-react";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  render: () => {
    const [pressed, setPressed] = useState(false);
    return (
      <Toggle
        pressed={pressed}
        onPressedChange={setPressed}
        aria-label="Toggle Bold"
      >
        <Bold size={16} />
      </Toggle>
    );
  },
};
