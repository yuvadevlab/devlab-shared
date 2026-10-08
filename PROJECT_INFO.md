# DevLab Shared — Product Specification, Technical Dossier & Operations Manual

---

## 1. Executive Product Dossier & Market Vision

### 1.1 The Operational Problem Space

In large-scale distributed systems and multi-agent AI ecosystems, software architectures inevitably degrade due to **cross-repository drift**:

- **Duplicated Types & Error Codes**: Different microservices define their own domain error classes, resulting in inconsistent HTTP status codes, conflicting error messages, and broken retry loops.
- **Divergent Resilience Strategies**: Service A uses aggressive retries that overwhelm Service B, which lacks a circuit breaker or rate limiter, causing cascading cluster failures.
- **AI Agent Interface Inconsistency**: Agent tools, prompt interpolation formats, and token counters differ between repositories, making it impossible to share tools across OrchestraI, FinAI, and IncidentAI.
- **Design System Fragmentation**: Frontend applications drift in styling, creating mismatched colors, broken dark themes, and inaccessible UI dialogs.
- **Security & PII Leaks**: Unhardened regular expressions fail to catch leaked credentials, private keys, or personal identifiable information.

### 1.2 The DevLab Shared Value Proposition

**DevLab Shared** is the **canonical foundation monorepo** hosting 19 enterprise-grade TypeScript packages for the entire Yuva DevLab multi-repo ecosystem:

1. **Absolute Source of Truth**: `@yuva-devlab/core` and `@yuva-devlab/errors` establish canonical domain contracts with zero external workspace dependencies.
2. **Universal AI Agent Foundation**: `@yuva-devlab/agent-core` and `@yuva-devlab/ai-client` standardize tool execution schemas (`UniversalTool`), prompt template interpolation, and multi-provider model routing.
3. **Enterprise Resilience Pipeline**: `@yuva-devlab/resilience` implements battle-tested Circuit Breakers, Bulkheads, Token Buckets, and Deadlines.
4. **Multi-Brand Design System**: `@yuva-devlab/ui` and `@yuva-devlab/tokens` provide WCAG 2.1 AA accessible React components powered by Radix UI and Tailwind CSS.
5. **Dual-Target ESM & CJS Artifacts**: Every package compiles to dual ESM (`dist/index.js`) and CommonJS (`dist/index.cjs`) bundles with `.d.ts` declaration maps via `tsup`.
6. **Automated Changeset Publishing**: All 19 packages are configured with public access (`publishConfig: { "access": "public" }`) and managed via `@changesets/cli`.

---

## 2. Exhaustive Package Catalog & Deep Technical Breakdown

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        DEVLAB SHARED LAYERED ARCHITECTURE HIERARCHY                    │
└────────────────────────────────────────────────────────────────────────────────────────┘
 [Layer 0: Pure Contracts]
  • @yuva-devlab/core         • @yuva-devlab/errors       • @yuva-devlab/regex
  • @yuva-devlab/tokens       • @yuva-devlab/config
           │
           ▼
 [Layer 1: Primitives & Runtimes]
  • @yuva-devlab/logger       • @yuva-devlab/agent-core   • @yuva-devlab/ai-client
  • @yuva-devlab/events       • @yuva-devlab/cli
           │
           ▼
 [Layer 2: Intelligence & Infrastructure]
  • @yuva-devlab/resilience   • @yuva-devlab/semantic-cache • @yuva-devlab/rag
  • @yuva-devlab/billing      • @yuva-devlab/auth-server
           │
           ▼
 [Layer 3: Presentation & SDK]
  • @yuva-devlab/ui           • @yuva-devlab/auth-react   • @yuva-devlab/sdk
