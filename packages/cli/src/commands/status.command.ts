/**
 * @file packages/cli/src/commands/status.command.ts
 * @description Real-time health, latency, and version inspection across all ecosystem APIs.
 * @author yuva.devlab@gmail.com
 */

import chalk from "chalk";
import { Command } from "commander";
import {
  DEFAULT_PROBE_TIMEOUT_MS,
  ECOSYSTEM_HEALTH_SERVICES,
  ServiceHealthConfig,
} from "../constants/services.constants";
import { HttpHealthOutcome, probeHttpHealth } from "../utils/net.util";
import {
  printBanner,
  printTable,
  TableColumn,
  formatBadge,
  BadgeStatus,
} from "../utils/terminal.util";

interface ServiceStatusRow {
  readonly config: ServiceHealthConfig;
  readonly outcome: HttpHealthOutcome;
}

/**
 * Registers the 'status' command.
 */
export function registerStatusCommand(program: Command): void {
  program
    .command("status")
    .description(
      "Ping health endpoints across all ecosystem services and render status scoreboard",
    )
    .option(
      "-t, --timeout <ms>",
      "Request timeout in milliseconds",
      String(DEFAULT_PROBE_TIMEOUT_MS),
    )
    .action(async (options: { timeout: string }) => {
      const timeoutMs =
        parseInt(options.timeout, 10) || DEFAULT_PROBE_TIMEOUT_MS;
      printBanner(
        `Ecosystem Service Health & Latency Probe (${timeoutMs}ms timeout)`,
      );

      const evaluations = ECOSYSTEM_HEALTH_SERVICES.map(async (config) => {
        const url = `http://${config.host}:${config.port}${config.healthPath}`;
        const outcome = await probeHttpHealth(url, timeoutMs);
        return { config, outcome };
      });

      const rows: ServiceStatusRow[] = await Promise.all(evaluations);

      const columns: TableColumn<ServiceStatusRow>[] = [
        {
          header: "SERVICE",
          width: 22,
          render: (r) => chalk.white.bold(r.config.name),
        },
        {
          header: "PORT",
          width: 8,
          render: (r) => chalk.cyan(String(r.config.port)),
        },
        {
          header: "STATUS",
          width: 14,
          render: (r) =>
            r.outcome.ok
              ? formatBadge(BadgeStatus.SUCCESS, "HEALTHY")
              : formatBadge(BadgeStatus.ERROR, "OFFLINE"),
        },
        {
          header: "LATENCY",
          width: 12,
          render: (r) => {
            if (!r.outcome.ok) return chalk.gray("—");
            const ms = r.outcome.latencyMs;
            if (ms < 50) return chalk.green(`${ms}ms`);
            if (ms < 200) return chalk.yellow(`${ms}ms`);
            return chalk.red(`${ms}ms`);
          },
        },
        {
          header: "VERSION",
          width: 14,
          render: (r) =>
            r.outcome.version
              ? chalk.magenta(r.outcome.version)
              : chalk.gray("—"),
        },
        {
          header: "DETAILS",
          width: 36,
          render: (r) =>
            r.outcome.ok
              ? chalk.gray(`GET ${r.config.healthPath} [${r.outcome.status}]`)
              : chalk.red(r.outcome.error || "Connection refused"),
        },
      ];

      printTable(rows, columns);
    });
}
