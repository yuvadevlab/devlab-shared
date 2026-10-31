import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SecretRevealCard } from "./secret-reveal-card";

const meta: Meta<typeof SecretRevealCard> = {
  title: "Components/SecretRevealCard",
  component: SecretRevealCard,
};

export default meta;
type Story = StoryObj<typeof SecretRevealCard>;

export const Default: Story = {
  render: () => (
    <div className="dl-story-w-md">
      <SecretRevealCard
        title="Production API Key"
        secret="sk-live-98234-alpha-omega-secret-token"
      />
    </div>
  ),
};
