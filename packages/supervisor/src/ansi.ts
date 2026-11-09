/**
 * @file packages/supervisor/src/ansi.ts
 * @description ANSI escape code removal and terminal string utilities.
 * @module @yuva-devlab/supervisor
 * @author yuva.devlab@gmail.com
 */

/* eslint-disable-next-line no-control-regex */
const ANSI_PATTERN = /\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])/g;

/**
 * Strips ANSI escape sequences from terminal log strings.
 */
export function stripAnsi(text: string): string {
  return text.replace(ANSI_PATTERN, "");
}
