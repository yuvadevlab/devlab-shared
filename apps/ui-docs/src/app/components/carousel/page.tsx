"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@yuva-devlab/ui";
import {
  ComponentView,
  ComponentVariant,
} from "../../../components/component-view";

const slides = [
  {
    title: "OrchestrAI",
    color: "from-cyan-500/20 to-blue-500/10",
    subtitle: "Multi-Agent Coordination",
  },
  {
    title: "FinAI",
    color: "from-emerald-500/20 to-teal-500/10",
    subtitle: "Quantitative Trading & Risk",
  },
  {
    title: "VitalAI",
    color: "from-rose-500/20 to-amber-500/10",
    subtitle: "Diagnostic Pipelines",
  },
];

/**
 * Documentation page for Carousel component showcasing fluid slide navigation.
 */
export default function CarouselDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "featured",
      title: "Featured Workspace Slides",
      description:
        "Horizontal touch and keyboard navigated carousel with previous/next action buttons.",
      preview: (
        <div className="w-full max-w-sm px-10">
          <Carousel className="w-full">
            <CarouselContent>
              {slides.map((s, index) => (
                <CarouselItem key={index}>
                  <div
                    className={`p-6 rounded-xl border border-border bg-gradient-to-br ${s.color} flex flex-col items-center justify-center h-40 text-center`}
                  >
                    <span className="text-lg font-bold text-foreground">
                      {s.title}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">
                      {s.subtitle}
                    </span>
                    <span className="text-[10px] font-mono text-primary mt-2">
                      Slide {index + 1} of {slides.length}
                    </span>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      ),
      codeSnippet: `<Carousel className="w-full max-w-xs">
  <CarouselContent>
    <CarouselItem>
      <div className="p-6 rounded-xl border bg-card">Slide 1</div>
    </CarouselItem>
    <CarouselItem>
      <div className="p-6 rounded-xl border bg-card">Slide 2</div>
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
    },
    {
      id: "compact",
      title: "Compact Thumbnail Slider",
      description:
        "Low-profile carousel suitable for compact widget panels or mobile headers.",
      preview: (
        <div className="w-full max-w-xs px-10">
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem>
                <div className="p-4 rounded-lg border border-border bg-muted/40 text-center text-xs">
                  Cluster US-East-1 (Healthy)
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="p-4 rounded-lg border border-border bg-muted/40 text-center text-xs">
                  Cluster EU-Central-1 (Healthy)
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      ),
      codeSnippet: `<Carousel>
  <CarouselContent>
    <CarouselItem>Cluster US-East</CarouselItem>
    <CarouselItem>Cluster EU-Central</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
    },
  ];

  const propsList = [
    {
      name: "orientation",
      type: '"horizontal" | "vertical"',
      default: '"horizontal"',
      description: "Scroll axis direction for the carousel slide track.",
    },
    {
      name: "opts",
      type: "EmblaOptionsType",
      default: "undefined",
      description: "Underlying Embla Carousel physics and looping options.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-carousel",
      description: "Relative wrapper positioning the carousel track.",
    },
    {
      name: ".dl-carousel-item",
      description: "Individual slide element inside the flex track.",
    },
  ];

  return (
    <ComponentView
      title="Carousel"
      description="A motion and gesture-driven carousel with support for arrow controls, loops, and responsive breakpoints, inspired by Ant Design's Carousel."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
