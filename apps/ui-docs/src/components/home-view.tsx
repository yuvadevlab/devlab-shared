import React from "react";
import type { ComponentMeta, ComponentCategory } from "@/config/meta-types";
import { HomeHero } from "@/components/home-hero";
import { HomePillars } from "@/components/home-pillars";
import { HomeCatalog } from "@/components/home-catalog";
import { HomeQuickstart } from "@/components/home-quickstart";
import { Stack } from "@yuva-devlab/ui";

export interface HomeViewProps {
  stats: {
    totalComponents: number;
    categoryCounts: Record<string, number>;
  };
  groupedComponents: Record<ComponentCategory, ComponentMeta[]>;
}

/**
 * Server component aggregating all home page sections into a cohesive overview.
 */
export function HomeView({ stats, groupedComponents }: HomeViewProps) {
  return (
    <Stack gap={10} className="home-view">
      <HomeHero totalComponents={stats.totalComponents} />
      <HomePillars />
      <HomeCatalog
        totalComponents={stats.totalComponents}
        groupedComponents={groupedComponents}
      />
      <HomeQuickstart />
    </Stack>
  );
}
