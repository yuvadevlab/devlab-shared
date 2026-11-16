/**
 * @file packages/logger/src/constants.ts
 * @description Centralized defaults and constants for isomorphic logging and correlation tracing.
 * @module @yuva-devlab/logger
 */

import type { LogFormat, LogLevel } from "./types";

/** Default minimum logging severity level */
export const DEFAULT_LOG_LEVEL: LogLevel = "info";

/** Default log formatting output mode */
export const DEFAULT_LOG_FORMAT: LogFormat = "text";

/** Default global enabled state */
export const DEFAULT_LOG_ENABLED = true;

/** Default service identifier fallback */
export const DEFAULT_SERVICE_NAME = "devlab-service";

/** Default application identifier fallback */
export const DEFAULT_APP_NAME = "devlab-app";
