import React from "react";
import type { Metadata } from "next";
import {
  getCatalogStats,
  getComponentsByCategory,
} from "../services/components-service";
import { HomeView } from "../components/home-view";

export const metadata: Metadata = {
  title: "DevLab UI — Enterprise Design System & Component Showcase",
  description:
    "Pure CSS, multi-brand design system with zero Tailwind collisions, accessible Radix primitives, and comprehensive API reference.",
};

/**
 * Ultra-thin page route wrapper for the DevLab UI Documentation homepage.
 * Follows the FinAI / OrchestrAI SSR architecture.
 */
export default async function HomePage() {
  const stats = getCatalogStats();
  const groupedComponents = getComponentsByCategory();

  return <HomeView stats={stats} groupedComponents={groupedComponents} />;
}
