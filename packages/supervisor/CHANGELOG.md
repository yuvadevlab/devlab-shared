# @yuva-devlab/supervisor

## 0.3.3

### Patch Changes

- feat(supervisor): replace string literals with change-resilient enums (`ProcessSignal`, `SupervisorEvent`, `ProcessLogLevel`, `ProcessLogStream`, `ExecutionMode`) and optimize process tree lifecycle management

## 0.3.2

### Patch Changes

- 03b48ed: feat(auth-client): enforce environment variable isolation, centralize auth query parameter enums, storage keys, endpoints, and UI copy
  feat(supervisor): introduce change-resilient TypeScript enums with backward-compatible template literal union types

## 0.3.1

### Patch Changes

- Updated dependencies [a44d7b6]
  - @yuva-devlab/logger@1.3.1

## 0.3.0

### Minor Changes

- f0788f4: feat(logger): add AsyncLocalStorage correlation context, @LogMethod decorator, canonical JSON formatting, and HttpBatchTransport
  feat(supervisor): add lifecycle orchestration, on-demand build runner, prerequisite dependency readiness checks, and real-time Socket.IO streaming
  fix(ui): refine pure platform CSS cascade layers, token alignment, and component styles

### Patch Changes

- Updated dependencies [f0788f4]
  - @yuva-devlab/logger@1.3.0

## 0.2.0

### Minor Changes

- 499ee63: Introduce @yuva-devlab/supervisor: centralized process orchestration engine with detached process groups, cross-platform tree termination, in-memory circular log ring buffers, TCP port probing, and real-time event streaming.
  Add ANSI regex pattern matching, detection, and stripping utilities to @yuva-devlab/regex.

### Patch Changes

- Updated dependencies [499ee63]
  - @yuva-devlab/regex@0.3.0
