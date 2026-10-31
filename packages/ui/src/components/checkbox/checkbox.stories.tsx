import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState<boolean | "indeterminate">(true);
    return (
      <div className="dl-story-row">
        <Checkbox
          id="terms"
          checked={checked}
          onCheckedChange={(val) => setChecked(val)}
        />
        <label htmlFor="terms" className="dl-cursor-pointer">
          Enable automatic model checkpoints
        </label>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="dl-story-col">
      <div className="dl-story-row">
        <Checkbox disabled checked={true} id="d1" />
        <label htmlFor="d1">Disabled (Checked)</label>
      </div>
      <div className="dl-story-row">
        <Checkbox disabled checked={false} id="d2" />
        <label htmlFor="d2">Disabled (Unchecked)</label>
      </div>
    </div>
  ),
};
