# DevLab Shared — Core Foundation Packages & Distributed Platform Libraries

<p align="center">
  <img src="https://img.shields.io/badge/status-active-brightgreen" alt="Status" />
  <img src="https://img.shields.io/badge/typescript-6.x-blue" alt="TypeScript" />
  <img src="https://img.shields.io/badge/turbo-2.11.x-red" alt="Turbo" />
  <img src="https://img.shields.io/badge/pnpm-workspaces-orange" alt="pnpm" />
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="License" />
</p>

**DevLab Shared** is the foundational monorepo hosting 19 enterprise-grade packages, shared schemas, UI components, resilience pipelines, cognitive contracts, and development tooling for the entire **Yuva DevLab Platform Ecosystem** (OrchestrAI, FinAI, IncidentAI, DevLab Portal, DevLab Logs).

---

## 📦 Packages Overview

### 🏛️ Core Domain & Observability

| Package                   | Description                                                                               | Documentation                       |
| :------------------------ | :---------------------------------------------------------------------------------------- | :---------------------------------- |
| **`@yuva-devlab/errors`** | Standardized `DomainError`, `ErrorCode`, and `Result<T, E>` monads.                       | [README](packages/errors/README.md) |
| **`@yuva-devlab/regex`**  | Centralized, hardened regular expressions for PII, security, and URIs.                    | [README](packages/regex/README.md)  |
| **`@yuva-devlab/tokens`** | Pure TypeScript design token engine, OKLCH color palettes, and W3C Cascade Layers.        | [README](packages/tokens/README.md) |
| **`@yuva-devlab/logger`** | Correlation context, `@LogMethod()` decorator, ANSI/JSON formatters, and batch transport. | [README](packages/logger/README.md) |

### 🤖 AI & Agent Runtime Foundation

| Package                           | Description                                                                                 | Documentation                               |
| :-------------------------------- | :------------------------------------------------------------------------------------------ | :------------------------------------------ |
| **`@yuva-devlab/agent-core`**     | Universal tool definition (`UniversalTool`), prompt template compiler, and tool registries. | [README](packages/agent-core/README.md)     |
| **`@yuva-devlab/ai-client`**      | Multi-provider unified LLM client interface (Ollama, Groq, Gemini, OpenAI, Anthropic).      | [README](packages/ai-client/README.md)      |
| **`@yuva-devlab/rag`**            | Text chunking, token estimation, vector similarity, embeddings, and in-memory vector store. | [README](packages/rag/README.md)            |
| **`@yuva-devlab/semantic-cache`** | In-memory semantic caching with cosine similarity thresholding, metrics, and TTL.           | [README](packages/semantic-cache/README.md) |

### 🛡️ Resilience, Auth & Governance

| Package                        | Description                                                                                 | Documentation                            |
| :----------------------------- | :------------------------------------------------------------------------------------------ | :--------------------------------------- |
| **`@yuva-devlab/resilience`**  | Circuit Breaker, Bulkhead, Token Bucket rate limiting, and Retry policies with jitter.      | [README](packages/resilience/README.md)  |
| **`@yuva-devlab/auth-server`** | RS256 JWKS token validation and authorization guards for Express and NestJS.                | [README](packages/auth-server/README.md) |
| **`@yuva-devlab/auth-client`** | React hooks and provider for tenant authentication, session tokens, and kill-switch screen. | [README](packages/auth-client/README.md) |
| **`@yuva-devlab/auth-py`**     | Python SDK with FastAPI security dependencies, RS256 JWKS verification, and M2M guards.     | [README](packages/auth-py/README.md)     |
| **`@yuva-devlab/billing`**     | Dynamic token counter, cost ledgers, pricing matrices, and tenant budget enforcers.         | [README](packages/billing/README.md)     |
| **`@yuva-devlab/events`**      | Event bus interface, transactional outbox pattern, and idempotency stores.                  | [README](packages/events/README.md)      |

### ⚙️ Supervisor & Master SDK

| Package                       | Description                                                                                          | Documentation                           |
| :---------------------------- | :--------------------------------------------------------------------------------------------------- | :-------------------------------------- |
| **`@yuva-devlab/supervisor`** | Lifecycle orchestrator, detached process trees, tree kills, circular ring-buffers, and port probing. | [README](packages/supervisor/README.md) |
| **`@yuva-devlab/sdk`**        | Master TypeScript SDK client unifying AI inference, RAG, caching, billing, and events.               | [README](packages/sdk/README.md)        |

### 🎨 UI & Applications

| Package / App                   | Description                                                                                                                 | Documentation                         |
| :------------------------------ | :-------------------------------------------------------------------------------------------------------------------------- | :------------------------------------ |
| **`@yuva-devlab/ui`**           | Accessible, pure CSS React component & layout library powered by Radix UI & OKLCH tokens.                                   | [README](packages/ui/README.md)       |
| **`@yuva-devlab/cli`**          | Developer operations CLI: port management, environment diagnostics, service status, Docker infra, and JWT token inspection. | [README](packages/cli/README.md)      |
| **`@yuva-devlab/ui-docs`**      | Next.js 15 documentation portal with interactive component playground and theme switcher.                                   | [README](apps/ui-docs/README.md)      |
| **`@yuva-devlab/ui-storybook`** | Storybook 8 + Vite isolated component development and visual accessibility workbench.                                       | [README](apps/ui-storybook/README.md) |
| **`@yuva-devlab/config`**       | Shared ESLint flat configurations, Prettier settings, and strict TypeScript configurations.                                 | [README](packages/config/README.md)   |

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

1. **Hard 250-Line Maximum Rule**: Every source file in `packages/*/src/` must remain strictly under 250 lines (deconstruct early at 200 lines).
2. **Detailed JSDoc**: Every exported symbol must have comprehensive JSDoc annotations with descriptions, parameters, and return types.
3. **Strict Utility Framework Prohibition**: Never reference the legacy utility-first CSS framework in code, comments, or documentation. All styling is pure platform CSS and W3C Cascade Layers (`@layer dl-*`).
4. **Publishable Standard**: All packages must build dual ESM/CJS outputs via `tsup` and declare `publishConfig: { access: "public" }`.

---

## Author & Attribution

- **Author**: Yuva DevLab (`yuva.devlab@gmail.com`)
- **License**: MIT
