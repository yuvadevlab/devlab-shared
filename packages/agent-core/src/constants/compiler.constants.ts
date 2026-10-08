/**
 * @file packages/agent-core/src/constants/compiler.constants.ts
 * @description Centralized defaults and token limits for dynamic prompt compilation.
 * @module @yuva-devlab/agent-core
 */

/**
 * Operational defaults and delimiters for dynamic prompt compilation.
 */
export const PROMPT_COMPILER_DEFAULTS = Object.freeze({
  /** Opening delimiter for template variable interpolation */
  VARIABLE_OPEN_DELIMITER: "{{",
  /** Closing delimiter for template variable interpolation */
  VARIABLE_CLOSE_DELIMITER: "}}",
  /** Maximum character length permitted for a single interpolated variable */
  MAX_VARIABLE_LENGTH_CHARS: 65536,
  /** Maximum number of variables allowed per template */
  MAX_VARIABLE_COUNT: 256,
});
