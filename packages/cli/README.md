# 🛠️ @yuva-devlab/cli

[![npm version](https://img.shields.io/npm/v/@yuva-devlab/cli.svg)](https://www.npmjs.com/package/@yuva-devlab/cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript 6](https://img.shields.io/badge/TypeScript-6.x-3178c6.svg)](https://www.typescriptlang.org)

> Official Developer Platform & Operations CLI (`devlab`) for the Yuva DevLab ecosystem.
> Provides runtime diagnostics, ecosystem port inspection, service health monitoring, root infrastructure orchestration, and JWT diagnostic utilities.

---

## ✨ Features

- 🌐 **Ecosystem Port Matrix (`devlab ports`)** — Enforces the canonical **`3***` Web / `4***` API / `8***` Dedicated API / `+10` Prod** port taxonomy and actively probes socket listeners.
- 🩺 **System Doctor (`devlab doctor`)** — Diagnoses Node.js ( $\ge 20$ ), pnpm ( $\ge 9$ ), Python/uv, Docker daemon responsiveness, port collisions, and `.env` prerequisites.
- 📊 **Service Health Scoreboard (`devlab status`)** — Concurrently pings `/health`, `/healthz`, and `/livez` across all platform services, measuring latency and reporting active versions.
- 🐳 **Infrastructure Lifecycle (`devlab infra`)** — Single-command management for the root Docker Compose stack (PostgreSQL 16 with `pgvector`, Redis 7, Redpanda, and Ollama).
- 🔑 **Token & JWKS Diagnostic (`devlab token`)** — Decodes base64 JWT payloads, calculates temporal expiry, inspects tenant claims, and tests Portal JWKS public key discovery.
- ⚡ **Zero Runtime Overhead** — Pure Node.js platform utilities, fast startup with Vite SSR bundling, and clean ANSI terminal output.

---

## 📐 Ecosystem Port Taxonomy

The CLI enforces the standard mathematical port formula across all DevLab repositories:

$$\text{Production Port} = \text{Development Port} + 10$$

| Tier               | Dev Port Range  | Prod Port Range |             Formula             | Examples                                                                                                  |
| :----------------- | :-------------: | :-------------: | :-----------------------------: | :-------------------------------------------------------------------------------------------------------- |
| **Web Frontends**  | `3000` – `3009` | `3010` – `3019` | $3000 + N \rightarrow 3010 + N$ | `3000` (Portal), `3001` (FinAI), `3002` (Orchestrai), `3003` (Logs), `3004` (KnowledgeAI)                 |
| **Backend APIs**   | `4000` – `4009` | `4010` – `4019` | $4000 + N \rightarrow 4010 + N$ | `4000` (Portal API), `4001` (FinAI API), `4002` (Gateway), `4003` (Logs Ingest), `4004` (KnowledgeAI API) |
| **Dedicated APIs** | `8000` – `8009` | `8010` – `8019` | $8000 + N \rightarrow 8010 + N$ | `8000` (DevLab Guard), `8001` (IncidentAI)                                                                |
| **Infrastructure** |   Fixed Ports   |   Fixed Ports   |         Direct Binding          | `5432` (PostgreSQL), `6379` (Redis), `19092` (Redpanda), `11434` (Ollama)                                 |

---

## 📦 Installation & Usage

### Inside the DevLab Monorepo

Execute commands directly via `pnpm devlab`:

```bash
# Display CLI help
pnpm devlab --help

# Inspect port allocation matrix
pnpm devlab ports

# Run environment doctor
pnpm devlab doctor

# Probe ecosystem service status
pnpm devlab status
```

### Global Installation

```bash
npm install -g @yuva-devlab/cli
# or
pnpm add -g @yuva-devlab/cli
```

---

## 🚀 Command Reference

### 1. `devlab ports`

Displays the entire ecosystem port matrix, categorized by tier, and tests whether local ports are currently bound by active socket listeners:

```bash
devlab ports
```

**Options:**

- `--no-probe`: Disables active socket connection testing.

---

### 2. `devlab doctor`

Verifies that the developer's local workstation meets all requirements for running the DevLab platform:

```bash
devlab doctor
```

**Verifications Performed:**

- **Node.js**: Ensures version $\ge \text{v20.0.0}$.
- **pnpm**: Validates package manager installation.
- **Astral uv / Python**: Checks Python 3.12+ and uv toolchain for `devlab-guard`.
- **Docker Daemon**: Confirms Docker engine is active and reachable.
- **Root Infrastructure**: Verifies presence of the root `docker-compose.yml`.
- **Database Sockets**: Tests connectivity to PostgreSQL (`:5432`) and Redis (`:6379`).

---

### 3. `devlab status`

Pings health endpoints across all ecosystem services in parallel, rendering an ANSI-colored status board:

```bash
devlab status
# With custom probe timeout
devlab status --timeout 5000
```

**Services Evaluated:**

- `devlab-portal` API (`http://localhost:4000/health`)
- `finai` API (`http://localhost:4001/health`)
- `orchestrai` Gateway (`http://localhost:4002/health`)
- `devlab-logs` Ingest (`http://localhost:4003/health`)
- `devlab-guard` (`http://localhost:8000/healthz`)
- `incidentai` (`http://localhost:8001/healthz`)

---

### 4. `devlab infra <subcommand>`

Manages the local root Docker infrastructure stack (`docker-compose.yml`):

```bash
# Launch background infrastructure (PostgreSQL, Redis, Redpanda, Ollama)
devlab infra up

# Check container health and status
devlab infra status

# View live container logs
devlab infra logs --service postgres

# Stop and dismantle infrastructure
devlab infra down
```

---

### 5. `devlab token <subcommand>`

Diagnostic utilities for JSON Web Tokens (JWT) and OIDC JWKS public keys:

```bash
# Inspect and decode RS256 token payload, subject, tenant, and expiration
devlab token inspect <jwt-string>

# Fetch and validate public signing keys from DevLab Portal API (:4000)
devlab token jwks
```

---

## 🛡️ Attribution & License

- **Author:** `yuva.devlab@gmail.com`
- **License:** MIT
