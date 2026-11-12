/**
 * @file packages/cli/src/commands/ports.command.ts
 * @description Command to display the 3*** / 4*** / 8*** (+10) port matrix and probe active listeners.
 * @author yuva.devlab@gmail.com
 */

import chalk from "chalk";
import { Command } from "commander";
import {
  ECOSYSTEM_PORTS,
  PortCategory,
  PROD_PORT_OFFSET,
  ServicePortDefinition,
} from "../constants/ports.constants";
import { isPortInUse } from "../utils/net.util";
import {
  printBanner,
  printTable,
  TableColumn,
  formatBadge,
  BadgeStatus,
} from "../utils/terminal.util";

interface PortRow extends ServicePortDefinition {
  isDevActive: boolean;
}

/**
 * Registers the 'ports' command with the commander program.
 */
export function registerPortsCommand(program: Command): void {
  program
    .command("ports")
    .description(
      "Display the ecosystem port matrix and inspect active socket listeners",
    )
    .option(
      "-p, --probe",
      "Actively test local ports for open socket connections",
      true,
    )
    .action(async (options: { probe: boolean }) => {
      printBanner(
        "Port Matrix & Active Listeners (3*** Web / 4*** API / 8*** Dedicated)",
      );

      const rows: PortRow[] = [];

      for (const service of ECOSYSTEM_PORTS) {
        let isDevActive = false;
        if (options.probe) {
          isDevActive = await isPortInUse(service.devPort);
        }
        rows.push({ ...service, isDevActive });
      }

      const columns: TableColumn<PortRow>[] = [
        {
          header: "SERVICE",
          width: 24,
          render: (r) => chalk.white.bold(r.name),
        },
        {
          header: "CATEGORY",
          width: 16,
          render: (r) => {
            switch (r.category) {
              case PortCategory.WEB:
                return chalk.blue("Web (3***)");
              case PortCategory.API:
                return chalk.magenta("API (4***)");
              case PortCategory.DEDICATED_API:
                return chalk.yellow("Dedicated (8***)");
              default:
                return chalk.gray("Infra");
            }
          },
        },
        {
          header: "DEV PORT",
          width: 12,
          render: (r) => chalk.cyan.bold(String(r.devPort)),
        },
        {
          header: `PROD (+${PROD_PORT_OFFSET})`,
          width: 12,
          render: (r) => chalk.green(String(r.prodPort)),
        },
        {
          header: "STATUS",
          width: 14,
          render: (r) =>
            r.isDevActive
              ? formatBadge(BadgeStatus.SUCCESS, "LISTENING")
              : chalk.gray("idle"),
        },
        {
          header: "DESCRIPTION",
          width: 42,
          render: (r) => chalk.gray(r.description),
        },
      ];

      printTable(rows, columns);

      console.log(
        chalk.gray(
          `  Rule: 3*** (Web) • 4*** (API) • 8*** (Dedicated) • +${PROD_PORT_OFFSET} for Production`,
        ),
      );
      console.log("");
    });
}
