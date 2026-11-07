import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { LegalFooter } from "./legal-footer";

const meta: Meta<typeof LegalFooter> = {
  title: "Components/LegalFooter",
  component: LegalFooter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LegalFooter>;

export const DefaultLogin: Story = {
  args: {
    variant: "login",
    appName: "DevLab Platform",
    showLinks: true,
  },
  render: (args) => (
    <div
      style={{
        width: "420px",
        padding: "1rem",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg, 0.75rem)",
      }}
    >
      <LegalFooter {...args} />
    </div>
  ),
};

export const FinAILogin: Story = {
  args: {
    variant: "login",
    appName: "FinAI",
    showLinks: true,
  },
  render: (args) => (
    <div
      style={{
        width: "420px",
        padding: "1rem",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg, 0.75rem)",
      }}
    >
      <LegalFooter {...args} />
    </div>
  ),
};

export const SidebarVariant: Story = {
  args: {
    variant: "sidebar",
    appName: "OrchestrAI",
    version: "v1.2.0",
  },
  render: (args) => (
    <div
      style={{
        width: "260px",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius, 0.5rem)",
      }}
    >
      <div
        style={{
          padding: "1rem",
          fontSize: "0.8125rem",
          color: "var(--muted-foreground)",
        }}
      >
        Navigation Menu Area
      </div>
      <LegalFooter {...args} />
    </div>
  ),
};

export const SettingsVariant: Story = {
  args: {
    variant: "settings",
    appName: "VitalAI Core",
    version: "v2.0.4",
  },
  render: (args) => (
    <div
      style={{
        width: "360px",
        padding: "1.25rem",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius, 0.5rem)",
      }}
    >
      <LegalFooter {...args} />
    </div>
  ),
};

export const MinimalCopyrightOnly: Story = {
  args: {
    variant: "login",
    showLinks: false,
    companyName: "Yuva Devlab",
  },
  render: (args) => (
    <div style={{ width: "380px", padding: "1rem" }}>
      <LegalFooter {...args} />
    </div>
  ),
};
