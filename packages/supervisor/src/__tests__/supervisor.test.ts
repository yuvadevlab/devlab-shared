/**
 * @file packages/supervisor/src/__tests__/supervisor.test.ts
 * @description Comprehensive unit and integration test suite for @yuva-devlab/supervisor.
 * @module @yuva-devlab/supervisor/tests
 * @author yuva.devlab@gmail.com
 */

import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import fs from "node:fs/promises";
import {
  RingBuffer,
  PortProber,
  ProcessTreeManager,
  ProcessSupervisor,
  stripAnsi,
  type ProcessLogEntry,
} from "../../dist/index.js";

describe("stripAnsi", () => {
  it("should strip ANSI color codes from terminal output", () => {
    const raw = "\u001b[32mSUCCESS\u001b[39m: Process online";
    assert.equal(stripAnsi(raw), "SUCCESS: Process online");
  });
});

describe("RingBuffer", () => {
  it("should initialize with specified capacity and empty state", () => {
    const buffer = new RingBuffer(5);
    assert.equal(buffer.size, 0);
    assert.equal(buffer.maxCapacity, 5);
    assert.deepEqual(buffer.getSnapshot(), []);
  });

  it("should append entries and return ordered snapshots", () => {
    const buffer = new RingBuffer(3);
    const createEntry = (id: string, msg: string): ProcessLogEntry => ({
      id,
      appId: "test-app",
      timestamp: new Date().toISOString(),
      level: "info",
      message: msg,
      raw: msg,
      stream: "stdout",
    });

    buffer.push(createEntry("1", "line 1"));
    buffer.push(createEntry("2", "line 2"));
    assert.equal(buffer.size, 2);

    const snapshot = buffer.getSnapshot();
    assert.equal(snapshot.length, 2);
    assert.equal(snapshot[0]?.message, "line 1");
    assert.equal(snapshot[1]?.message, "line 2");

    buffer.push(createEntry("3", "line 3"));
    buffer.push(createEntry("4", "line 4"));
    assert.equal(buffer.size, 3);

    const overflowSnapshot = buffer.getSnapshot();
    assert.equal(overflowSnapshot.length, 3);
    assert.equal(overflowSnapshot[0]?.message, "line 2");
    assert.equal(overflowSnapshot[1]?.message, "line 3");
    assert.equal(overflowSnapshot[2]?.message, "line 4");
  });

  it("should support query search and log-level filtering", () => {
    const buffer = new RingBuffer(10);
    buffer.push({
      id: "1",
      appId: "app",
      timestamp: new Date().toISOString(),
      level: "info",
      message: "Server listening on port 3000",
      raw: "Server listening on port 3000",
      stream: "stdout",
    });
    buffer.push({
      id: "2",
      appId: "app",
      timestamp: new Date().toISOString(),
      level: "error",
      message: "Database connection failed",
      raw: "Database connection failed",
      stream: "stderr",
    });

    const errorResults = buffer.filterByLevel("error");
    assert.equal(errorResults.length, 1);
    assert.equal(errorResults[0]?.message, "Database connection failed");

    const searchResults = buffer.search("listening");
    assert.equal(searchResults.length, 1);
    assert.equal(searchResults[0]?.id, "1");
  });
});

describe("PortProber", () => {
  it("should accurately detect open and bound TCP ports", async () => {
    const testServer = net.createServer();
    await new Promise<void>((resolve) => {
      testServer.listen(0, "127.0.0.1", resolve);
    });
    const address = testServer.address();
    assert.ok(address && typeof address === "object");
    const port = address.port;

    const inUse = await PortProber.isPortInUse(port);
    assert.equal(inUse, true);

    await new Promise<void>((resolve) => {
      testServer.close(() => resolve());
    });

    const freeNow = await PortProber.isPortInUse(port);
    assert.equal(freeNow, false);
  });
});

describe("ProcessTreeManager", () => {
  it("should correctly identify alive and dead process IDs", () => {
    assert.equal(ProcessTreeManager.isAlive(process.pid), true);
    assert.equal(ProcessTreeManager.isAlive(999999999), false);
    assert.equal(ProcessTreeManager.isAlive(null), false);
  });
});

describe("ProcessSupervisor Lifecycle", () => {
  let tempDir: string;
  let supervisor: ProcessSupervisor;

  before(async () => {
    tempDir = await fs.mkdtemp(
      path.join(os.tmpdir(), "devlab-supervisor-test-"),
    );
    supervisor = new ProcessSupervisor({
      runtimeDir: path.join(tempDir, "runtime"),
      logDir: path.join(tempDir, "logs"),
    });
    await supervisor.init();
  });

  after(async () => {
    await supervisor.shutdownAll();
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  it("should register application and report initial STOPPED status", async () => {
    supervisor.registerApp({
      appId: "mock-worker",
      workingDir: tempDir,
      command: "node",
      args: ["-e", "setInterval(() => console.log('heartbeat'), 200)"],
    });

    const status = await supervisor.getStatus("mock-worker");
    assert.equal(status.appId, "mock-worker");
    assert.equal(status.state, "STOPPED");
    assert.equal(status.pid, null);
  });

  it("should start process, capture output logs, and stop gracefully", async () => {
    let capturedLog = false;
    supervisor.on("log", (appId, entry) => {
      if (appId === "mock-worker" && entry.message.includes("heartbeat")) {
        capturedLog = true;
      }
    });

    const started = await supervisor.start("mock-worker");
    assert.ok(started.pid && started.pid > 0);
    assert.ok(started.state === "STARTING" || started.state === "RUNNING");

    await new Promise((resolve) => setTimeout(resolve, 800));
    assert.equal(capturedLog, true);

    const logs = supervisor.getLogs("mock-worker");
    assert.ok(logs.length >= 1);

    const stopped = await supervisor.stop("mock-worker");
    assert.equal(stopped.state, "STOPPED");
    assert.equal(ProcessTreeManager.isAlive(started.pid), false);
  });
});
