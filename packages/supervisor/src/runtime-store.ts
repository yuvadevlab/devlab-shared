/**
 * @file packages/supervisor/src/runtime-store.ts
 * @description Persistent local runtime cache storing active PID/PGID metadata to survive host/portal reloads.
 * @module @yuva-devlab/supervisor
 * @author yuva.devlab@gmail.com
 */

import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { ProcessTreeManager } from "./process-tree";
import type { ProcessRuntimeRecord } from "./types";

/**
 * File-backed persistence store for tracking spawned background processes across restarts.
 */
export class RuntimeStore {
  private readonly filePath: string;
  private readonly dirPath: string;

  constructor(customDir?: string) {
    this.dirPath = customDir || path.join(os.homedir(), ".devlab", "runtime");
    this.filePath = path.join(this.dirPath, "processes.json");
  }

  /**
   * Ensures the runtime persistence directory exists.
   */
  private async ensureDir(): Promise<void> {
    try {
      await fs.mkdir(this.dirPath, { recursive: true });
    } catch {
      // Ignored if already exists
    }
  }

  /**
   * Reads all active runtime records from disk.
   */
  async getAll(): Promise<Record<string, ProcessRuntimeRecord>> {
    try {
      await this.ensureDir();
      const content = await fs.readFile(this.filePath, "utf-8");
      return JSON.parse(content) as Record<string, ProcessRuntimeRecord>;
    } catch {
      return {};
    }
  }

  /**
   * Retrieves the runtime record for a specific application.
   */
  async get(appId: string): Promise<ProcessRuntimeRecord | null> {
    const all = await this.getAll();
    return all[appId] ?? null;
  }

  /**
   * Saves or updates a runtime record for an application.
   */
  async save(record: ProcessRuntimeRecord): Promise<void> {
    await this.ensureDir();
    const all = await this.getAll();
    all[record.appId] = record;
    await fs.writeFile(this.filePath, JSON.stringify(all, null, 2), "utf-8");
  }

  /**
   * Removes an application's runtime record upon graceful termination.
   */
  async remove(appId: string): Promise<void> {
    const all = await this.getAll();
    if (all[appId]) {
      delete all[appId];
      await fs.writeFile(this.filePath, JSON.stringify(all, null, 2), "utf-8");
    }
  }

  /**
   * Clears all stored records.
   */
  async clear(): Promise<void> {
    try {
      await fs.writeFile(this.filePath, "{}", "utf-8");
    } catch {
      // Ignored
    }
  }

  /**
   * Reconciles recorded processes against living OS processes.
   */
  async restoreActive(
    onAlive: (record: ProcessRuntimeRecord) => void,
  ): Promise<void> {
    const records = await this.getAll();
    for (const [appId, record] of Object.entries(records)) {
      if (ProcessTreeManager.isAlive(record.pid)) {
        onAlive(record);
      } else {
        await this.remove(appId);
      }
    }
  }
}
