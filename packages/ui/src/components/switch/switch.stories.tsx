import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return (
      <div className="dl-story-row">
        <Switch
          id="auto-retry"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <label htmlFor="auto-retry" className="dl-cursor-pointer">
          Enable Autonomous Self-Healing
        </label>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="dl-story-col">
      <div className="dl-story-row">
        <Switch disabled checked={true} />
        <span>Disabled (Checked)</span>
      </div>
      <div className="dl-story-row">
        <Switch disabled checked={false} />
        <span>Disabled (Unchecked)</span>
      </div>
    </div>
  ),
};
