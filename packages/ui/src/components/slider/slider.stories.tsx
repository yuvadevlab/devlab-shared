import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./slider";
import { Stack } from "@/components/layout/stack";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState([45]);
    return (
      <Stack gap={2} className="dl-story-w-sm">
        <div>Sampling Temperature: {val[0]}%</div>
        <Slider value={val} onValueChange={setVal} max={100} step={1} />
      </Stack>
    );
  },
};
