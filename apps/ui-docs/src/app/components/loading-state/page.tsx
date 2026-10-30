"use client";

import React from "react";
import { LoadingState } from "@yuva-devlab/ui";
import {
  ComponentView,
  ComponentVariant,
} from "../../../components/component-view";

/**
 * Documentation page for LoadingState component showcasing spinner and skeleton placeholder variants.
 */
export default function LoadingStateDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "spinner",
      title: "Spinner with Status Message",
      description:
        "Animated circular loader displaying real-time task progress or operation description.",
      preview: (
        <div className="w-full max-w-sm p-4 border border-border rounded-xl bg-card">
          <LoadingState message="Synchronizing RAG vector indices..." />
        </div>
      ),
      codeSnippet: `<LoadingState message="Synchronizing RAG vector indices..." />`,
    },
    {
      id: "skeleton",
      title: "Skeleton Rows Placeholder",
      description:
        "Shimmering skeleton rows representing tabular or list data being fetched.",
      preview: (
        <div className="w-full max-w-sm p-4 border border-border rounded-xl bg-card">
          <LoadingState rows={3} />
        </div>
      ),
      codeSnippet: `<LoadingState rows={3} />`,
    },
  ];

  const propsList = [
    {
      name: "message",
      type: "string",
      default: "undefined",
      description:
        "When set, renders a spinning SVG circle accompanied by the message.",
    },
    {
      name: "rows",
      type: "number",
      default: "undefined",
      description:
        "When set, renders the specified number of skeleton placeholder rows.",
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
      name: ".dl-loading-state",
      description: "Container element for loading indicator or skeleton rows.",
    },
    {
      name: ".dl-loading-spinner",
      description: "Animated circular SVG spinner.",
    },
  ];

  return (
    <ComponentView
      title="Loading State"
      description="Standardized async loading indicator supporting either status message spinners or multi-row skeletons, inspired by Ant Design's Spin."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
