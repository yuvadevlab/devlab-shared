import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SearchableSelect } from "./searchable-select";

const options = [
  { value: "gemini-pro", label: "Gemini 2.5 Pro (Google)" },
  { value: "gemini-flash", label: "Gemini 2.5 Flash (Google)" },
  { value: "claude-sonnet", label: "Claude 3.7 Sonnet (Anthropic)" },
  { value: "claude-haiku", label: "Claude 3.5 Haiku (Anthropic)" },
];

const meta: Meta<typeof SearchableSelect> = {
  title: "Components/SearchableSelect",
  component: SearchableSelect,
};

export default meta;
type Story = StoryObj<typeof SearchableSelect>;

export const Default: Story = {
  render: () => {
    const [val, setVal] = useState("gemini-pro");
    return (
      <div className="dl-story-w-sm">
        <SearchableSelect
          options={options}
          value={val}
          onChange={setVal}
          placeholder="Search models..."
        />
      </div>
    );
  },
};
