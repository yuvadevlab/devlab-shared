/**
 * @file packages/cli/src/constants/ports.constants.ts
 * @description Canonical port taxonomy and environment offset rules for Yuva DevLab.
 * Follows the 3*** (Web), 4*** (API), 8*** (Dedicated API), and +10 (Prod) standard.
 * @author yuva.devlab@gmail.com
 */

/**
 * Port classification category.
 */
export enum PortCategory {
  WEB = "WEB",
  API = "API",
  DEDICATED_API = "DEDICATED_API",
  INFRASTRUCTURE = "INFRASTRUCTURE",
}

/**
 * Standard port increment for production environments.
 */
export const PROD_PORT_OFFSET = 10;

/**
 * Standard DevLab ecosystem service port definitions.
 */
export interface ServicePortDefinition {
  readonly id: string;
  readonly name: string;
  readonly category: PortCategory;
  readonly devPort: number;
  readonly prodPort: number;
  readonly protocol: "http" | "https" | "tcp";
  readonly description: string;
}

/**
 * Canonical port assignments across all Yuva DevLab applications.
 */
export const ECOSYSTEM_PORTS: readonly ServicePortDefinition[] = [
  // Web Frontends (3000-series)
  {
    id: "portal-web",
    name: "DevLab Portal Web",
    category: PortCategory.WEB,
    devPort: 3000,
    prodPort: 3010,
    protocol: "http",
    description: "Central SSO, IAM & App Catalog (Next.js 15)",
  },
  {
    id: "finai-web",
    name: "FinAI Web",
    category: PortCategory.WEB,
    devPort: 3001,
    prodPort: 3011,
    protocol: "http",
    description: "Financial Intelligence & Wealth UI (Next.js 15)",
  },
  {
    id: "orchestrai-console",
    name: "Orchestrai Console",
    category: PortCategory.WEB,
    devPort: 3002,
    prodPort: 3012,
    protocol: "http",
    description: "Autonomous Agent Swarm Console (Next.js 15)",
  },
  {
    id: "logs-web",
    name: "DevLab Logs Web",
    category: PortCategory.WEB,
    devPort: 3003,
    prodPort: 3013,
    protocol: "http",
    description: "Telemetry & Log Analytics UI (Next.js 15)",
  },
  {
    id: "knowledgai-web",
    name: "KnowledgeAI Web",
    category: PortCategory.WEB,
    devPort: 3004,
    prodPort: 3014,
    protocol: "http",
    description: "Enterprise Semantic Search UI (Next.js 15)",
  },
  {
    id: "ui-docs",
    name: "DevLab UI Docs",
    category: PortCategory.WEB,
    devPort: 3030,
    prodPort: 3040,
    protocol: "http",
    description: "Tokens & Component Showcase (Next.js)",
  },

  // Backend APIs (4000-series)
  {
    id: "portal-api",
    name: "DevLab Portal API",
    category: PortCategory.API,
    devPort: 4000,
    prodPort: 4010,
    protocol: "http",
    description: "Identity Control Plane, OIDC & JWKS (NestJS 11)",
  },
  {
    id: "finai-api",
    name: "FinAI API",
    category: PortCategory.API,
    devPort: 4001,
    prodPort: 4011,
    protocol: "http",
    description: "Financial Engine & Portfolio API (NestJS 11)",
  },
  {
    id: "orchestrai-gateway",
    name: "Orchestrai Gateway",
    category: PortCategory.API,
    devPort: 4002,
    prodPort: 4012,
    protocol: "http",
    description: "Agent Swarm Gateway & Execution Rail (Node TS)",
  },
  {
    id: "logs-api",
    name: "DevLab Logs Ingest",
    category: PortCategory.API,
    devPort: 4003,
    prodPort: 4013,
    protocol: "http",
    description: "Log Ingestion & DuckDB Query Engine (Express)",
  },
  {
    id: "knowledgai-api",
    name: "KnowledgeAI API",
    category: PortCategory.API,
    devPort: 4004,
    prodPort: 4014,
    protocol: "http",
    description: "Neural Vector Retrieval & GraphRAG (FastAPI)",
  },

  // Dedicated AI & SRE Services (8000-series)
  {
    id: "devlab-guard",
    name: "DevLab Guard",
    category: PortCategory.DEDICATED_API,
    devPort: 8000,
    prodPort: 8010,
    protocol: "http",
    description: "AST Code Governance & Token Linter (FastAPI / uv)",
  },
  {
    id: "incidentai",
    name: "IncidentAI",
    category: PortCategory.DEDICATED_API,
    devPort: 8001,
    prodPort: 8011,
    protocol: "http",
    description: "Autonomous Incident Commander (Express / TS)",
  },

  // Infrastructure Services
  {
    id: "postgres",
    name: "PostgreSQL (pgvector)",
    category: PortCategory.INFRASTRUCTURE,
    devPort: 5432,
    prodPort: 5432,
    protocol: "tcp",
    description: "Primary Relational & Vector Datastore",
  },
  {
    id: "redis",
    name: "Redis 7 (Alpine)",
    category: PortCategory.INFRASTRUCTURE,
    devPort: 6379,
    prodPort: 6379,
    protocol: "tcp",
    description: "Distributed Cache & Pub/Sub Gateway",
  },
  {
    id: "redpanda",
    name: "Redpanda (Kafka)",
    category: PortCategory.INFRASTRUCTURE,
    devPort: 19092,
    prodPort: 19092,
    protocol: "tcp",
    description: "Event Streaming Message Bus",
  },
  {
    id: "ollama",
    name: "Ollama LLM",
    category: PortCategory.INFRASTRUCTURE,
    devPort: 11434,
    prodPort: 11434,
    protocol: "http",
    description: "Local Neural Embedding & LLM Runner",
  },
] as const;
