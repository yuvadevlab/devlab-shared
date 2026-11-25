import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Sources,
  InlineCitation,
  SourceKind,
  type SourceItem,
} from "./sources";

const meta: Meta<typeof Sources> = {
  title: "AI Elements/Sources",
  component: Sources,
};

export default meta;
type Story = StoryObj<typeof Sources>;

const sampleSources: SourceItem[] = [
  {
    id: "src-1",
    index: 1,
    title: "May 2026 Dining Out Transactions",
    url: "/transactions?category=dining",
    domain: "transactions",
    kind: SourceKind.DATABASE,
    badge: "14 txns",
    snippet: "Total outflow ₹14,200 across 14 verified entries.",
  },
  {
    id: "src-2",
    index: 2,
    title: "Dining Out Monthly Budget",
    url: "/budgets",
    domain: "budgets",
    kind: SourceKind.TOOL,
    badge: "142% used",
    snippet: "Configured monthly cap: ₹10,000 (over by ₹4,200).",
  },
  {
    id: "src-3",
    index: 3,
    title: "Turborepo Remote Caching Docs",
    url: "https://turbo.build/repo/docs/core-concepts/caching",
    domain: "turbo.build",
    kind: SourceKind.WEB,
    snippet: "Turborepo stores task outputs across team CI pipelines.",
  },
];

export const Default: Story = {
  render: () => (
    <div className="dl-story-w-lg dl-story-col">
      <div className="dl-story-prose">
        Your Dining Out spending reached ₹14,200 this month{" "}
        <InlineCitation
          index={1}
          title={sampleSources[0].title}
          domain={sampleSources[0].domain}
          kind={sampleSources[0].kind}
          snippet={sampleSources[0].snippet}
        />
        , exceeding your ₹10,000 monthly budget{" "}
        <InlineCitation
          index={2}
          title={sampleSources[1].title}
          domain={sampleSources[1].domain}
          kind={sampleSources[1].kind}
          snippet={sampleSources[1].snippet}
        />
        .
      </div>
      <Sources sources={sampleSources} />
    </div>
  ),
};

export const CollapsedSummary: Story = {
  render: () => (
    <div className="dl-story-w-lg dl-story-col">
      <Sources sources={sampleSources} collapsible defaultOpen={false} />
    </div>
  ),
};
