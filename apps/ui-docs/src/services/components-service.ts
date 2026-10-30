import "server-only";
import { COMPONENTS_LIST, type ComponentMeta } from "@/config/components-meta";
import type { ComponentCategory } from "@/config/meta-types";

/**
 * Server-only service providing component catalog queries, category indexing,
 * and statistical aggregations for SSR.
 */

/**
 * Retrieves all registered components in the DevLab UI catalog.
 */
export function getAllComponents(): ComponentMeta[] {
  return COMPONENTS_LIST;
}

/**
 * Retrieves a list of all component slugs for static route generation.
 */
export function getAllComponentSlugs(): string[] {
  return COMPONENTS_LIST.map((c) => c.slug);
}

/**
 * Finds metadata for a specific component by its URL slug.
 */
export function getComponentBySlug(slug: string): ComponentMeta | undefined {
  return COMPONENTS_LIST.find((c) => c.slug === slug);
}

/**
 * Groups components by their primary design system category.
 */
export function getComponentsByCategory(): Record<
  ComponentCategory,
  ComponentMeta[]
> {
  const grouped = {} as Record<ComponentCategory, ComponentMeta[]>;

  for (const comp of COMPONENTS_LIST) {
    if (!grouped[comp.category]) {
      grouped[comp.category] = [];
    }
    grouped[comp.category].push(comp);
  }

  return grouped;
}

/**
 * Computes high-level catalog statistics for dashboard and homepage SSR.
 */
export function getCatalogStats(): {
  totalComponents: number;
  categoryCounts: Record<string, number>;
} {
  const categoryCounts: Record<string, number> = {};

  for (const comp of COMPONENTS_LIST) {
    categoryCounts[comp.category] = (categoryCounts[comp.category] || 0) + 1;
  }

  return {
    totalComponents: COMPONENTS_LIST.length,
    categoryCounts,
  };
}
