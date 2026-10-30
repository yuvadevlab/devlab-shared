import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button, Badge } from "@yuva-devlab/ui";
import { SearchTrigger } from "./search-trigger";

export interface HomeHeroProps {
  totalComponents: number;
}

/**
 * Server component rendering the hero introduction section on the homepage.
 */
export function HomeHero({ totalComponents }: HomeHeroProps) {
  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="gap-1.5 py-1 text-xs">
          <Sparkles className="size-3 text-primary" />
          <span>Complete {totalComponents} Components Showcase</span>
        </Badge>
        <Badge variant="outline" className="text-xs">
          Pure CSS • Zero Tailwind Collisions
        </Badge>
      </div>

      <h1 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl">
        DevLab UI Design System
      </h1>

      <p className="text-muted-foreground max-w-2xl text-base leading-relaxed sm:text-lg">
        Enterprise React UI primitives engineered with scoped{" "}
        <code className="text-primary font-mono text-sm">dl-*</code> CSS
        classes, multi-brand OKLCH theme tokens, and rich JSDoc documentation
        for flawless developer ergonomics.
      </p>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <Button asChild size="lg" className="gap-2">
          <Link href="/components/button">
            <span>Explore All {totalComponents} Components</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <div className="w-auto">
          <SearchTrigger variant="header" className="h-10 sm:w-64" />
        </div>
        <Button asChild variant="outline" size="lg">
          <Link href="/docs/tokens">Design Tokens</Link>
        </Button>
      </div>
    </section>
  );
}
