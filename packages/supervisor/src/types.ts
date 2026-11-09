/**
 * @file packages/supervisor/src/types.ts
 * @description Strongly typed contracts, states, and configuration models for the DevLab Process Supervisor.
 * @module @yuva-devlab/supervisor
 * @author yuva.devlab@gmail.com
 */

/**
 * Operational lifecycle states for a managed application process.
 */
export type ProcessState =
  "STOPPED" | "STARTING" | "RUNNING" | "STOPPING" | "CRASHED";

/**
 * Log severity levels extracted from stream output.
 */
export type ProcessLogLevel = "info" | "warn" | "error" | "debug";

/**
 * Stream origin for process output.
 */
export type ProcessLogStream = "stdout" | "stderr" | "system";

/**
 * Structured log record captured from a managed process.
 */
export interface ProcessLogEntry {
  /** Unique monotonic or UUID identifier for the log line */
  readonly id: string;
  /** Identifier of the application producing the log */
  readonly appId: string;
  /** ISO 8601 formatted timestamp of emission */
  readonly timestamp: string;
  /** Evaluated severity level */
  readonly level: ProcessLogLevel;
  /** Cleaned message with ANSI escape sequences stripped */
  readonly message: string;
  /** Original raw output preserving ANSI color sequences for terminal rendering */
  readonly raw: string;
  /** Source stream */
  readonly stream: ProcessLogStream;
}

/**
 * TCP port occupancy snapshot.
 */
export interface PortStatus {
  /** Target TCP port number */
  readonly port: number;
  /** Whether the port is actively bound by an OS process */
  readonly inUse: boolean;
  /** Operating system PID holding the socket, if discoverable */
  readonly pid: number | null;
}

/**
 * Configuration declaration for a registered application process.
 */
export interface AppProcessConfig {
  /** Canonical application identifier (e.g. "finai", "orchestrai", "devlab-logs") */
  readonly appId: string;
  /** Human-readable display label */
  readonly name?: string;
  /** Absolute working directory path where the command executes */
  readonly workingDir: string;
  /** Executable binary or runner (e.g. "pnpm", "node", "python") */
  readonly command: string;
  /** Execution argument list (e.g. ["run", "dev"]) */
  readonly args?: readonly string[];
  /** Environment variables to merge into the process runtime environment */
  readonly env?: Readonly<Record<string, string>>;
  /** TCP ports expected to be bound by this process */
  readonly ports?: readonly number[];
  /** HTTP readiness endpoint polled to verify successful startup (e.g. "http://localhost:4001/health") */
  readonly healthUrl?: string;
  /** Maximum milliseconds to wait for healthUrl to return 200 before considering startup stalled (default: 30000) */
  readonly readinessTimeoutMs?: number;
  /** Milliseconds to wait after SIGINT before escalating to SIGTERM / SIGKILL (default: 5000) */
  readonly gracefulShutdownTimeoutMs?: number;
  /** Whether the supervisor should automatically restart the process if it crashes unexpectedly (default: false) */
  readonly autoRestartOnCrash?: boolean;
  /** Maximum consecutive auto-restart attempts within a 60-second window before permanently failing (default: 3) */
  readonly maxCrashRestarts?: number;
}

/**
 * Runtime telemetry and operational status snapshot of a managed process.
 */
export interface ProcessStatus {
  /** Canonical application identifier */
  readonly appId: string;
  /** Current state machine phase */
  readonly state: ProcessState;
  /** Main process identifier, or null if stopped */
  readonly pid: number | null;
  /** Process group identifier for detached tree control, or null if stopped */
  readonly pgid: number | null;
  /** Exit code of the last run, or null if currently active */
  readonly exitCode: number | null;
  /** ISO timestamp when the current instance started, or null if stopped */
  readonly startedAt: string | null;
  /** Duration in seconds the process has been running */
  readonly uptimeSeconds: number;
  /** Configured TCP ports */
  readonly ports: readonly number[];
  /** Live TCP port binding inspection results */
  readonly portStatuses: readonly PortStatus[];
  /** Error message or crash diagnosis if state is CRASHED or startup failed */
  readonly error: string | null;
}

/**
 * Options for configuring the ProcessSupervisor engine instance.
 */
export interface SupervisorOptions {
  /** Directory path to persist active process metadata (default: ~/.devlab/runtime) */
  readonly runtimeDir?: string;
  /** Directory path to write date-partitioned log files (default: ~/.devlab/logs) */
  readonly logDir?: string;
  /** Maximum log lines to retain in memory per application (default: 2000) */
  readonly maxLogBufferSize?: number;
  /** Interval in milliseconds for polling health endpoints during startup (default: 500) */
  readonly healthPollIntervalMs?: number;
}

/**
 * Persistent snapshot of a spawned process stored to disk for crash-recovery and re-attachment.
 */
export interface ProcessRuntimeRecord {
  readonly appId: string;
  readonly pid: number;
  readonly pgid: number | null;
  readonly command: string;
  readonly workingDir: string;
  readonly startedAt: string;
  readonly ports: readonly number[];
}
