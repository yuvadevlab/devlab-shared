import React from "react";
import type { ComponentMeta, ComponentCategory } from "../config/meta-types";
import { HomeHero } from "./home-hero";
import { HomePillars } from "./home-pillars";
import { HomeCatalog } from "./home-catalog";
import { HomeQuickstart } from "./home-quickstart";

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
    <div className="space-y-14">
      <HomeHero totalComponents={stats.totalComponents} />
      <HomePillars />
      <HomeCatalog
        totalComponents={stats.totalComponents}
        groupedComponents={groupedComponents}
      />
      <HomeQuickstart />
    </div>
  );
}
