/**
 * @file packages/agent-core/src/types/context.types.ts
 * @description Execution environment context and validation warning schemas for tool invocations.
 * @module @yuva-devlab/agent-core
 */

import type { Logger } from "@yuva-devlab/logger";

/**
 * Non-blocking validation warning or advice emitted during tool input validation.
 */
export interface ValidationWarning {
  /** Field or parameter path */
  readonly field: string;
  /** Explanatory warning message for the agent */
  readonly message: string;
}

/**
 * Environmental context provided to a tool during its execution run.
 * Contains execution tracing metadata, cancellation handles, and workspace sandbox paths.
 *
 * @example
 * ```typescript
 * async function run(args: MyInput, ctx: ToolExecutionContext) {
 *   ctx.logger?.info("Tool starting", { executionId: ctx.executionId });
 *   if (ctx.abortSignal?.aborted) throw new Error("Aborted");
 * }
 * ```
 */
export interface ToolExecutionContext {
  /** Unique ID of the executing workflow run */
  readonly executionId?: string;
  /** Unique ID of the agent that dispatched this tool call */
  readonly agentId?: string;
  /** Tenant partition identifier */
  readonly tenantId?: string;
  /** Distributed trace ID for OpenTelemetry propagation */
  readonly traceId?: string;
  /** Root directory of the permitted workspace sandbox */
  readonly workspaceRoot?: string;
  /** Authorized directory paths */
  readonly allowedRoots?: readonly string[];
  /** Cooperative cancellation signal */
  readonly abortSignal?: AbortSignal;
  /** Scoped logger instance */
  readonly logger?: Logger;
  /** Structured key-value metadata for audit tracking */
  readonly metadata?: Readonly<Record<string, unknown>>;
}
