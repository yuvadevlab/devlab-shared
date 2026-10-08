/**
 * @file packages/agent-core/src/tool/define-tool.ts
 * @description Type-safe factory function creating validated UniversalTool instances with telemetry.
 * @module @yuva-devlab/agent-core
 */

import {
  DomainError,
  ErrorCode,
  ToolExecutionError,
  ValidationError,
} from "@yuva-devlab/errors";
import { Logger, loggerWithConfig } from "@yuva-devlab/logger";
import { AccessTier, ConfirmationPolicy } from "../constants";
import type {
  DefineToolConfig,
  ToolExecutionContext,
  UniversalTool,
} from "../types";

const defaultLogger = loggerWithConfig(new Logger("UniversalTool"));

/**
 * Creates a fully validated UniversalTool instance with runtime Zod argument assertions,
 * execution timing, structured logging, and standardized error wrapping.
 *
 * @example
 * ```typescript
 * export const addNumbersTool = defineTool({
 *   name: "add_numbers",
 *   description: "Adds two floating point numbers together",
 *   accessTier: AccessTier.READ_ONLY,
 *   inputSchema: z.object({ a: z.number(), b: z.number() }),
 *   async execute({ a, b }) { return a + b; },
 *   summarize: (sum) => `Sum is ${sum}`,
 * });
 * ```
 *
 * @param config - Tool definition parameters and execution closure.
 * @returns Instantiated UniversalTool ready for agent registration.
 */
export function defineTool<TInput, TOutput>(
  config: DefineToolConfig<TInput, TOutput>,
): UniversalTool<TInput, TOutput> {
  const toolName = config.name.trim();

  // Validate name invariant
  if (!toolName) {
    throw new DomainError(
      "Tool definition requires a non-empty name",
      ErrorCode.VALIDATION_ERROR,
      400,
    );
  }

  const accessTier = config.accessTier ?? AccessTier.READ_ONLY;
  const confirmation = config.confirmation ?? ConfirmationPolicy.AUTO_EXECUTE;
  const capabilities = config.capabilities ?? [];

  return {
    name: toolName,
    description: config.description.trim(),
    accessTier,
    confirmation,
    capabilities,
    inputSchema: config.inputSchema,

    async execute(
      rawInput: TInput,
      ctx: ToolExecutionContext,
    ): Promise<TOutput> {
      const startTime = Date.now();
      const activeLogger = ctx.logger ?? defaultLogger;

      activeLogger.debug(`[execute] Validating inputs for tool '${toolName}'`, {
        executionId: ctx.executionId,
      });

      // 1. Strict schema validation guard
      const parseResult = config.inputSchema.safeParse(rawInput);
      if (!parseResult.success) {
        const issues = parseResult.error.issues;
        activeLogger.warn(
          `[execute] Tool '${toolName}' input validation failed`,
          {
            issues,
          },
        );
        throw new ValidationError(
          `Invalid arguments provided to tool '${toolName}'`,
          issues,
        );
      }

      // 2. Cancellation check
      if (ctx.abortSignal?.aborted) {
        throw new DomainError(
          `Execution of tool '${toolName}' was cancelled`,
          ErrorCode.REQUEST_TIMEOUT,
          408,
        );
      }

      // 3. Tool execution with error wrapping
      try {
        activeLogger.debug(`[execute] Executing tool '${toolName}'`);
        const output = await config.execute(parseResult.data, ctx);
        const durationMs = Date.now() - startTime;

        activeLogger.info(
          `[execute] Tool '${toolName}' executed successfully`,
          {
            durationMs,
            executionId: ctx.executionId,
          },
        );

        return output;
      } catch (err: unknown) {
        const durationMs = Date.now() - startTime;
        const causeMsg = err instanceof Error ? err.message : String(err);

        activeLogger.error(
          `[execute] Tool '${toolName}' execution failed after ${durationMs}ms`,
          {
            error: causeMsg,
            executionId: ctx.executionId,
          },
        );

        // Re-throw if already a domain error
        if (DomainError.isDomainError(err)) {
          throw err;
        }

        throw new ToolExecutionError(toolName, causeMsg, {
          originalError: err,
        });
      }
    },

    describe: config.describe,
    validate: config.validate,
    summarize:
      config.summarize ?? ((output: TOutput) => JSON.stringify(output)),
  };
}