```

---

### Layer 0: Pure Contracts & Domain Primitives

#### 1. `@yuva-devlab/core`

- **Objective**: Base interfaces, canonical entities, and universal invariants.
- **Invariants**: ZERO internal workspace dependencies.
- **Key Exports**: `TenantId`, `CorrelationId`, `BaseEntity`, `Timestamped`.

#### 2. `@yuva-devlab/errors`

- **Objective**: Standardized error taxonomy and monadic result types.
- **Key Exports**:
  - `DomainError`: Base error class with code, message, HTTP status, and metadata.
  - `ErrorCode`: Canonical enum (`UNAUTHORIZED`, `RATE_LIMITED`, `TOOL_NOT_FOUND`, `CIRCUIT_OPEN`).
  - `Result<T, E>`: Functional failure/success container eliminating unhandled exceptions.
  - Specialized errors: `NotFoundError`, `UnauthorizedError`, `ConflictError`, `ValidationError`.

#### 3. `@yuva-devlab/regex`

- **Objective**: Centralized, hardened regular expressions. Zero inline regexes permitted across the ecosystem.
- **Key Exports**: `PII_REGEX` (email, phone, SSN), `SECURITY_REGEX` (JWT, API keys, private keys), `URI_REGEX`, `UUID_REGEX`.

#### 4. `@yuva-devlab/tokens`

- **Objective**: CSS variable design token definitions for multi-brand applications.
- **Key Exports**: HSL color scales (primary, accent, destructive, background, surface), typography scales, radii, and z-index layers.

#### 5. `@yuva-devlab/config`

- **Objective**: Shared configurations for ESLint flat config, Prettier, and TypeScript compiler settings.

---

### Layer 1: Primitives & Runtimes

#### 6. `@yuva-devlab/logger`

- **Objective**: Isomorphic structured JSON logger with context correlation IDs.
- **Key Features**: Winston/Pino-compatible interface, Express request logging middleware, log level masking, and OpenTelemetry trace propagation.

#### 7. `@yuva-devlab/agent-core`

- **Objective**: Standardized framework for defining and running AI agent tools.
- **Key Features**:
  - `UniversalTool<TInput, TOutput>`: Interface declaring name, description, accessTier (`READ_ONLY`, `MUTATING`), confirmation policy, and Zod input schema.
  - `PromptCompiler`: Interpolates templates (`{{variable}}`) and appends markdown tool catalogs.
  - `ToolRegistry`: In-memory catalog enabling authorization-based tool resolution.

#### 8. `@yuva-devlab/ai-client`

- **Objective**: Multi-provider unified LLM client interface.
- **Key Features**: Standardized chat completion, token streaming, structured JSON schema output validation, and credentials management.

#### 9. `@yuva-devlab/events`

- **Objective**: Event bus contracts and transactional outbox pattern implementation.
- **Key Features**:
  - `EventEnvelope<T>`: Standardized distributed event container with trace ID, tenant ID, and event type.
  - `OutboxRelay`: Persists events atomically alongside business transactions and asynchronously publishes them to Kafka.
  - `IdempotencyStore`: Deduplicates duplicate event delivery.

#### 10. `@yuva-devlab/cli`

- **Objective**: Monorepo scaffolding and code generator CLI tool.

---

### Layer 2: Intelligence & Infrastructure

#### 11. `@yuva-devlab/resilience`

- **Objective**: Distributed fault-tolerance patterns preventing cascading failures.
- **Key Features**:
  - **Circuit Breaker**: Three-state machine (`CLOSED`, `OPEN`, `HALF_OPEN`) tracking failure rates and tripping automatically.
  - **Bulkhead**: Limits concurrent executions per resource pool.
  - **Token Bucket Rate Limiter**: Smooths request bursts with token replenishment.
  - **Retry with Jitter**: Exponential backoff with full jitter to prevent thundering herd problems.

#### 12. `@yuva-devlab/semantic-cache`

- **Objective**: In-memory and Redis embedding vector cache for LLM queries.
- **Key Features**: Computes cosine similarity between incoming queries and cached vectors; returns cached responses when similarity exceeds threshold (e.g. 0.95), cutting LLM costs by up to 60%.

#### 13. `@yuva-devlab/rag`

- **Objective**: Retrieval-Augmented Generation pipeline utilities.
- **Key Features**: Text chunking algorithms (fixed, sentence, markdown), token estimators, vector store interfaces, and dense similarity ranking.

#### 14. `@yuva-devlab/billing`

- **Objective**: Real-time token consumption tracking and tenant budget enforcement.
- **Key Features**: Dynamic pricing resolver per model, token counters, cost ledgers, and budget quota enforcers.

#### 15. `@yuva-devlab/auth-server`

- **Objective**: Backend authentication and JWT validation middleware.
- **Key Features**:
  - `JwksValidator`: Caches RS256 public keys from OIDC endpoints (`/.well-known/jwks.json`) and verifies tokens in-memory.
  - `AuthGuards`: Express and Fastify route middleware validating claims (`exp`, `nbf`, `iss`, `aud`).

---

### Layer 3: Presentation & SDK

#### 16. `@yuva-devlab/ui`

- **Objective**: Accessible, styled React component library powered by Radix UI and Tailwind CSS.
- **Key Components**: Button, Input, Modal/Dialog, Card, Badge, Dropdown, Table, Toast, and `ConfigProvider`.

#### 17. `@yuva-devlab/auth-react`

- **Objective**: Client-side React authentication and maintenance mode handling.
- **Key Components**: `DevLabAuthProvider`, `useDevLabAuth` hook, and `AppUnavailableScreen` maintenance viewer.

#### 18. `@yuva-devlab/sdk`

- **Objective**: Official TypeScript client library for communicating with DevLab platform APIs.

---

## 3. How DevLab Shared Interacts with the Multi-Repo Ecosystem

```mermaid
graph TD
    Shared[devlab-shared Monorepo]

    Shared -->|@yuva-devlab/agent-core<br/>@yuva-devlab/resilience<br/>@yuva-devlab/rag| OA[orchestrai]
    Shared -->|@yuva-devlab/ai-client<br/>@yuva-devlab/ui<br/>@yuva-devlab/logger| FA[finai]
    Shared -->|@yuva-devlab/ui<br/>@yuva-devlab/auth-server<br/>@yuva-devlab/tokens| DP[devlab-portal]
    Shared -->|@yuva-devlab/logger<br/>@yuva-devlab/errors| DL[devlab-logs]
    Shared -->|@yuva-devlab/errors<br/>@yuva-devlab/logger| IA[incidentai]
    Shared -->|@yuva-devlab/regex| DG[devlab-guard]
