import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button, Badge, Stack, Flex } from "@yuva-devlab/ui";
import { SearchTrigger } from "@/components/search-trigger";

export interface HomeHeroProps {
  totalComponents: number;
}

/**
 * Server component rendering the hero introduction section on the homepage.
 */
export function HomeHero({ totalComponents }: HomeHeroProps) {
  return (
    <Stack gap={5} as="section" className="dl-home-hero">
      <Flex wrap="wrap" align="center" gap={2}>
        <Badge variant="secondary" className="dl-home-hero__badge">
          <Sparkles className="dl-home-hero__sparkles" />
          <span>Complete {totalComponents} Components Showcase</span>
        </Badge>
        <Badge variant="outline" className="dl-home-hero__badge-outline">
          Pure Platform CSS • Cascade Layers
        </Badge>
      </Flex>

      <h1 className="dl-home-hero__title">DevLab UI Design System</h1>

      <p className="dl-home-hero__desc">
        Enterprise React UI primitives engineered with scoped{" "}
        <code className="dl-home-hero__code">dl-*</code> CSS classes,
        multi-brand OKLCH theme tokens, and rich JSDoc documentation for
        flawless developer ergonomics.
      </p>

      <Flex
        wrap="wrap"
        align="center"
        gap={3}
        className="dl-home-hero__actions"
      >
        <Button asChild size="lg" className="dl-home-hero__primary-btn">
          <Link href="/components/button">
            <span>Explore All {totalComponents} Components</span>
            <ArrowRight className="dl-home-hero__arrow" />
          </Link>
        </Button>
        <div className="dl-home-hero__search">
          <SearchTrigger
            variant="header"
            className="dl-home-hero__search-trigger"
          />
        </div>
        <Button asChild variant="outline" size="lg">
          <Link href="/docs/tokens">Design Tokens</Link>
        </Button>
      </Flex>
    </Stack>
  );
}
