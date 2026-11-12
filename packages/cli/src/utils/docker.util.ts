/**
 * @file packages/cli/src/utils/docker.util.ts
 * @description Docker daemon detection and root compose orchestration helpers.
 * @author yuva.devlab@gmail.com
 */

import { execSync, spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

/**
 * Discovers the absolute path to the root docker-compose.yml.
 */
export function findRootComposeFile(): string | null {
  let currentDir = process.cwd();
  for (let i = 0; i < 5; i++) {
    const candidate = path.join(currentDir, "docker-compose.yml");
    if (fs.existsSync(candidate)) {
      return candidate;
    }
    const parent = path.dirname(currentDir);
    if (parent === currentDir) break;
    currentDir = parent;
  }
  return null;
}

/**
 * Checks whether the local Docker daemon is active and responsive.
 */
export function isDockerRunning(): boolean {
  try {
    execSync("docker info", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

/**
 * Spawns a docker compose command against the discovered root compose file.
 */
export function runDockerCompose(
  args: readonly string[],
  composeFilePath?: string,
): Promise<number> {
  const file = composeFilePath || findRootComposeFile();
  if (!file) {
    throw new Error(
      "Unable to locate root docker-compose.yml in workspace ancestry.",
    );
  }

  return new Promise((resolve, reject) => {
    const proc = spawn("docker", ["compose", "-f", file, ...args], {
      stdio: "inherit",
    });

    proc.on("error", (err: Error) => reject(err));
    proc.on("close", (code: number | null) => resolve(code ?? 0));
  });
}