```

### Detailed Ecosystem Consumption Matrix

| Consumer Repository | Consumed Packages                                                                                                               | Operational Purpose                                                             |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------ |
| **`orchestrai`**    | `@yuva-devlab/agent-core`, `@yuva-devlab/resilience`, `@yuva-devlab/semantic-cache`, `@yuva-devlab/rag`, `@yuva-devlab/billing` | Powers the distributed agent swarm runtime, fault tolerance, and token billing. |
| **`finai`**         | `@yuva-devlab/ai-client`, `@yuva-devlab/ui`, `@yuva-devlab/tokens`, `@yuva-devlab/logger`                                       | Standardizes financial conversational advisor chat models and UI components.    |
| **`devlab-portal`** | `@yuva-devlab/ui`, `@yuva-devlab/tokens`, `@yuva-devlab/logger`, `@yuva-devlab/auth-server`                                     | Builds the control plane web interface and validates OIDC identity tokens.      |
| **`devlab-logs`**   | `@yuva-devlab/logger`, `@yuva-devlab/errors`                                                                                    | Ingests telemetry streams conforming to shared error and logging schemas.       |
| **`incidentai`**    | `@yuva-devlab/logger`, `@yuva-devlab/errors`                                                                                    | Formats SRE postmortems, failure reports, and diagnostic log traces.            |
| **`devlab-guard`**  | `@yuva-devlab/regex`                                                                                                            | Scans source code using centralized security and PII regular expression tokens. |

---

## 4. Technical Guidelines & Invariants

### 4.1 Invariants & Quality Standards

1. **Hard 250-Line Maximum Rule**: Every file across `packages/*/src/` must remain strictly under 250 lines. Decompose early at 200 lines.
2. **Exhaustive JSDoc**: 100% of exported symbols must feature comprehensive JSDoc blocks with parameter descriptions and usage examples.
3. **Dual-Target Bundling**: All packages must build dual ESM and CJS outputs using `tsup`.
4. **Publishable Standard**: Every package must set `publishConfig: { "access": "public" }` in `package.json`.

---

## 5. Operations & Release Runbook

### 5.1 Building & Typechecking

```bash
# Clone the repository
git clone https://github.com/yuvadevlab/devlab-shared.git
cd devlab-shared

# Install dependencies across all workspaces
pnpm install

# Build all 19 packages via Turborepo
pnpm build

# Run TypeScript typecheck across all packages
pnpm typecheck
```

### 5.2 Releasing Packages via Changesets

```bash
# Generate a new changeset describing a change
pnpm changeset

# Consume changesets and bump package versions
pnpm changeset version

# Publish all updated public packages to npm
pnpm changeset publish
```
