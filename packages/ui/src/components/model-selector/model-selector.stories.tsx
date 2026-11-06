import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ModelSelector } from "./model-selector";

const meta: Meta<typeof ModelSelector> = {
  title: "AI Elements/ModelSelector",
  component: ModelSelector,
};

export default meta;
type Story = StoryObj<typeof ModelSelector>;

export const Default: Story = {
  render: () => {
    const [model, setModel] = useState("claude-3-5-sonnet");
    return (
      <div className="dl-story-w-md p-8">
        <ModelSelector value={model} onValueChange={setModel} />
      </div>
    );
  },
};

export const SmallTrigger: Story = {
  render: () => {
    const [model, setModel] = useState("gemini-2-0-flash");
    return (
      <div className="dl-story-w-md p-8">
        <ModelSelector size="sm" value={model} onValueChange={setModel} />
      </div>
    );
  },
};

export const CustomModels: Story = {
  render: () => {
    const [model, setModel] = useState("deepseek-coder");
    const customList = [
      {
        id: "deepseek-coder",
        name: "DeepSeek Coder V2",
        provider: "DeepSeek",
        description: "Specialized in 330+ programming languages.",
        tags: ["Code", "128k"],
      },
      {
        id: "llama-3-70b",
        name: "Llama 3 70B Instruct",
        provider: "Meta",
        description: "Open source standard for versatile dialogue.",
        tags: ["Open Weights"],
      },
    ];
    return (
      <div className="dl-story-w-md p-8">
        <ModelSelector
          models={customList}
          value={model}
          onValueChange={setModel}
        />
      </div>
    );
  },
};
