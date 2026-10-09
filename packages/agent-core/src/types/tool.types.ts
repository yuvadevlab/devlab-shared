/**
 * @file packages/agent-core/src/types/tool.types.ts
 * @description Master interface and configuration contract for universal executable agent tools.
 * @module @yuva-devlab/agent-core
 */

import type { z } from "zod";
import type {
  AccessTier,
  ConfirmationPolicy,
  ToolCapability,
} from "../constants";
import type { AgentCardPayload } from "./card.types";
import type { ToolExecutionContext, ValidationWarning } from "./context.types";

/**
 * Universal interface for all executable tools across DevLab, OrchestraI, and FinAI.
 *
 * Generic over:
 * - `TInput`: Type of the parsed, validated arguments object.
 * - `TOutput`: Type of the result value produced by the tool.
 *
 * @example
 * ```typescript
 * const myTool: UniversalTool<{ query: string }, string[]> = {
 *   name: "search_docs",
 *   description: "Search platform knowledge base",
 *   accessTier: AccessTier.READ_ONLY,
 *   confirmation: ConfirmationPolicy.AUTO_EXECUTE,
 *   capabilities: [ToolCapability.NETWORK],
 *   inputSchema: z.object({ query: z.string() }),
 *   async execute({ query }, ctx) { return ["doc1", "doc2"]; },
 *   summarize(output) { return `Found ${output.length} documents`; },
 * };
 * ```
 */
export interface UniversalTool<
  TInput = Record<string, unknown>,
  TOutput = unknown,
> {
  /** Canonical name of the tool (alphanumeric, underscores, dashes) */
  readonly name: string;
  /** Detailed human- and model-readable description explaining tool purpose */
  readonly description: string;
  /** Access authorization tier required to execute this tool */
  readonly accessTier: AccessTier;
  /** Confirmation requirement policy before tool dispatch */
  readonly confirmation: ConfirmationPolicy;
  /** Declared sandboxing capabilities claimed by the tool */
  readonly capabilities: readonly ToolCapability[];
  /** Zod schema strictly validating input arguments */
  readonly inputSchema: z.ZodType<TInput>;
  /** Executes the tool logic within the given execution context */
  execute(input: TInput, ctx: ToolExecutionContext): Promise<TOutput>;
  /** Optional rich preview card generator for UI and human approvals */
  describe?(input: TInput): AgentCardPayload;
  /** Optional pre-flight parameter validator emitting warnings */
  validate?(
    input: TInput,
    ctx: ToolExecutionContext,
  ): Promise<ValidationWarning[]>;
  /** Generates a concise human-readable text summary of the tool output */
  summarize(output: TOutput): string;
}

/**
 * Configuration options passed to defineTool() factory.
 */
export interface DefineToolConfig<TInput, TOutput> {
  name: string;
  description: string;
  accessTier?: AccessTier;
  confirmation?: ConfirmationPolicy;
  capabilities?: readonly ToolCapability[];
  inputSchema: z.ZodType<TInput>;
  execute: (input: TInput, ctx: ToolExecutionContext) => Promise<TOutput>;
  describe?: (input: TInput) => AgentCardPayload;
  validate?: (
    input: TInput,
    ctx: ToolExecutionContext,
  ) => Promise<ValidationWarning[]>;
  summarize?: (output: TOutput) => string;
}
