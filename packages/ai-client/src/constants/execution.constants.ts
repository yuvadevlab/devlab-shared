/**
 * @file packages/ai-client/src/constants/execution.constants.ts
 * @description Centralized execution parameters, default timeouts, and sampling parameters.
 * @module @yuva-devlab/ai-client
 */

/**
 * Standard execution limits and operational defaults for AI model queries.
 */
export const AI_EXECUTION_DEFAULTS = Object.freeze({
  /** Default sampling temperature for balanced determinism and coherence */
  DEFAULT_TEMPERATURE: 0.7,
  /** Default per-request completion timeout in milliseconds (60 seconds) */
  DEFAULT_TIMEOUT_MS: 60000,
  /** Default upper bound for output token generation */
  DEFAULT_MAX_OUTPUT_TOKENS: 4096,
  /** Default retry limit for self-healing structured JSON output extraction */
  DEFAULT_MAX_REPAIR_RETRIES: 2,
});
