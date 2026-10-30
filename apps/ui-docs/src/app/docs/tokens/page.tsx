import type { Metadata } from "next";
import { getTokensCatalog } from "../../../services/tokens-service";
import { TokensView } from "../../../components/tokens-view";

export const metadata: Metadata = {
  title: "Design Tokens & Palette — DevLab UI",
  description:
    "Explore OKLCH semantic palettes, corner radius scales, and font stacks across OrchestrAI and FinAI themes.",
};

/**
 * Ultra-thin page route wrapper for the design tokens reference.
 * Fetches tokens specifications on the server via tokens-service.
 */
export default async function TokensPage() {
  const { semanticColors, radii, typography } = await getTokensCatalog();
  return (
    <TokensView
      semanticColors={semanticColors}
      radii={radii}
      typography={typography}
    />
  );
}
