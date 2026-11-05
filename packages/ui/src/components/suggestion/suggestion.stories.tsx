import type { Meta, StoryObj } from "@storybook/react";
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
        <Suggestion label="Explain the latest build failure" />
        <Suggestion label="Add a loading state to the dashboard" />
        <Suggestion label="Summarize the recent changes" />
      </SuggestionList>
    </div>
  ),
};
