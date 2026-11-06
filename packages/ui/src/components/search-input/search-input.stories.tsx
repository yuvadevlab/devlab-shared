import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SearchInput } from "./search-input";

const meta: Meta<typeof SearchInput> = {
  title: "Components/SearchInput",
  component: SearchInput,
  argTypes: {
    placeholder: {
      control: "text",
      description: "Search placeholder hint",
    },
    disabled: {
      control: "boolean",
      description: "Whether the search field is disabled",
    },
    loading: {
      control: "boolean",
      description: "Whether to render an active loading indicator",
    },
  },
  args: {
    placeholder: "Search applications, agents, credentials...",
    disabled: false,
    loading: false,
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  render: (args) => {
    const [val, setVal] = useState("");
    return (
      <div className="dl-story-w-sm">
        <SearchInput
          {...args}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onClear={() => setVal("")}
        />
      </div>
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [val, setVal] = useState("FinAI Gateway");
    return (
      <div className="dl-story-w-sm">
        <SearchInput
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onClear={() => setVal("")}
        />
      </div>
    );
  },
};

export const LoadingState: Story = {
  render: () => (
    <div className="dl-story-w-sm">
      <SearchInput loading value="Querying index..." readOnly />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="dl-story-w-sm">
      <SearchInput disabled placeholder="Search index offline" />
    </div>
  ),
};
