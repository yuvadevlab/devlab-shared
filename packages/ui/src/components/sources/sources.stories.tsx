import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Sources, InlineCitation, SourceItem } from "./sources";

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
    title: "Configuring Remote Caching — Turborepo Docs",
    url: "https://turbo.build/repo/docs/core-concepts/caching",
    domain: "turbo.build",
    snippet:
      "Turborepo can store the results of your tasks across your team with Remote Caching.",
  },
  {
    id: "src-2",
    index: 2,
    title: "Next.js 15 Server Components and Caching Strategies",
    url: "https://nextjs.org/docs/app/building-your-application/caching",
    domain: "nextjs.org",
    snippet:
      "Understanding default request caching and Route Handlers in Next.js 15.",
  },
  {
    id: "src-3",
    index: 3,
    title: "PostgreSQL 17 Release Notes: High-Performance Hash Joins",
    url: "https://postgresql.org/docs/17/release-17.html",
    domain: "postgresql.org",
    snippet:
      "Improvements to query optimizer memory handling during parallel joins.",
  },
];

export const Default: Story = {
  render: () => (
    <div
      className="dl-story-w-lg"
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <div
        style={{
          fontSize: "0.875rem",
          lineHeight: 1.625,
          color: "var(--foreground)",
        }}
      >
        Turborepo Remote Cache allows you to share build artifacts across team
        members and CI pipelines{" "}
        <InlineCitation index={1} title="Turborepo Docs" />. Furthermore,
        Next.js 15 leverages async Server Components to optimize streaming
        rendering directly from origin servers{" "}
        <InlineCitation index={2} title="Next.js 15 Caching" />.
      </div>

      <Sources sources={sampleSources} />
    </div>
  ),
};
