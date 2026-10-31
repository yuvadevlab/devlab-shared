"use client";

import React from "react";
import { Skeleton, Stack, Flex } from "@yuva-devlab/ui";
import { ComponentView, ComponentVariant } from "@/components/component-view";

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
        <Flex
          align="center"
          gap={4}
          className="dl-demo-frame dl-demo-frame--sm dl-demo-box"
        >
          <Skeleton className="dl-demo-skeleton-avatar" />
          <Stack gap={2} className="dl-demo-frame">
            <Skeleton className="dl-demo-skeleton-line" />
            <Skeleton className="dl-demo-skeleton-line--sm" />
          </Stack>
        </Flex>
      ),
      codeSnippet: `<Flex align="center" gap={4}>
  <Skeleton className="dl-demo-skeleton-avatar" />
  <Stack gap={2}>
    <Skeleton className="dl-demo-skeleton-line" />
    <Skeleton className="dl-demo-skeleton-line--sm" />
  </Stack>
</Flex>`,
    },
    {
      id: "card",
      title: "Complex Card Skeleton",
      description:
        "Multi-element wireframe simulating an entire content card or dashboard panel.",
      preview: (
        <Stack gap={3} className="dl-demo-frame dl-demo-frame--sm dl-demo-box">
          <Skeleton className="dl-demo-skeleton-hero" />
          <Skeleton className="dl-demo-skeleton-line--md" />
          <Stack gap={2}>
            <Skeleton className="dl-demo-skeleton-line" />
            <Skeleton className="dl-demo-skeleton-line--lg" />
          </Stack>
          <Flex justify="end" gap={2}>
            <Skeleton className="dl-demo-skeleton-btn" />
            <Skeleton className="dl-demo-skeleton-btn--lg" />
          </Flex>
        </Stack>
      ),
      codeSnippet: `<Stack gap={3} className="dl-demo-box">
  <Skeleton className="dl-demo-skeleton-hero" />
  <Skeleton className="dl-demo-skeleton-line--md" />
  <Stack gap={2}>
    <Skeleton className="dl-demo-skeleton-line" />
    <Skeleton className="dl-demo-skeleton-line--lg" />
  </Stack>
  <Flex justify="end" gap={2}>
    <Skeleton className="dl-demo-skeleton-btn" />
    <Skeleton className="dl-demo-skeleton-btn--lg" />
  </Flex>
</Stack>`,
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
