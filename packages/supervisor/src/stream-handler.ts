/**
 * @file packages/supervisor/src/stream-handler.ts
 * @description Stream multiplexer, line splitter, severity analyzer, and disk logging engine.
 * @module @yuva-devlab/supervisor
 * @author yuva.devlab@gmail.com
 */

import path from "node:path";
import fs from "node:fs/promises";
import type { ChildProcess } from "node:child_process";
import { stripAnsi } from "./ansi";
import type {
  ProcessLogEntry,
  ProcessLogLevel,
  ProcessLogStream,
} from "./types";

const ERROR_PATTERN =
  /(\[ERROR\]|\bERROR\b|\bException\b|\bfatal\b|Failed to)/i;
const WARN_PATTERN = /(\[WARN\]|\bWARN\b|\bWARNING\b)/i;
const DEBUG_PATTERN = /(\[DEBUG\]|\bDEBUG\b)/i;

/**
 * Handles capturing, parsing, and persisting standard streams from managed processes.
 */
export class StreamHandler {
  private readonly logDir: string;

  constructor(logDir: string) {
    this.logDir = logDir;
  }

  /**
   * Evaluates log level from line content and stream origin.
   */
  classifyLevel(
    line: string,
    defaultStream: ProcessLogStream = "stdout",
  ): ProcessLogLevel {
    const clean = stripAnsi(line);
    if (ERROR_PATTERN.test(clean)) return "error";
    if (WARN_PATTERN.test(clean)) return "warn";
    if (DEBUG_PATTERN.test(clean)) return "debug";
    return defaultStream === "stderr" ? "warn" : "info";
  }

  /**
   * Creates a normalized ProcessLogEntry from line text.
   */
  createEntry(
    appId: string,
    rawText: string,
    stream: ProcessLogStream,
    level?: ProcessLogLevel,
  ): ProcessLogEntry {
    const resolvedLevel = level || this.classifyLevel(rawText, stream);
    return {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      appId,
      timestamp: new Date().toISOString(),
      level: resolvedLevel,
      message: stripAnsi(rawText),
      raw: rawText,
      stream,
    };
  }

  /**
   * Non-blocking persistent disk write partitioned by date.
   */
  async writeToDisk(appId: string, entry: ProcessLogEntry): Promise<void> {
    try {
      const today = new Date().toISOString().split("T")[0] ?? "unknown";
      const appLogDir = path.join(this.logDir, appId, today);
      await fs.mkdir(appLogDir, { recursive: true });

      const logFile = path.join(appLogDir, `${appId}.log`);
      const line = `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.message}\n`;
      await fs.appendFile(logFile, line, "utf-8");
    } catch {
      // Disk write failure must never interrupt the execution loop
    }
  }

  /**
   * Attaches listeners to stdout and stderr streams of a child process.
   */
  attach(
    appId: string,
    child: ChildProcess,
    onLog: (entry: ProcessLogEntry) => void,
  ): void {
    let stdoutBuffer = "";
    let stderrBuffer = "";

    child.stdout?.on("data", (chunk: Buffer) => {
      stdoutBuffer += chunk.toString("utf-8");
      const lines = stdoutBuffer.split("\n");
      stdoutBuffer = lines.pop() || "";
      for (const line of lines) {
        if (line.trim().length > 0) {
          const entry = this.createEntry(appId, line, "stdout");
          onLog(entry);
          this.writeToDisk(appId, entry).catch(() => {});
        }
      }
    });

    child.stderr?.on("data", (chunk: Buffer) => {
      stderrBuffer += chunk.toString("utf-8");
      const lines = stderrBuffer.split("\n");
      stderrBuffer = lines.pop() || "";
      for (const line of lines) {
        if (line.trim().length > 0) {
          const entry = this.createEntry(appId, line, "stderr");
          onLog(entry);
          this.writeToDisk(appId, entry).catch(() => {});
        }
      }
    });
  }
}
