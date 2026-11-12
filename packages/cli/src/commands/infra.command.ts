/**
 * @file packages/cli/src/commands/infra.command.ts
 * @description Local Docker infrastructure lifecycle management command.
 * @author yuva.devlab@gmail.com
 */

import chalk from "chalk";
import { Command } from "commander";
import { findRootComposeFile, runDockerCompose } from "../utils/docker.util";
import { printBanner } from "../utils/terminal.util";

/**
 * Registers the 'infra' command suite.
 */
export function registerInfraCommand(program: Command): void {
  const infra = program
    .command("infra")
    .description(
      "Manage local Docker ecosystem infrastructure (PostgreSQL, Redis, Redpanda, Ollama)",
    );

  infra
    .command("up")
    .description(
      "Start the local cloud infrastructure stack in background (-d)",
    )
    .action(async () => {
      printBanner("Starting Local Infrastructure Containers");
      const file = findRootComposeFile();
      if (!file) {
        console.error(
          chalk.red("  ✗ Error: Could not locate docker-compose.yml"),
        );
        process.exit(1);
      }
      console.log(chalk.gray(`  Using compose file: ${file}\n`));
      await runDockerCompose(["up", "-d"], file ?? undefined);
      console.log(
        chalk.green("\n  ✓ Infrastructure stack started successfully."),
      );
    });

  infra
    .command("down")
    .description("Gracefully stop and dismantle the local infrastructure stack")
    .action(async () => {
      printBanner("Stopping Local Infrastructure Containers");
      const file = findRootComposeFile();
      if (!file) {
        console.error(
          chalk.red("  ✗ Error: Could not locate docker-compose.yml"),
        );
        process.exit(1);
      }
      await runDockerCompose(["down"], file ?? undefined);
      console.log(chalk.green("\n  ✓ Infrastructure stack stopped."));
    });

  infra
    .command("status")
    .description("List active container states and health checks")
    .action(async () => {
      printBanner("Container Status & Health");
      const file = findRootComposeFile();
      if (!file) {
        console.error(
          chalk.red("  ✗ Error: Could not locate docker-compose.yml"),
        );
        process.exit(1);
      }
      await runDockerCompose(["ps"], file ?? undefined);
    });

  infra
    .command("logs")
    .description("Stream live container logs")
    .option("-s, --service <name>", "Filter logs by service name")
    .action(async (options: { service?: string }) => {
      printBanner("Streaming Infrastructure Logs");
      const file = findRootComposeFile();
      if (!file) {
        console.error(
          chalk.red("  ✗ Error: Could not locate docker-compose.yml"),
        );
        process.exit(1);
      }
      const args = ["logs", "-f", "--tail", "50"];
      if (options.service) {
        args.push(options.service);
      }
      await runDockerCompose(args, file ?? undefined);
    });
}
