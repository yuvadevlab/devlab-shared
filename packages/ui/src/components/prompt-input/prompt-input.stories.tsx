import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PromptInput } from "./prompt-input";
import { ModelSelector } from "@/components/model-selector";

const meta: Meta<typeof PromptInput> = {
  title: "AI Elements/PromptInput",
  component: PromptInput,
};

export default meta;
type Story = StoryObj<typeof PromptInput>;

export const Default: Story = {
  render: () => (
    <div className="dl-story-w-lg">
      <PromptInput
        placeholder="Ask anything or request code edits..."
        onSubmit={(text, files) => {
          alert(`Submitted: ${text} with ${files.length} files`);
        }}
      />
    </div>
  ),
};

export const WithAttachmentsAndModel: Story = {
  render: () => {
    const [model, setModel] = useState("claude-3-5-sonnet");
    return (
      <div className="dl-story-w-lg">
        <PromptInput
          defaultValue="Review the attached query plan and schema."
          modelSelector={
            <ModelSelector size="sm" value={model} onValueChange={setModel} />
          }
          attachments={[
            { id: "1", name: "query-plan.json" },
            { id: "2", name: "schema.prisma" },
          ]}
        />
      </div>
    );
  },
};

export const StreamingState: Story = {
  render: () => (
    <div className="dl-story-w-lg">
      <PromptInput
        isGenerating
        defaultValue="Refactoring authentication controller to use JWT cookies..."
        onStop={() => alert("Generation stopped")}
      />
    </div>
  ),
};
