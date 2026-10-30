"use client";

import React from "react";
import { Skeleton } from "@yuva-devlab/ui";
import {
  ComponentView,
  ComponentVariant,
} from "../../../components/component-view";

/**
 * Documentation page for Skeleton component showcasing placeholder wireframes.
 */
export default function SkeletonDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "profile",
      title: "Avatar & Text Shimmer",
      description:
        "Skeleton placeholder simulating a user profile or message thread item.",
      preview: (
        <div className="flex items-center gap-4 w-full max-w-sm p-2">
          <Skeleton className="size-12 rounded-full shrink-0" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>
      ),
      codeSnippet: `<div className="flex items-center gap-4">
  <Skeleton className="size-12 rounded-full" />
  <div className="space-y-2 flex-1">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-3 w-3/4" />
  </div>
</div>`,
    },
    {
      id: "card",
      title: "Complex Card Skeleton",
      description:
        "Multi-element wireframe simulating an entire content card or dashboard panel.",
      preview: (
        <div className="w-full max-w-sm border border-border rounded-xl p-4 space-y-3 bg-card">
          <Skeleton className="h-28 w-full rounded-lg" />
          <Skeleton className="h-4 w-2/3" />
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Skeleton className="h-8 w-16 rounded-md" />
            <Skeleton className="h-8 w-20 rounded-md" />
          </div>
        </div>
      ),
      codeSnippet: `<div className="border rounded-xl p-4 space-y-3">
  <Skeleton className="h-28 w-full rounded-lg" />
  <Skeleton className="h-4 w-2/3" />
  <Skeleton className="h-3 w-full" />
  <Skeleton className="h-3 w-4/5" />
  <div className="flex justify-end gap-2">
    <Skeleton className="h-8 w-16 rounded-md" />
    <Skeleton className="h-8 w-20 rounded-md" />
  </div>
</div>`,
    },
  ];

  const propsList = [
    {
      name: "className",
      type: "string",
      default: "undefined",
      description: "Utility classes for width, height, and border radius.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-skeleton",
      description:
        "Placeholder block with pulsing shimmer animation and muted background.",
    },
  ];

  return (
    <ComponentView
      title="Skeleton"
      description="Animated placeholder surfaces representing content while asynchronous data is loading, inspired by Ant Design's Skeleton."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
