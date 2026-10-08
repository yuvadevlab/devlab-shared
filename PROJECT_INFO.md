# DevLab Shared — Deep Product & Technical Specification Dossier

## 1. Product Overview & Vision

### 1.1 The Operational Problem Space

As multi-repo distributed architectures grow (e.g. OrchestraI, FinAI, IncidentAI, DevLab Portal, DevLab Logs), organizations suffer from code fragmentation:

- **Duplicated Types & Errors**: Each service implements its own error definitions, causing HTTP status translation mismatches.
- **Divergent Resilience Patterns**: Service A uses an aggressive retry policy that triggers a retry storm against Service B, which lacks a circuit breaker.
- **UI Inconsistency**: Frontend dashboards diverge in visual language, dark mode tokens, and keyboard accessibility.
- **Copy-Paste Drift**: Fundamental AI agent primitives (tool declarations, prompt interpolation, token estimators) diverge across agent projects.

### 1.2 The DevLab Shared Solution

DevLab Shared acts as the **single source of truth for the entire platform**:

1. **Purity of Core Contracts**: `@yuva-devlab/core` and `@yuva-devlab/errors` define canonical entities, error codes, and result monads with ZERO external dependencies.
2. **Universal AI Agent Foundation**: `@yuva-devlab/agent-core` standardizes tool schemas (`UniversalTool`), system prompt compilers, and parameter validation.
3. **Enterprise Resilience Pipeline**: `@yuva-devlab/resilience` provides battle-tested Circuit Breakers, Bulkheads, Token Buckets, and Deadlines.
4. **Universal UI & Design System**: `@yuva-devlab/ui` and `@yuva-devlab/tokens` enforce WCAG-compliant, Radix-powered components and isolated brand CSS variables.
5. **Dual-Target Publishability**: All 19 packages compile to clean ESM and CJS with full TypeScript declaration maps (`d.ts`, `d.cts`).

---

## 2. Technical Stack & Architectural Rationale

### 2.1 Package Boundary Hierarchy

```mermaid
graph TD
    subgraph Layer 0: Pure Contracts
        Core[@yuva-devlab/core]
        Errors[@yuva-devlab/errors]
        Regex[@yuva-devlab/regex]
        Tokens[@yuva-devlab/tokens]
    end

    subgraph Layer 1: Primitives & Runtime
        Logger[@yuva-devlab/logger]
        AgentCore[@yuva-devlab/agent-core]
        AiClient[@yuva-devlab/ai-client]
        Events[@yuva-devlab/events]
    end

    subgraph Layer 2: Intelligence & Infrastructure
        Resilience[@yuva-devlab/resilience]
        SemCache[@yuva-devlab/semantic-cache]
        RAG[@yuva-devlab/rag]
        Billing[@yuva-devlab/billing]
        AuthServer[@yuva-devlab/auth-server]
    end

    subgraph Layer 3: Presentation & Consumers
        UI[@yuva-devlab/ui]
        AuthReact[@yuva-devlab/auth-react]
        SDK[@yuva-devlab/sdk]
    end

    Core --> Errors
    Errors --> AgentCore & Resilience & Billing & AuthServer
    Core --> AgentCore & Events
    Logger --> Resilience & Billing & AuthServer & Events
    AgentCore --> AiClient & SemCache & RAG
    Tokens --> UI
```

### 2.2 Tooling Choices

| Tool                  | Purpose                        | Rationale                                                                                                                 |
| :-------------------- | :----------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| **pnpm Workspaces**   | Monorepo dependency management | Hard links, strict isolation, no phantom dependency leakage.                                                              |
| **Turborepo (Turbo)** | Task orchestration             | Blazing fast parallel builds, typechecks, and tests with hash-based caching.                                              |
| **tsup (esbuild)**    | Package bundling               | Dual ESM (`.js`) and CommonJS (`.cjs`) output compilation in single-digit milliseconds with automatic `.d.ts` generation. |
| **Changesets**        | Release automation             | SemVer tracking, changelog generation, and automated GitHub action publishing.                                            |
| **ESLint + Prettier** | Code style & quality           | Zero warnings permitted in pre-commit hooks (`--max-warnings=0`).                                                         |

---

## 3. Structural & Architectural Design

```
devlab-shared/
├── packages/
│   ├── core/                   # Canonical domain entities and invariants
│   ├── errors/                 # Standardized DomainError, ErrorCode, Result monad
│   ├── regex/                  # Centralized hardened regular expressions
│   ├── tokens/                 # CSS design tokens & theme palettes
│   ├── logger/                 # Isomorphic structured JSON logger
│   ├── agent-core/             # Universal tool definitions & prompt compiler
│   ├── ai-client/              # Multi-provider LLM interface
│   ├── rag/                    # Chunking, token estimation, vector contracts
│   ├── semantic-cache/         # Embedding cosine-similarity cache
│   ├── resilience/             # Circuit breaker, bulkhead, token bucket, timeout
│   ├── billing/                # Token counter, cost ledger, budget enforcer
│   ├── events/                 # Event bus, outbox pattern, idempotency store
│   ├── auth-server/            # RS256 JWKS validation & backend guards
│   ├── auth-react/             # React auth provider & hooks
│   ├── ui/                     # Radix + Tailwind accessible component library
│   ├── sdk/                    # Official TypeScript API client SDK
│   └── config/                 # Shared eslint, prettier, tsconfig packages
├── .changeset/                 # Changesets configuration & release notes
├── .vscode/                    # Monorepo settings with watcher exclusions
└── turbo.json                  # Turborepo task definitions
```

---

## 4. Release & Publishing Mechanics

1. **All Packages Public**: Every package specifies `publishConfig: { "access": "public" }` in its `package.json`.
2. **Version Pinning & Bumping**: Changesets track atomic commits and update inter-package dependency ranges across the monorepo automatically upon release.
