import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Terminal, Database, Shield } from "lucide-react";
import { Suggestion, SuggestionList } from "./suggestion";

const meta: Meta<typeof Suggestion> = {
  title: "AI Elements/Suggestion",
  component: Suggestion,
};

export default meta;
type Story = StoryObj<typeof Suggestion>;

export const Default: Story = {
  render: () => (
    <div className="dl-story-w-lg">
      <SuggestionList>
        <Suggestion
          icon={<Terminal aria-hidden="true" />}
          label="Analyze build failure in apps/web"
        />
        <Suggestion
          icon={<Database aria-hidden="true" />}
          label="Generate schema migration for tenant_id"
        />
        <Suggestion
          icon={<Shield aria-hidden="true" />}
          label="Audit IAM permissions for developer role"
        />
      </SuggestionList>
    </div>
  ),
};
