/**
 * @file packages/cli/src/commands/doctor.command.ts
 * @description Comprehensive developer environment diagnostic suite.
 * @author yuva.devlab@gmail.com
 */

import { execSync } from "node:child_process";
import chalk from "chalk";
import { Command } from "commander";
import { findRootComposeFile, isDockerRunning } from "../utils/docker.util";
import { isPortInUse } from "../utils/net.util";
import {
  printBanner,
  printSection,
  formatBadge,
  BadgeStatus,
} from "../utils/terminal.util";

interface DiagnosticItem {
  readonly title: string;
  readonly status: BadgeStatus;
  readonly detail: string;
}

function safeExec(command: string): string | null {
  try {
    return execSync(command, {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "ignore"],
    }).trim();
  } catch {
    return null;
  }
}

/**
 * Registers the 'doctor' diagnostic command.
 */
export function registerDoctorCommand(program: Command): void {
  program
    .command("doctor")
    .description(
      "Verify developer tooling, runtime engines, and port prerequisites",
    )
    .action(async () => {
      printBanner("System Doctor & Runtime Diagnostic");

      const checks: DiagnosticItem[] = [];

      // 1. Node.js Version Check
      const nodeVersion = process.version;
      const nodeMajor = parseInt(nodeVersion.slice(1).split(".")[0] || "0", 10);
      checks.push({
        title: "Node.js Runtime",
        status: nodeMajor >= 20 ? BadgeStatus.SUCCESS : BadgeStatus.ERROR,
        detail: `${nodeVersion} (Required: >= v20.0.0)`,
      });

      // 2. pnpm Package Manager Check
      const pnpmVersion = safeExec("pnpm -v");
      checks.push({
        title: "pnpm Package Manager",
        status: pnpmVersion ? BadgeStatus.SUCCESS : BadgeStatus.ERROR,
        detail: pnpmVersion ? `v${pnpmVersion}` : "Not found in PATH",
      });

      // 3. Python / uv Check
      const uvVersion = safeExec("uv --version");
      checks.push({
        title: "Astral uv / Python",
        status: uvVersion ? BadgeStatus.SUCCESS : BadgeStatus.WARNING,
        detail: uvVersion || "uv not found (Required for devlab-guard)",
      });

      // 4. Docker Daemon Status
      const dockerUp = isDockerRunning();
      checks.push({
        title: "Docker Daemon",
        status: dockerUp ? BadgeStatus.SUCCESS : BadgeStatus.WARNING,
        detail: dockerUp ? "Active & responsive" : "Docker daemon unreachable",
      });

      // 5. Root Compose File
      const composeFile = findRootComposeFile();
      checks.push({
        title: "Root Infrastructure",
        status: composeFile ? BadgeStatus.SUCCESS : BadgeStatus.ERROR,
        detail: composeFile
          ? "Found docker-compose.yml"
          : "Missing docker-compose.yml",
      });

      // 6. Check Core Database Ports
      const postgresInUse = await isPortInUse(5432);
      const redisInUse = await isPortInUse(6379);

      checks.push({
        title: "PostgreSQL (:5432)",
        status: postgresInUse ? BadgeStatus.SUCCESS : BadgeStatus.INFO,
        detail: postgresInUse
          ? "Port bound (Active)"
          : "Port free (Run 'devlab infra up')",
      });

      checks.push({
        title: "Redis (:6379)",
        status: redisInUse ? BadgeStatus.SUCCESS : BadgeStatus.INFO,
        detail: redisInUse
          ? "Port bound (Active)"
          : "Port free (Run 'devlab infra up')",
      });

      printSection("Runtime & Tooling Diagnostics");
      for (const item of checks) {
        const badge = formatBadge(item.status, item.status);
        console.log(
          `  ${badge}  ${chalk.white.bold(item.title.padEnd(24))}  ${chalk.gray(item.detail)}`,
        );
      }
      console.log("");
    });
}
