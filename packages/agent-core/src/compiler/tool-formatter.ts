/**
 * @file packages/agent-core/src/compiler/tool-formatter.ts
 * @description Formats UniversalTool specifications into structured markdown for model system prompts.
 * @module @yuva-devlab/agent-core
 */

import type { UniversalTool } from "../types";

/**
 * Formats an array of UniversalTool instances into a human- and model-readable markdown catalog.
 *
 * @example
 * ```typescript
 * const promptSection = formatToolsForSystemPrompt(tools);
 * ```
 *
 * @param tools - Array of available UniversalTools.
 * @returns Formatted markdown string listing all tool descriptions, tiers, and schemas.
 */
export function formatToolsForSystemPrompt(
  tools: UniversalTool<unknown, unknown>[],
): string {
  if (!tools || tools.length === 0) {
    return "";
  }

  const sections: string[] = ["## Available Operational Tools\n"];

  for (const tool of tools) {
    sections.push(`### \`${tool.name}\``);
    sections.push(`- **Description**: ${tool.description}`);
    sections.push(`- **Access Tier**: ${tool.accessTier}`);
    sections.push(`- **Confirmation Policy**: ${tool.confirmation}`);
    if (tool.capabilities.length > 0) {
      sections.push(`- **Capabilities**: ${tool.capabilities.join(", ")}`);
    }

    // Try extracting JSON schema description if schema exposes description
    const schemaDesc = (tool.inputSchema as { description?: string })
      .description;
    if (schemaDesc) {
      sections.push(`- **Parameters**: ${schemaDesc}`);
    }
    sections.push("");
  }

  return sections.join("\n");
}
