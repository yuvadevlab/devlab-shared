/**
 * @file packages/agent-core/src/compiler/prompt-compiler.ts
 * @description Master prompt compilation engine combining variable substitution and tool catalogs.
 * @module @yuva-devlab/agent-core
 */

import { Logger, loggerWithConfig } from "@yuva-devlab/logger";
import type { UniversalTool } from "../types";
import { interpolateTemplate } from "./template-parser";
import { formatToolsForSystemPrompt } from "./tool-formatter";

const logger = loggerWithConfig(new Logger("PromptCompiler"));

/**
 * Options configuring prompt compilation.
 */
export interface CompilePromptOptions {
  /** Raw prompt template string containing `{{tokens}}` */
  template: string;
  /** Variable dictionary for token substitution */
  variables?: Record<string, unknown>;
  /** Optional tools whose markdown specifications will be appended */
  tools?: UniversalTool<unknown, unknown>[];
  /** Whether to append tool documentation to the compiled prompt (defaults to true) */
  includeToolCatalog?: boolean;
}

/**
 * Compiles a raw prompt template by interpolating runtime variables and appending tool specifications.
 *
 * @example
 * ```typescript
 * const prompt = compilePrompt({
 *   template: "You are an assistant for {{tenantId}}.",
 *   variables: { tenantId: "tenant_corp" },
 *   tools: [searchDocsTool],
 * });
 * ```
 *
 * @param options - Compilation options including template, variables, and tools.
 * @returns Fully compiled, ready-to-execute system prompt text.
 */
export function compilePrompt(options: CompilePromptOptions): string {
  const {
    template,
    variables = {},
    tools = [],
    includeToolCatalog = true,
  } = options;

  logger.debug("[compilePrompt] Compiling prompt template", {
    variableCount: Object.keys(variables).length,
    toolCount: tools.length,
  });

  // 1. Interpolate variables into base template
  let compiled = interpolateTemplate(template, variables);

  // 2. Append tool catalog if enabled and tools are supplied
  if (includeToolCatalog && tools.length > 0) {
    const toolCatalogMarkdown = formatToolsForSystemPrompt(tools);
    compiled = `${compiled.trim()}\n\n${toolCatalogMarkdown.trim()}`;
  }

  return compiled.trim();
}
