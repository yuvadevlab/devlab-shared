# ⚙️ @yuva-devlab/supervisor

[![npm version](https://img.shields.io/npm/v/@yuva-devlab/supervisor.svg)](https://www.npmjs.com/package/@yuva-devlab/supervisor)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript 6](https://img.shields.io/badge/TypeScript-6.x-3178c6.svg)](https://www.typescriptlang.org)

> High-performance process supervisor and lifecycle orchestrator for DevLab applications. Manages detached process trees, cross-platform tree kills, circular log ring-buffers, TCP port probing, HTTP readiness health checks, on-demand builds, and prerequisite dependency cascades.

---

## Features

- 🔄 **Lifecycle Management (`ProcessSupervisor`)**: Start, stop, restart, and monitor applications across `dev` and `prod` execution modes.
- 🌳 **Detached Process Trees & Clean Kills (`killProcessTree`)**: Spawns processes in isolated process groups (`detached: true`) and terminates full process trees across macOS, Linux, and Windows without orphaned background processes.
- ⭕ **Circular Log Ring-Buffer (`LogRingBuffer`)**: Zero-leak in-memory log buffer keeping the latest $N$ lines with ANSI stripping, timestamping, and stream multiplexing (`stdout` / `stderr`).
- 🔌 **TCP Port & HTTP Readiness Probing (`probePort`, `waitForHttpReady`)**: Detect port occupancy, find available ports, and poll HTTP health check endpoints until the service is live.
- ⛓️ **Dependency Readiness Cascades (`checkDependencies`)**: Inspect prerequisite microservices and cascade-start dependent apps automatically.
- 🔨 **On-Demand Production Builds (`runBuild`)**: Trigger headless builds and capture exit codes with real-time log streaming.
- 📦 **Dual ESM & CJS Build**: Clean consumption across Node.js CLI tools, NestJS control planes, and worker daemons.

---

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Process Configuration Schema](#process-configuration-schema)
4. [Log Ring-Buffer & Real-Time Streams](#log-ring-buffer--real-time-streams)
5. [Port Probing & Health Checks](#port-probing--health-checks)
6. [Cascade Dependencies](#cascade-dependencies)
7. [Author & Attribution](#author--attribution)

---

## Installation

```bash
# pnpm (recommended)
pnpm add @yuva-devlab/supervisor

# npm
npm install @yuva-devlab/supervisor
```

---

## Quick Start

Initialize and run a supervised application:

```typescript
import { ProcessSupervisor } from "@yuva-devlab/supervisor";

// 1. Create supervisor instance
const supervisor = new ProcessSupervisor();

// 2. Register application
supervisor.register({
  id: "finai-api",
  name: "FinAI Backend API",
  workingDir: "/Users/yuva/projects/finai/apps/api",
  command: "pnpm",
  args: ["dev"],
  port: 4100,
  healthCheckPath: "/health",
  env: {
    PORT: "4100",
    NODE_ENV: "development",
  },
});

// 3. Start process and await HTTP readiness
const status = await supervisor.start("finai-api");
console.log(
  `Process State: ${status.state} (PID: ${status.pid}, Port: ${status.port})`,
);

// 4. Retrieve buffered terminal logs
const logs = supervisor.getLogs("finai-api", 50);
logs.forEach((entry) => console.log(`[${entry.stream}] ${entry.text}`));
```

---

## Process Configuration Schema

```typescript
export interface AppProcessConfig {
  id: string; // Unique application key
  name: string; // Human-readable title
  workingDir: string; // Absolute workspace path on disk
  command: string; // Executable (e.g., 'pnpm', 'node', 'python')
  args?: string[]; // CLI arguments for default/dev mode
  prodArgs?: string[]; // CLI arguments for production mode
  port?: number; // Primary TCP listening port
  healthCheckPath?: string; // HTTP readiness probe path (e.g. '/health')
  env?: Record<string, string>; // Runtime environment variables
  dependsOn?: string[]; // Prerequisite application IDs
  buildScript?: string; // On-demand build script (e.g., 'pnpm build')
}
```

---

## Log Ring-Buffer & Real-Time Streams

The supervisor captures `stdout` and `stderr` streams into a circular ring-buffer:

```typescript
import { LogRingBuffer } from "@yuva-devlab/supervisor";

const buffer = new LogRingBuffer(500); // Retain last 500 log lines

buffer.push("Starting server on port 4000...", "stdout");
buffer.push("Database connected successfully", "stdout");

// Retrieve recent entries
const recentLogs = buffer.getEntries(50);
```

---

## Port Probing & Health Checks

Verify port availability before launching to prevent `EADDRINUSE` errors:

```typescript
import { probePort, findAvailablePort } from "@yuva-devlab/supervisor";

// Check if port 4000 is occupied
const portInfo = await probePort(4000);
if (portInfo.occupied) {
  console.warn(`Port 4000 is occupied by PID: ${portInfo.pid}`);
  const nextFreePort = await findAvailablePort(4001, 4100);
  console.log(`Assigning alternate port: ${nextFreePort}`);
}
```

---

## Cascade Dependencies

Inspect and ensure prerequisite services are healthy before booting:

```typescript
// Inspect dependency states for 'finai' (which depends on 'devlab-portal-api')
const prerequisites = await supervisor.checkDependencies("finai");

for (const dep of prerequisites) {
  console.log(
    `Dependency: ${dep.appId} | Status: ${dep.status} | Ready: ${dep.isReady}`,
  );
}
```

---

## Author & Attribution

- **Author**: Yuva DevLab (`yuva.devlab@gmail.com`)
- **License**: MIT
