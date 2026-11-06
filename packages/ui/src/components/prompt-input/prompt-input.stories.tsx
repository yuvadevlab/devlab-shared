import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PromptInput } from "./prompt-input";
import { Badge } from "@/components/badge";

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
  render: () => (
    <div className="dl-story-w-lg">
      <PromptInput
        defaultValue="Analyze query performance on the users index"
        modelSelector={<Badge variant="outline">Claude 3.5 Sonnet</Badge>}
        attachments={[
          { id: "1", name: "query-plan.json" },
          { id: "2", name: "schema.prisma" },
        ]}
      />
    </div>
  ),
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
