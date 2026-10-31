import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "./calendar";

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div className="dl-card dl-story-w-xs">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </div>
    );
  },
};
