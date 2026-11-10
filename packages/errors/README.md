# 🚨 @yuva-devlab/errors

[![npm version](https://img.shields.io/npm/v/@yuva-devlab/errors.svg)](https://www.npmjs.com/package/@yuva-devlab/errors)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript 6](https://img.shields.io/badge/TypeScript-6.x-3178c6.svg)](https://www.typescriptlang.org)

> Standardized domain error hierarchy, typed ErrorCode constants, HTTP status mapping, and functional Result monad for robust failure handling across the DevLab ecosystem.

---

## Features

- 🏷️ **Canonical Error Codes (`ErrorCode`)**: Standardized string enums (`NOT_FOUND`, `UNAUTHORIZED`, `VALIDATION_ERROR`, etc.) preventing ad-hoc string comparisons.
- 🏗️ **Domain Error Base Class (`DomainError`)**: Type-safe base class carrying error code, HTTP status, timestamp, and optional context details.
- 🎯 **Pre-mapped Domain Errors**: Ready-to-use classes including `ValidationError`, `NotFoundError`, `UnauthorizedError`, `ForbiddenError`, `ConflictError`, `RateLimitError`, and `InternalError`.
- 🛤️ **Functional Result Monad (`Result<T, E>`)**: Railway-oriented error handling with `ok()` and `err()` to eliminate untyped try/catch boilerplate.
- 📦 **Dual ESM & CJS Build**: Works seamlessly across browsers, Node.js runtimes, and serverless workers.

---

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Domain Error Hierarchy](#domain-error-hierarchy)
4. [Functional Result Monad](#functional-result-monad)
5. [Serialization & HTTP Responses](#serialization--http-responses)
6. [Author & Attribution](#author--attribution)

---

## Installation

```bash
# pnpm (recommended)
pnpm add @yuva-devlab/errors

# npm
npm install @yuva-devlab/errors
```

---

## Quick Start

### Throwing Typed Domain Errors

```typescript
import {
  NotFoundError,
  ValidationError,
  ForbiddenError,
} from "@yuva-devlab/errors";

function fetchTenantApp(appId: string, tenantId: string) {
  if (!appId) {
    throw new ValidationError("App ID must not be empty", { field: "appId" });
  }

  const app = database.find(appId);
  if (!app) {
    throw new NotFoundError("RegisteredApp", appId);
  }

  if (app.tenantId !== tenantId) {
    throw new ForbiddenError(`You do not have access to application: ${appId}`);
  }

  return app;
}
```

---

## Functional Result Monad

Model success and failure explicitly without throwing exceptions:

```typescript
import { ok, err, Result, ValidationError } from "@yuva-devlab/errors";

interface User {
  id: string;
  email: string;
}

function parseEmail(input: string): Result<string, ValidationError> {
  if (!input.includes("@")) {
    return err(new ValidationError("Invalid email address format", { input }));
  }
  return ok(input.trim().toLowerCase());
}

const result = parseEmail("user@devlab.internal");

if (result.isOk()) {
  console.log(`Valid email: ${result.value}`);
} else {
  console.error(`Validation failed: ${result.error.message}`);
}
```

---

## Serialization & HTTP Responses

Serialize domain errors uniformly for REST or GraphQL responses:

```typescript
try {
  executeBusinessLogic();
} catch (error) {
  if (error instanceof DomainError) {
    res.status(error.statusCode).json({
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
        timestamp: error.timestamp,
      },
    });
  } else {
    // Unhandled exception
    res.status(500).json({
      error: {
        code: "INTERNAL_ERROR",
        message: "An unexpected error occurred",
      },
    });
  }
}
```

---

## Author & Attribution

- **Author**: Yuva DevLab (`yuva.devlab@gmail.com`)
- **License**: MIT
