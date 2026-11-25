/**
 * @file packages/ui/src/components/terminal/terminal.helpers.ts
 * @description Formatting and severity helper utilities for Terminal telemetry rows.
 */

import { TerminalEntryLevel, type TerminalEntry } from "./terminal-types";

/**
 * Formats an elapsed millisecond offset into a compact second label (e.g. `+1.25s`).
 */
export function formatTerminalOffset(ms?: number): string {
  if (ms === undefined) return "";
  return `+${(ms / 1000).toFixed(2)}s`;
}

/**
 * Serializes structured terminal entries into plain-text clipboard lines.
 */
export function serializeTerminalEntries(entries: TerminalEntry[]): string {
  return entries
    .map((entry) => {
      const time =
        entry.timestampLabel ?? formatTerminalOffset(entry.elapsedMs);
      const timePrefix = time ? `[${time}] ` : "";
      const lvlPrefix = entry.level ? `[${entry.level}] ` : "";
      const detail = entry.detail ? ` (${entry.detail})` : "";
      return `${timePrefix}${lvlPrefix}${entry.message}${detail}`;
    })
    .join("\n");
}

/**
 * Maps an optional terminal entry level to its semantic BEM modifier class.
 */
export function getTerminalLevelModifier(level?: string): string {
  if (!level) return "";
  const norm = level.toUpperCase();
  if (norm === TerminalEntryLevel.ERR) return "dl-terminal__level--err";
  if (norm === TerminalEntryLevel.DONE) return "dl-terminal__level--done";
  if (norm === TerminalEntryLevel.TOOL || norm === TerminalEntryLevel.LLM) {
    return "dl-terminal__level--tool";
  }
  return "";
}
