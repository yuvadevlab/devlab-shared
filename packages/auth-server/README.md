# 🛡️ @yuva-devlab/auth-server

[![npm version](https://img.shields.io/npm/v/@yuva-devlab/auth-server.svg)](https://www.npmjs.com/package/@yuva-devlab/auth-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript 6](https://img.shields.io/badge/TypeScript-6.x-3178c6.svg)](https://www.typescriptlang.org)

> Server-side authentication guards, cached RS256 JWKS token validation, role-based authorization, and platform kill-switch middleware for Node.js, Express, and NestJS services across the DevLab ecosystem.

---

## Features

- 🔑 **RS256 Asymmetric JWKS Validation**: High-performance, LRU-cached public key fetching from `/.well-known/jwks.json`.
- 🛡️ **NestJS Guards & Interceptors**: Drop-in `DevLabAuthGuard`, `RolesGuard`, and `PermissionsGuard` with execution context extraction.
- 🌐 **Express & Fastify Middleware**: Zero-dependency middleware to authenticate bearer tokens and attach `req.user` and `req.tenant`.
- 🚨 **Centralized Kill-Switch Middleware**: Preemptively reject inbound traffic with HTTP 503 when the target application is paused or in maintenance mode via the DevLab Portal.
- 📦 **Dual ESM & CJS Build**: Clean consumption across modern ESM and CommonJS microservices.

---

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Token Validation Architecture](#token-validation-architecture)
4. [NestJS Integration](#nestjs-integration)
5. [Express Middleware Integration](#express-middleware-integration)
6. [Kill-Switch Guarding](#kill-switch-guarding)
7. [Author & Attribution](#author--attribution)

---

## Installation

```bash
# pnpm (recommended)
pnpm add @yuva-devlab/auth-server

# npm
npm install @yuva-devlab/auth-server
```

---

## Quick Start

### Standalone Token Verification

```typescript
import { createJwksVerifier } from "@yuva-devlab/auth-server";

const verifier = createJwksVerifier({
  jwksUri: "http://localhost:4000/.well-known/jwks.json",
  cacheTtlMs: 300_000, // 5 minutes
  rateLimit: true,
});

async function handleRequest(authHeader: string) {
  const token = authHeader.replace(/^Bearer\s+/i, "");
  const payload = await verifier.verifyToken(token);

  console.log(
    `Authenticated user: ${payload.sub} (Tenant: ${payload.tenantId})`,
  );
  return payload;
}
```

---

## NestJS Integration

### 1. Register Module

```typescript
import { Module } from "@nestjs/common";
import { DevLabAuthGuard } from "@yuva-devlab/auth-server";

@Module({
  providers: [
    {
      provide: "APP_GUARD",
      useClass: DevLabAuthGuard,
    },
  ],
})
export class AppModule {}
```

### 2. Protect Controllers & Endpoints

```typescript
import { Controller, Get, UseGuards } from "@nestjs/common";
import {
  DevLabAuthGuard,
  CurrentUser,
  UserContext,
} from "@yuva-devlab/auth-server";

@Controller("api/v1/reports")
@UseGuards(DevLabAuthGuard)
export class ReportsController {
  @Get()
  getReports(@CurrentUser() user: UserContext) {
    return { tenantId: user.tenantId, userId: user.sub, data: [] };
  }
}
```

---

## Express Middleware Integration

```typescript
import express from "express";
import { devLabAuthMiddleware } from "@yuva-devlab/auth-server";

const app = express();

app.use(
  "/api",
  devLabAuthMiddleware({
    jwksUri:
      process.env.DEVLAB_JWKS_URI ||
      "http://localhost:4000/.well-known/jwks.json",
    portalApiUrl: process.env.DEVLAB_PORTAL_API_URL || "http://localhost:4000",
    appId: "finai",
  }),
);

app.get("/api/data", (req, res) => {
  res.json({ message: "Authorized", user: req.user });
});
```

---

## Kill-Switch Guarding

When an incident occurs, administrators can trigger the DevLab Portal Kill-Switch for a specific registered application. The `killSwitchMiddleware` continuously checks status and responds with HTTP 503:

```typescript
import { createKillSwitchMiddleware } from "@yuva-devlab/auth-server";

app.use(
  createKillSwitchMiddleware({
    portalApiUrl: "http://localhost:4000",
    appId: "finai",
    cacheTtlSeconds: 15,
  }),
);
```

---

## Author & Attribution

- **Author**: Yuva DevLab (`yuva.devlab@gmail.com`)
- **License**: MIT
