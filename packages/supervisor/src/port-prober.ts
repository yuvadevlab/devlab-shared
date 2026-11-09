/**
 * @file packages/supervisor/src/port-prober.ts
 * @description TCP port probe, occupancy inspection, and conflict resolution utility.
 * @module @yuva-devlab/supervisor
 * @author yuva.devlab@gmail.com
 */

import net from "node:net";
import { exec } from "node:child_process";
import { promisify } from "node:util";
import os from "node:os";
import type { PortStatus } from "./types";

const execAsync = promisify(exec);

/**
 * Utility for active TCP port scanning, process discovery, and conflict clearing.
 */
export class PortProber {
  /**
   * Checks whether a TCP port is currently occupied by attempting to bind to it.
   *
   * @param port - Port number to verify
   * @returns True if port is occupied or actively listening
   */
  static async isPortInUse(port: number): Promise<boolean> {
    return new Promise((resolve) => {
      const server = net.createServer();

      server.once("error", (err: NodeJS.ErrnoException) => {
        if (err.code === "EADDRINUSE" || err.code === "EACCES") {
          resolve(true);
        } else {
          resolve(false);
        }
      });

      server.once("listening", () => {
        server.close(() => resolve(false));
      });

      server.listen(port, "127.0.0.1");
    });
  }

  /**
   * Discovers the Operating System Process ID (PID) currently holding a TCP port.
   * Cross-platform support for macOS, Linux, and Windows.
   *
   * @param port - TCP port number
   * @returns PID number, or null if undiscoverable
   */
  static async findPidUsingPort(port: number): Promise<number | null> {
    const isWindows = os.platform() === "win32";

    try {
      if (isWindows) {
        // Windows netstat approach
        const { stdout } = await execAsync(
          `netstat -ano -p tcp | findstr :${port}`,
        );
        const lines = stdout.trim().split("\n");
        for (const line of lines) {
          const parts = line.trim().split(/\s+/);
          const state = parts[3];
          const pidStr = parts[4];
          if (state === "LISTENING" && pidStr) {
            const pid = parseInt(pidStr, 10);
            if (!Number.isNaN(pid) && pid > 0) return pid;
          }
        }
      } else {
        // macOS / Linux lsof approach
        const { stdout } = await execAsync(`lsof -ti tcp:${port}`);
        const trimmed = stdout.trim();
        if (trimmed) {
          // If multiple PIDs, take the first/root PID
          const pids = trimmed
            .split("\n")
            .map((p) => parseInt(p.trim(), 10))
            .filter((p) => !Number.isNaN(p));
          if (pids.length > 0) return pids[0] ?? null;
        }
      }
    } catch {
      // lsof or netstat exits with code 1 if no process found
      return null;
    }

    return null;
  }

  /**
   * Inspects a list of configured ports and returns their status and bound PIDs.
   */
  static async checkPorts(ports: readonly number[]): Promise<PortStatus[]> {
    if (!ports || ports.length === 0) return [];

    return Promise.all(
      ports.map(async (port) => {
        const inUse = await this.isPortInUse(port);
        let pid: number | null = null;
        if (inUse) {
          pid = await this.findPidUsingPort(port);
        }
        return { port, inUse, pid };
      }),
    );
  }

  /**
   * Terminates the process currently bound to the specified port if one exists.
   * Refuses to kill protected system PIDs (PID 0, 1, or self).
   *
   * @param port - TCP port to free
   * @returns True if a process was found and killed, or if the port was already free
   */
  static async freePort(port: number): Promise<boolean> {
    const pid = await this.findPidUsingPort(port);
    if (!pid) {
      return true; // Already free
    }

    // Safety check: Never kill PID 0, PID 1, or our own Node process
    if (pid <= 1 || pid === process.pid) {
      throw new Error(
        `Refusing to terminate protected process PID ${pid} holding port ${port}`,
      );
    }

    try {
      process.kill(pid, "SIGTERM");
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Check if still alive, escalate to SIGKILL
      try {
        process.kill(pid, 0); // throws if process is dead
        process.kill(pid, "SIGKILL");
        await new Promise((resolve) => setTimeout(resolve, 400));
      } catch {
        // Process is already dead
      }

      return !(await this.isPortInUse(port));
    } catch {
      return false;
    }
  }

  /**
   * Scans and safely clears all occupied ports from the given list.
   */
  static async clearOccupiedPorts(
    ports?: readonly number[],
    onLog?: (msg: string, level: "info" | "warn") => void,
  ): Promise<void> {
    if (!ports) return;
    for (const port of ports) {
      if (await this.isPortInUse(port)) {
        onLog?.(`Port ${port} occupied. Resolving conflict...`, "warn");
        if (!(await this.freePort(port))) {
          throw new Error(
            `Port ${port} is occupied and could not be released.`,
          );
        }
        onLog?.(`Port ${port} released.`, "info");
      }
    }
  }
}
