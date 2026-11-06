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
          icon={<Terminal className="size-3" />}
          label="Analyze build failure in apps/web"
        />
        <Suggestion
          icon={<Database className="size-3" />}
          label="Generate schema migration for tenant_id"
        />
        <Suggestion
          icon={<Shield className="size-3" />}
          label="Audit IAM permissions for developer role"
        />
      </SuggestionList>
    </div>
  ),
};
