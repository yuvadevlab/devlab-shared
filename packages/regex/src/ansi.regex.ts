/**
 * @file packages/regex/src/ansi.regex.ts
 * @description Centralized ANSI escape sequences and terminal text sanitization patterns.
 * @module @yuva-devlab/regex
 * @author yuva.devlab@gmail.com
 */

/**
 * Pattern matching all standard and non-standard ANSI escape sequences.
 * Matches 7-bit and 8-bit C1 escape codes, CSI sequences, OSC sequences, and styling reset codes.
 */
/* eslint-disable-next-line no-control-regex */
export const ANSI_REGEX = /\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])/g;

/**
 * Checks whether a given string contains ANSI escape sequences.
 *
 * @param text - Input string to verify
 * @returns True if ANSI sequences are detected
 */
export function hasAnsi(text: string): boolean {
  /* eslint-disable-next-line no-control-regex */
  return /\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])/.test(text);
}

/**
 * Strips ANSI escape sequences from text, producing clean plain text.
 *
 * @param text - String containing potential ANSI escape sequences
 * @returns Clean string with all escape sequences removed
 */
export function stripAnsi(text: string): string {
  return text.replace(ANSI_REGEX, "");
}
