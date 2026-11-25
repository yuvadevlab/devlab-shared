"use client";

import React from "react";
import {
  Sources,
  InlineCitation,
  SourceKind,
  Stack,
  Text,
  type SourceItem,
} from "@yuva-devlab/ui";
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
    snippet: "Configured monthly limit ₹10,000 (over by ₹4,200).",
  },
  {
    id: "src-3",
    index: 3,
    title: "Turborepo Remote Caching — Docs",
    url: "https://turbo.build/repo/docs/core-concepts/caching",
    domain: "turbo.build",
    kind: SourceKind.WEB,
    snippet: "Turborepo stores results across team CI pipelines.",
  },
];

const SOURCES_CODE = `import {
  Sources,
  InlineCitation,
  SourceKind,
  Stack,
  Text,
  type SourceItem,
} from "@yuva-devlab/ui";

const SOURCES: SourceItem[] = [
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
    snippet: "Configured monthly limit ₹10,000 (over by ₹4,200).",
  },
];

export function GroundedSourcesDemo() {
  return (
    <Stack gap={4}>
      <Text variant="body-sm">
        Your Dining Out spending reached ₹14,200 this month{" "}
        <InlineCitation
          index={1}
          title={SOURCES[0].title}
          domain={SOURCES[0].domain}
          kind={SOURCES[0].kind}
          snippet={SOURCES[0].snippet}
        />
        , exceeding your ₹10,000 budget{" "}
        <InlineCitation
          index={2}
          title={SOURCES[1].title}
          domain={SOURCES[1].domain}
          kind={SOURCES[1].kind}
          snippet={SOURCES[1].snippet}
        />.
      </Text>
      <Sources sources={SOURCES} collapsible defaultOpen />
    </Stack>
  );
}`;

export default function SourcesDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "default",
      title: "Inline Citations & Collapsible Sources Drawer",
      description:
        "HoverCard excerpt badges paired with a collapsible summary pill and clean reference cards.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--lg">
          <Stack gap={4}>
            <Text variant="body-sm">
              Your Dining Out spending reached ₹14,200 this month{" "}
              <InlineCitation
                index={1}
                title={sampleSources[0].title}
                domain={sampleSources[0].domain}
                kind={sampleSources[0].kind}
                snippet={sampleSources[0].snippet}
              />
              , exceeding your ₹10,000 budget{" "}
              <InlineCitation
                index={2}
                title={sampleSources[1].title}
                domain={sampleSources[1].domain}
                kind={sampleSources[1].kind}
                snippet={sampleSources[1].snippet}
              />
              .
            </Text>
            <Sources sources={sampleSources} collapsible defaultOpen />
          </Stack>
        </div>
      ),
      codeSnippet: SOURCES_CODE,
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "sources",
      type: "SourceItem[]",
      default: "[]",
      description:
        "Array of source items with id, index, title, url, kind, badge, domain, snippet.",
    },
    {
      name: "collapsible",
      type: "boolean",
      default: "true",
      description: "Renders interactive toggle pill above the source cards.",
    },
    {
      name: "defaultOpen",
      type: "boolean",
      default: "true",
      description: "Initial expanded state when collapsible is enabled.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    {
      name: ".dl-citation",
      description: "Interactive rounded citation badge inside prose.",
    },
    {
      name: ".dl-sources__trigger",
      description: "Collapsible pill button summarizing source count.",
    },
    {
      name: ".dl-source-card",
      description: "Reference card displaying domain, badge, and excerpt.",
    },
  ];

  return (
    <ComponentView
      title="Sources"
      description="Grounded citation system with hoverable InlineCitation previews and collapsible SourceCard grids."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
