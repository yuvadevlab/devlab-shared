import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./date-picker";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<string>("");
    return (
      <div className="dl-story-w-sm">
        <DatePicker
          value={date}
          onChange={setDate}
          placeholder="Pick deployment date..."
        />
      </div>
    );
  },
};
