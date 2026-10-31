"use client";

import React from "react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  Avatar,
  AvatarFallback,
  Flex,
  Stack,
} from "@yuva-devlab/ui";
import { CalendarDays, Package, ShieldCheck } from "lucide-react";
import { ComponentView, ComponentVariant } from "@/components/component-view";

/**
 * Documentation page for HoverCard component showcasing user profiles and package previews.
 */
export default function HoverCardDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "user",
      title: "User Profile Preview",
      description:
        "Displays rich preview information when hovering over a user or handle link.",
      preview: (
        <Flex align="center" justify="center">
          <HoverCard>
            <HoverCardTrigger asChild>
              <a
                href="https://github.com/yuvarajpattabi"
                target="_blank"
                rel="noreferrer"
                className="dl-demo-code"
              >
                @yuva-devlab
              </a>
            </HoverCardTrigger>
            <HoverCardContent>
              <Flex gap={4}>
                <Avatar>
                  <AvatarFallback>YD</AvatarFallback>
                </Avatar>
                <Stack gap={1} className="dl-demo-desc">
                  <h4 className="dl-demo-heading">Yuva DevLab Systems</h4>
                  <p>
                    Enterprise foundation cloud packages, pure CSS design
                    system, and resilient agentic runtime.
                  </p>
                  <Flex align="center" gap={2} className="dl-demo-caption">
                    <CalendarDays className="dl-demo-icon dl-demo-icon--xs" />
                    <span>Joined October 2026</span>
                  </Flex>
                </Stack>
              </Flex>
            </HoverCardContent>
          </HoverCard>
        </Flex>
      ),
      codeSnippet: `<HoverCard>
  <HoverCardTrigger asChild>
    <a href="https://github.com/yuvarajpattabi">@yuva-devlab</a>
  </HoverCardTrigger>
  <HoverCardContent>
    <Flex gap="4">
      <Avatar><AvatarFallback>YD</AvatarFallback></Avatar>
      <Stack gap="1">
        <h4>Yuva DevLab Systems</h4>
        <p>Enterprise foundation cloud packages.</p>
      </Stack>
    </Flex>
  </HoverCardContent>
</HoverCard>`,
    },
    {
      id: "package",
      title: "Package Metadata Card",
      description:
        "Hover card exposing telemetry, versioning, and compliance status for software packages.",
      preview: (
        <Flex align="center" justify="center">
          <HoverCard>
            <HoverCardTrigger asChild>
              <span className="dl-demo-box--code">@yuva-devlab/resilience</span>
            </HoverCardTrigger>
            <HoverCardContent>
              <Stack gap={2} className="dl-demo-desc">
                <Flex align="center" justify="between">
                  <Flex align="center" gap={1}>
                    <Package className="dl-demo-icon dl-demo-icon--xs" />
                    <span>v0.1.0-alpha</span>
                  </Flex>
                  <Flex align="center" gap={1} className="dl-demo-code">
                    <ShieldCheck className="dl-demo-icon dl-demo-icon--xs" />
                    <span>Passed Audit</span>
                  </Flex>
                </Flex>
                <p>
                  Adaptive Circuit Breakers, Bulkheads, and RAG semantic caches.
                </p>
                <div className="dl-demo-caption">
                  License: MIT • Size: 14.2 kB
                </div>
              </Stack>
            </HoverCardContent>
          </HoverCard>
        </Flex>
      ),
      codeSnippet: `<HoverCard>
  <HoverCardTrigger asChild>
    <span>@yuva-devlab/resilience</span>
  </HoverCardTrigger>
  <HoverCardContent>
    <Stack gap="2">
      <Flex align="center" justify="between">
        <span>v0.1.0-alpha</span>
        <span>Passed Audit</span>
      </Flex>
      <p>Adaptive Circuit Breakers and Bulkheads.</p>
    </Stack>
  </HoverCardContent>
</HoverCard>`,
    },
  ];

  const propsList = [
    {
      name: "openDelay",
      type: "number",
      default: "700",
      description: "Delay in milliseconds before the card opens upon hover.",
    },
    {
      name: "closeDelay",
      type: "number",
      default: "300",
      description: "Delay in milliseconds before the card closes upon leave.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-hover-card-content",
      description: "Floating popup card with subtle elevation and padding.",
    },
  ];

  return (
    <ComponentView
      title="Hover Card"
      description="For sighted users to preview content available behind a link, inspired by Ant Design's Popover and GitHub user previews."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
