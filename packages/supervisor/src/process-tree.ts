/**
 * @file packages/supervisor/src/process-tree.ts
 * @description Cross-platform process group spawner, process tree discovery, and signal escalation terminator.
 * @module @yuva-devlab/supervisor
 * @author yuva.devlab@gmail.com
 */

import {
  spawn,
  type ChildProcess,
  type SpawnOptions,
} from "node:child_process";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import os from "node:os";

const execAsync = promisify(exec);

/**
 * Manages spawning detached process trees and executing safe, recursive process group terminations.
 */
export class ProcessTreeManager {
  /**
   * Spawns a child process in a detached process group, isolating it from the host event loop.
   */
  static spawnProcess(
    command: string,
    args: readonly string[] = [],
    options: {
      cwd: string;
      env?: Record<string, string>;
    },
  ): ChildProcess {
    const isWindows = os.platform() === "win32";

    const spawnOptions: SpawnOptions = {
      cwd: options.cwd,
      env: { ...process.env, ...options.env },
      detached: !isWindows, // POSIX detached process group
      shell: isWindows, // Windows requires shell resolution for .cmd/.bat (e.g. pnpm.cmd)
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true,
    };

    return spawn(command, [...args], spawnOptions);
  }

  /**
   * Checks whether a specific process identifier is currently alive.
   */
  static isAlive(pid: number | null | undefined): boolean {
    if (!pid || pid <= 0) return false;
    try {
      process.kill(pid, 0);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Gracefully terminates an entire process tree, escalating from SIGINT -> SIGTERM -> SIGKILL.
   * On Windows, delegates to `taskkill /pid <pid> /T /F`.
   * On POSIX, broadcasts signals to the process group (`-pid`).
   *
   * @param pid - Target root process identifier
   * @param gracefulTimeoutMs - Milliseconds to allow for graceful shutdown before escalating (default: 4000)
   */
  static async killTree(pid: number, gracefulTimeoutMs = 4000): Promise<void> {
    if (!this.isAlive(pid)) {
      return;
    }

    const isWindows = os.platform() === "win32";

    if (isWindows) {
      try {
        await execAsync(`taskkill /pid ${pid} /T /F`);
      } catch {
        // Ignored if process terminated before taskkill completed
      }
      return;
    }

    // POSIX Process Group Termination
    try {
      // 1. Dispatch SIGINT to the process group
      try {
        process.kill(-pid, "SIGINT");
      } catch {
        // Fallback to direct PID if process group fails
        process.kill(pid, "SIGINT");
      }

      // Wait up to gracefulTimeoutMs for graceful exit
      const pollIntervalMs = 250;
      let elapsed = 0;
      while (elapsed < gracefulTimeoutMs) {
        await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
        elapsed += pollIntervalMs;
        if (!this.isAlive(pid)) {
          return;
        }
      }

      // 2. Escalate to SIGTERM
      if (this.isAlive(pid)) {
        try {
          process.kill(-pid, "SIGTERM");
        } catch {
          process.kill(pid, "SIGTERM");
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      // 3. Final escalation to SIGKILL if still hanging
      if (this.isAlive(pid)) {
        try {
          process.kill(-pid, "SIGKILL");
        } catch {
          process.kill(pid, "SIGKILL");
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      // 4. Clean up any orphaned child processes of this PID
      try {
        await execAsync(`pkill -KILL -P ${pid} 2>/dev/null || true`);
      } catch {
        // Ignored
      }
    } catch {
      // Completed or process already exited
    }
  }
}
