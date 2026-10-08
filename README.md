# DevLab Shared — Core Foundation Packages & Distributed Platform Libraries

<p align="center">
  <img src="https://img.shields.io/badge/status-active-brightgreen" alt="Status" />
  <img src="https://img.shields.io/badge/typescript-5.8.2-blue" alt="TypeScript" />
  <img src="https://img.shields.io/badge/turbo-2.11.7-red" alt="Turbo" />
  <img src="https://img.shields.io/badge/pnpm-workspaces-orange" alt="pnpm" />
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License" />
</p>

**DevLab Shared** is the foundational monorepo hosting 19 enterprise-grade TypeScript packages, shared schemas, UI components, resilience pipelines, cognitive contracts, and development tooling for the entire **Yuva DevLab Platform Ecosystem** (OrchestraI, FinAI, IncidentAI, DevLab Portal, DevLab Logs).

---

## 📦 Packages Overview

### 🏛️ Core Domain & Contracts

| Package                   | Description                                                            |
| :------------------------ | :--------------------------------------------------------------------- |
| **`@yuva-devlab/core`**   | Domain entities, universal base interfaces, and platform invariants.   |
| **`@yuva-devlab/errors`** | Standardized `DomainError`, `ErrorCode`, and `Result<T, E>` monads.    |
| **`@yuva-devlab/regex`**  | Centralized, hardened regular expressions for PII, security, and URIs. |
| **`@yuva-devlab/tokens`** | Brand tokens, HSL color palettes, spacing, and typography primitives.  |

### 🤖 AI & Agent Runtime Foundation

| Package                           | Description                                                                               |
| :-------------------------------- | :---------------------------------------------------------------------------------------- |
| **`@yuva-devlab/agent-core`**     | Universal tool definition (`UniversalTool`), prompt template compiler, and tool catalogs. |
| **`@yuva-devlab/ai-client`**      | Multi-provider unified LLM client interface supporting streaming and structured outputs.  |
| **`@yuva-devlab/rag`**            | Text chunking, token estimation, cosine similarity, and vector store contracts.           |
| **`@yuva-devlab/semantic-cache`** | In-memory semantic caching with cosine similarity thresholding and TTL expiration.        |

### 🛡️ Resilience, Auth & Governance

| Package                        | Description                                                                     |
| :----------------------------- | :------------------------------------------------------------------------------ |
| **`@yuva-devlab/resilience`**  | Circuit Breaker, Bulkhead, Token Bucket rate limiting, and Retry policies.      |
| **`@yuva-devlab/auth-server`** | RS256 JWKS token validation and authorization guards for backend services.      |
| **`@yuva-devlab/auth-react`**  | React hooks and provider for tenant authentication and user session management. |
| **`@yuva-devlab/billing`**     | Dynamic token counter, cost ledgers, and tenant budget enforcers.               |
| **`@yuva-devlab/events`**      | Event bus interface, transactional outbox pattern, and idempotency stores.      |

### 🎨 UI & Observability

| Package                   | Description                                                                    |
| :------------------------ | :----------------------------------------------------------------------------- |
| **`@yuva-devlab/ui`**     | Accessible, styled React component library powered by Radix UI & Tailwind CSS. |
| **`@yuva-devlab/logger`** | Isomorphic structured JSON logger with context correlation IDs.                |
| **`@yuva-devlab/sdk`**    | Official TypeScript SDK client for communicating with DevLab platform APIs.    |

### ⚙️ Workspace & Tooling

| Package                              | Description                                       |
| :----------------------------------- | :------------------------------------------------ |
| **`@yuva-devlab/eslint-config`**     | Shared ESLint flat configurations.                |
| **`@yuva-devlab/prettier-config`**   | Shared Prettier formatting standards.             |
| **`@yuva-devlab/typescript-config`** | Shared strict TypeScript compiler configurations. |

---

## 🚀 Quick Start

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/yuvadevlab/devlab-shared.git
cd devlab-shared

# Install dependencies across all workspaces
pnpm install
```

### 2. Build & Typecheck

```bash
# Build all packages via Turborepo
pnpm build

# Typecheck all packages
pnpm typecheck
```

### 3. Releasing & Changesets

```bash
# Create a changeset for version bumps
pnpm changeset

# Version and publish packages
pnpm changeset version
pnpm changeset publish
```

---

## 📜 Development Invariants

1. **Hard 250-Line Maximum Rule**: No file in `packages/*/src/` may exceed 250 lines.
2. **Detailed JSDoc**: Every exported symbol must have comprehensive JSDoc annotations with `@example` code.
3. **Publishable Standard**: All packages must build dual ESM/CJS outputs via `tsup` and declare `publishConfig: { access: "public" }`.
