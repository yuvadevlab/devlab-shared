/**
 * @file packages/cli/src/utils/terminal.util.ts
 * @description ANSI terminal formatting, banners, and table rendering utilities.
 * @author yuva.devlab@gmail.com
 */

import chalk from "chalk";

/**
 * Strips ANSI color codes from terminal output strings.
 */
function stripAnsi(text: string): string {
  // eslint-disable-next-line no-control-regex
  return text.replace(/\x1b\[[0-9;]*m/g, "");
}

/**
 * Renders the official Yuva DevLab ASCII CLI header banner.
 */
export function printBanner(subtitle?: string): void {
  const title = chalk.cyan.bold("YUVA DEVLAB CLI");
  const meta = chalk.gray("Ecosystem Operations & Developer Platform");
  console.log(`\n  ${chalk.bgCyan.black.bold(" DEVLAB ")} ${title} — ${meta}`);
  if (subtitle) {
    console.log(`  ${chalk.gray("↳")} ${chalk.white(subtitle)}`);
  }
  console.log("");
}

/**
 * Status indicator badge options.
 */
export enum BadgeStatus {
  SUCCESS = "SUCCESS",
  WARNING = "WARNING",
  ERROR = "ERROR",
  INFO = "INFO",
}

/**
 * Returns a styled terminal status badge.
 */
export function formatBadge(status: BadgeStatus, text: string): string {
  switch (status) {
    case BadgeStatus.SUCCESS:
      return chalk.bgGreen.black.bold(` ${text} `);
    case BadgeStatus.WARNING:
      return chalk.bgYellow.black.bold(` ${text} `);
    case BadgeStatus.ERROR:
      return chalk.bgRed.white.bold(` ${text} `);
    case BadgeStatus.INFO:
      return chalk.bgBlue.white.bold(` ${text} `);
    default:
      return ` ${text} `;
  }
}

/**
 * Column definition for terminal table rendering.
 */
export interface TableColumn<T> {
  readonly header: string;
  readonly width: number;
  readonly render: (row: T) => string;
}

/**
 * Renders a structured terminal table with borders and padded columns.
 */
export function printTable<T>(
  rows: readonly T[],
  columns: readonly TableColumn<T>[],
): void {
  if (rows.length === 0) {
    console.log(chalk.gray("  (no data)"));
    return;
  }

  // Header row
  const headerLine = columns
    .map((col) => chalk.bold(col.header.padEnd(col.width)))
    .join("  ");
  const separator = columns
    .map((col) => chalk.gray("─".repeat(col.width)))
    .join("  ");

  console.log(`  ${headerLine}`);
  console.log(`  ${separator}`);

  // Data rows
  for (const row of rows) {
    const rowLine = columns
      .map((col) => {
        const text = col.render(row);
        const clean = stripAnsi(text);
        const padSize = Math.max(0, col.width - clean.length);
        return text + " ".repeat(padSize);
      })
      .join("  ");
    console.log(`  ${rowLine}`);
  }
  console.log("");
}

/**
 * Prints a clean key-value section.
 */
export function printSection(title: string): void {
  console.log(`\n  ${chalk.cyan.bold(title)}`);
  console.log(`  ${chalk.gray("─".repeat(title.length + 2))}`);
}

/**
 * Prints a formatted key-value pair.
 */
export function printKeyValue(key: string, value: string): void {
  console.log(`  ${chalk.gray(key.padEnd(20))}: ${chalk.white(value)}`);
}
