"use client";

import React from "react";
import { Sources, InlineCitation, type SourceItem } from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

const sampleSources: SourceItem[] = [
  {
    id: "src-1",
    index: 1,
    title: "Configuring Remote Caching — Turborepo Docs",
    url: "https://turbo.build/repo/docs/core-concepts/caching",
    domain: "turbo.build",
    snippet: "Turborepo stores results across team CI pipelines.",
  },
  {
    id: "src-2",
    index: 2,
    title: "Next.js 15 Server Components & Caching",
    url: "https://nextjs.org/docs/app/building-your-application/caching",
    domain: "nextjs.org",
    snippet: "Deep dive into async RSC caching models in Next.js 15.",
  },
  {
    id: "src-3",
    index: 3,
    title: "PostgreSQL 17 Hash Join Performance",
    url: "https://postgresql.org/docs/17/release-17.html",
    domain: "postgresql.org",
    snippet: "Improvements to parallel memory management during joins.",
  },
];

export default function SourcesDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "default",
      title: "Inline Citations & Source Grid",
      description:
        "Clickable superscript references embedded directly in AI text with an expandable source card footer.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <div
            style={{
              width: "100%",
              maxWidth: "36rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <p
              style={{
                fontSize: "0.875rem",
                lineHeight: 1.625,
                color: "var(--foreground)",
              }}
            >
              Turborepo Remote Cache allows you to share build artifacts across
              team members and CI pipelines{" "}
              <InlineCitation index={1} title="Turborepo Docs" />. Furthermore,
              Next.js 15 leverages async Server Components to optimize streaming
              rendering directly from origin servers{" "}
              <InlineCitation index={2} title="Next.js 15 Caching" />.
            </p>
            <Sources sources={sampleSources} />
          </div>
        </div>
      ),
      codeSnippet: `<p>
  Turborepo Remote Cache allows you to share build artifacts
  <InlineCitation index={1} title="Turborepo Docs" />.
</p>
<Sources sources={sourcesList} />`,
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "sources",
      type: "SourceItem[]",
      default: "[]",
      description:
        "Array of source items containing id, index, title, url, domain, snippet.",
    },
    {
      name: "index",
      type: "number",
      default: "—",
      description: "Index number displayed in InlineCitation button.",
    },
    {
      name: "onCitationClick",
      type: "(index: number) => void",
      default: "—",
      description: "Optional callback when an inline citation is clicked.",
    },
    {
      name: "onSourceClick",
      type: "(source: SourceItem) => void",
      default: "—",
      description: "Optional callback when a source card is clicked.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    {
      name: ".dl-citation",
      description:
        "Interactive citation badge embedded within paragraph prose.",
    },
    {
      name: ".dl-sources",
      description: "Container block displaying all referenced sources.",
    },
    {
      name: ".dl-source-card",
      description:
        "External reference card with domain, favicon, and preview title.",
    },
  ];

  return (
    <ComponentView
      title="Sources"
      description="Ground-truth reference components for AI responses, including interactive inline citation badges and card grids for search citations."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
