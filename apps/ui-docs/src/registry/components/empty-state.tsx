"use client";

import React from "react";
import { EmptyState, Button, Stack } from "@yuva-devlab/ui";
import { Search, Inbox, Database } from "lucide-react";
import { ComponentView, ComponentVariant } from "@/components/component-view";

/**
 * Documentation page for EmptyState component showcasing zero-data placeholders.
 */
export default function EmptyStateDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "search",
      title: "Search Results Empty State",
      description:
        "Theme-adaptive placeholder displayed when user search queries return zero items.",
      preview: (
        <EmptyState
          icon={<Search />}
          title="No search results"
          description="We couldn't find any resources matching your query. Check your spelling or try broader terms."
          action={
            <Button variant="outline" size="sm">
              Clear search
            </Button>
          }
        />
      ),
      codeSnippet: `<EmptyState
  icon={<Search />}
  title="No search results"
  description="We couldn't find any resources matching your query."
  action={<Button variant="outline" size="sm">Clear search</Button>}
/>`,
    },
    {
      id: "inbox",
      title: "Default Collection Placeholder",
      description:
        "Standard collection placeholder for empty logs, workflows, or agent run histories.",
      preview: (
        <EmptyState
          icon={<Inbox />}
          title="No telemetry traces yet"
          description="Deploy an autonomous agent or trigger an ingestion pipeline to view streaming spans."
          action={
            <Stack direction="row" gap="2">
              <Button variant="default" size="sm">
                Create pipeline
              </Button>
              <Button variant="outline" size="sm">
                View documentation
              </Button>
            </Stack>
          }
        />
      ),
      codeSnippet: `<EmptyState
  icon={<Inbox />}
  title="No telemetry traces yet"
  description="Deploy an autonomous agent or trigger an ingestion pipeline."
  action={<Button variant="default" size="sm">Create pipeline</Button>}
/>`,
    },
    {
      id: "database",
      title: "Data Store Empty State",
      description:
        "Compact placeholder for zero vector embeddings or empty semantic cache namespaces.",
      preview: (
        <EmptyState
          icon={<Database />}
          title="Vector index is empty"
          description="Upload and chunk markdown or financial PDF documents to seed this vector index."
        />
      ),
      codeSnippet: `<EmptyState
  icon={<Database />}
  title="Vector index is empty"
  description="Upload and chunk documents to seed this vector index."
/>`,
    },
  ];

  const propsList = [
    {
      name: "title",
      type: "ReactNode",
      default: "required",
      description: "Primary headline text or node explaining the empty state.",
    },
    {
      name: "description",
      type: "ReactNode",
      default: "undefined",
      description: "Secondary explanatory guidance or resolution steps.",
    },
    {
      name: "icon",
      type: "ReactNode",
      default: "undefined",
      description:
        "Visual icon displayed in the central accent-tinted badge box.",
    },
    {
      name: "action",
      type: "ReactNode",
      default: "undefined",
      description: "Primary action button, trigger, or navigation CTA.",
    },
    {
      name: "className",
      type: "string",
      default: "undefined",
      description: "Additional CSS classes for outer container wrapping.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-empty-state",
      description:
        "Main container with dashed border, card background, and centered flex layout.",
    },
    {
      name: ".dl-empty-state__icon-box",
      description:
        "Accent badge container framing the central Lucide or custom icon.",
    },
    {
      name: ".dl-empty-state__title",
      description: "Display heading using --theme-font-display typography.",
    },
    {
      name: ".dl-empty-state__description",
      description: "Muted guidance caption text.",
    },
    {
      name: ".dl-empty-state__actions",
      description: "Centered actions container hosting buttons or links.",
    },
  ];

  return (
    <ComponentView
      title="Empty State"
      description="Cybernetic and theme-adaptive placeholder displayed when queries, tables, logs, or collections yield zero entries."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
