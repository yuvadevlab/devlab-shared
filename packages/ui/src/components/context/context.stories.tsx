import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Context,
  ContextContent,
  ContextContentBody,
  ContextContentHeader,
  ContextTrigger,
} from "./context";

const meta: Meta<typeof Context> = {
  title: "AI Elements/Context",
  component: Context,
};

export default meta;
type Story = StoryObj<typeof Context>;

export const Default: Story = {
  render: () => (
    <Context
      usedTokens={10660}
      maxTokens={128000}
      modelId="Model context"
      usage={{ inputTokens: 8420, outputTokens: 1260, reasoningTokens: 980 }}
    >
      <ContextTrigger />
      <ContextContent>
        <ContextContentHeader />
        <ContextContentBody />
      </ContextContent>
    </Context>
  ),
};
