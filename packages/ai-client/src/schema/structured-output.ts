/**
 * @file packages/ai-client/src/schema/structured-output.ts
 * @description Type-safe structured output extractor with automatic JSON repair and Zod validation.
 * @module @yuva-devlab/ai-client
 */

import { z } from "zod";
import { DomainError, ErrorCode } from "@yuva-devlab/errors";
import { Logger, loggerWithConfig } from "@yuva-devlab/logger";
import { AI_EXECUTION_DEFAULTS } from "../constants";
import {
  createAssistantMessage,
  createUserMessage,
  type ILLMProvider,
  type LLMRequest,
} from "../types";

const logger = loggerWithConfig(new Logger("StructuredOutput"));

/**
 * Configuration options for extracting structured schema objects.
 */
export interface ExtractStructuredOutputOptions<T> {
  /** Target provider executing completions */
  provider: ILLMProvider;
  /** Base completion request */
  request: LLMRequest;
  /** Zod schema validating the output */
  schema: z.ZodType<T>;
  /** Maximum self-healing JSON repair rounds before failing (defaults to AI_EXECUTION_DEFAULTS.DEFAULT_MAX_REPAIR_RETRIES) */
  maxRepairRetries?: number;
}

/**
 * Strips markdown code blocks (```json ... ```) to extract raw JSON payload.
 *
 * @param raw - Raw model text possibly containing markdown code fences.
 * @returns Cleaned JSON string candidate.
 */
function cleanJsonText(raw: string): string {
  const match = /```(?:json)?\s*([\s\S]*?)\s*```/i.exec(raw);
  if (match && match[1]) {
    return match[1].trim();
  }
  return raw.trim();
}

/**
 * Executes a completion request and parses the output into a strictly validated Zod schema.
 * Automatically initiates self-healing repair rounds with the model if JSON syntax or schema fails.
 *
 * @example
 * ```typescript
 * const UserProfileSchema = z.object({ name: z.string(), age: z.number() });
 * const user = await extractStructuredOutput({
 *   provider,
 *   request: { model: "qwen2.5:7b", messages: [createUserMessage("Generate a user")] },
 *   schema: UserProfileSchema,
 * });
 * console.log(user.name);
 * ```
 *
 * @param options - Extraction options including provider, request, schema, and maxRepairRetries.
 * @returns Fully validated typed object matching schema.
 */
export async function extractStructuredOutput<T>(
  options: ExtractStructuredOutputOptions<T>,
): Promise<T> {
  const {
    provider,
    request,
    schema,
    maxRepairRetries = AI_EXECUTION_DEFAULTS.DEFAULT_MAX_REPAIR_RETRIES,
  } = options;
  let currentRequest: LLMRequest = {
    ...request,
    responseFormat: "json_object",
  };
  let attempts = 0;

  while (attempts <= maxRepairRetries) {
    attempts++;
    const response = await provider.complete(currentRequest);
    const cleaned = cleanJsonText(response.text);

    try {
      const parsedJson = JSON.parse(cleaned) as unknown;
      return schema.parse(parsedJson);
    } catch (parseOrValidationError: unknown) {
      const errorDetail =
        parseOrValidationError instanceof Error
          ? parseOrValidationError.message
          : String(parseOrValidationError);

      logger.warn(
        `[extractStructuredOutput] Structured output parsing failed (attempt ${attempts}/${maxRepairRetries + 1})`,
        {
          error: errorDetail,
        },
      );

      if (attempts > maxRepairRetries) {
        throw new DomainError(
          `Failed to parse valid structured output after ${attempts} attempts: ${errorDetail}`,
          ErrorCode.MODEL_OUTPUT_INVALID,
          422,
          { rawOutput: response.text, errorDetail },
        );
      }

      // Append self-healing repair instruction turn using strictly typed message factories
      currentRequest = {
        ...currentRequest,
        messages: [
          ...currentRequest.messages,
          createAssistantMessage(response.text),
          createUserMessage(
            `The previous response failed schema validation with error: ${errorDetail}. Please provide ONLY a valid JSON object matching the requested schema. Do not include markdown fences or explanation.`,
          ),
        ],
      };
    }
  }

  throw new DomainError(
    "Exhausted retries in extractStructuredOutput",
    ErrorCode.MODEL_OUTPUT_INVALID,
    422,
  );
}
