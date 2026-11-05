import type { Meta, StoryObj } from "@storybook/react";
import { Questionnaire } from "./questionnaire";

const meta: Meta<typeof Questionnaire> = {
  title: "AI Elements/Questionnaire",
  component: Questionnaire,
};

export default meta;
type Story = StoryObj<typeof Questionnaire>;

/** Single-choice response question. */
export const Default: Story = {
  args: {
    questions: [
      {
        id: "rating",
        prompt: "Was this response helpful?",
        options: ["Yes", "Somewhat", "No"],
      },
    ],
    onSubmit: () => {},
  },
};
