"use client";

import React from "react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  Avatar,
  AvatarFallback,
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
        <div className="flex items-center justify-center p-4">
          <HoverCard>
            <HoverCardTrigger asChild>
              <a
                href="https://github.com/yuvarajpattabi"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold underline underline-offset-4 text-primary hover:opacity-80 transition cursor-pointer"
              >
                @yuva-devlab
              </a>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                    YD
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-xs">
                  <h4 className="font-semibold text-foreground text-sm">
                    Yuva DevLab Systems
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Enterprise foundation cloud packages, pure CSS design
                    system, and resilient agentic runtime.
                  </p>
                  <div className="flex items-center pt-2 text-muted-foreground">
                    <CalendarDays className="mr-2 size-3.5 opacity-70" />
                    <span className="text-[11px]">Joined October 2026</span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      ),
      codeSnippet: `<HoverCard>
  <HoverCardTrigger asChild>
    <a href="https://github.com/yuvarajpattabi">@yuva-devlab</a>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="flex space-x-4">
      <Avatar><AvatarFallback>YD</AvatarFallback></Avatar>
      <div>
        <h4>Yuva DevLab Systems</h4>
        <p>Enterprise foundation cloud packages.</p>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>`,
    },
    {
      id: "package",
      title: "Package Metadata Card",
      description:
        "Hover card exposing telemetry, versioning, and compliance status for software packages.",
      preview: (
        <div className="flex items-center justify-center p-4">
          <HoverCard>
            <HoverCardTrigger asChild>
              <span className="text-xs font-mono font-medium border border-border px-2 py-1 rounded bg-muted/30 cursor-pointer hover:border-primary">
                @yuva-devlab/resilience
              </span>
            </HoverCardTrigger>
            <HoverCardContent className="w-72">
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground flex items-center gap-1.5">
                    <Package className="size-3.5 text-primary" />
                    v0.1.0-alpha
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-emerald-500 font-medium">
                    <ShieldCheck className="size-3" />
                    Passed Audit
                  </span>
                </div>
                <p className="text-muted-foreground">
                  Adaptive Circuit Breakers, Bulkheads, and RAG semantic caches.
                </p>
                <div className="text-[11px] text-muted-foreground pt-1 border-t border-border">
                  License: MIT • Size: 14.2 kB
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      ),
      codeSnippet: `<HoverCard>
  <HoverCardTrigger asChild>
    <span>@yuva-devlab/resilience</span>
  </HoverCardTrigger>
  <HoverCardContent className="w-72">
    <div>
      <h4>v0.1.0-alpha</h4>
      <p>Adaptive Circuit Breakers and Bulkheads.</p>
    </div>
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
