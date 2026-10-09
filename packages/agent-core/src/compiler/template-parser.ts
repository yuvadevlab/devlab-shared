/**
 * @file packages/agent-core/src/compiler/template-parser.ts
 * @description Safe string template interpolator replacing double-brace {{variable}} tags.
 * @module @yuva-devlab/agent-core
 */

import { PROMPT_COMPILER_DEFAULTS } from "../constants";

/**
 * Replaces double-bracket tokens `{{variable}}` with sanitized values from a dictionary.
 * Unmatched tokens are retained or stripped based on options.
 *
 * @example
 * ```typescript
 * const text = interpolateTemplate("Hello {{name}}, you have {{count}} alerts.", {
 *   name: "Yuva",
 *   count: 3,
 * });
 * console.log(text); // "Hello Yuva, you have 3 alerts."
 * ```
 *
 * @param template - Raw prompt string containing `{{tokens}}`.
 * @param variables - Key-value dictionary of values to substitute.
 * @param keepUnmatched - When true, leaves unmapped tokens as `{{token}}`. Defaults to false (empties).
 * @returns Fully interpolated prompt text.
 */
export function interpolateTemplate(
  template: string,
  variables: Record<string, unknown> = {},
  keepUnmatched = false,
): string {
  if (!template) {
    return "";
  }

  const { VARIABLE_OPEN_DELIMITER, VARIABLE_CLOSE_DELIMITER } =
    PROMPT_COMPILER_DEFAULTS;
  const regex = new RegExp(
    `${VARIABLE_OPEN_DELIMITER}\\s*([a-zA-Z0-9_.-]+)\\s*${VARIABLE_CLOSE_DELIMITER}`,
    "g",
  );

  return template.replace(regex, (match, key: string) => {
    if (Object.prototype.hasOwnProperty.call(variables, key)) {
      const val = variables[key];
      if (val === null || val === undefined) {
        return "";
      }
      if (typeof val === "object") {
        return JSON.stringify(val, null, 2);
      }
      return String(val);
    }

    return keepUnmatched ? match : "";
  });
}
