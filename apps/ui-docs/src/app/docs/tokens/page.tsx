import type { Metadata } from "next";
import { getTokensCatalog } from "@/services/tokens-service";
import { TokensView } from "@/components/tokens-view";

export const metadata: Metadata = {
  title: "Design Tokens & Architecture — DevLab UI",
  description:
    "Explore OKLCH semantic palettes, typographic scales, spacing grids, and isolated brand extensions across DevLab themes.",
};

/**
 * Ultra-thin page route wrapper for the design tokens reference.
 * Fetches tokens specifications on the server via tokens-service.
 */
export default async function TokensPage() {
  const catalog = await getTokensCatalog();
  return <TokensView {...catalog} />;
}
