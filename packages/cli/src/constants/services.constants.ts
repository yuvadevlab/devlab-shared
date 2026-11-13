/**
 * @file packages/cli/src/constants/services.constants.ts
 * @description Health probe endpoints and repository locations across Yuva DevLab.
 * @author yuva.devlab@gmail.com
 */

/**
 * Canonical RFC 7517 JSON Web Key Set (JWKS) discovery endpoint path.
 */
export const DEFAULT_JWKS_PATH = "/.well-known/jwks.json";

/**
 * Ecosystem application health probe definition.
 */
export interface ServiceHealthConfig {
  readonly id: string;
  readonly name: string;
  readonly host: string;
  readonly port: number;
  readonly healthPath: string;
  readonly jwksPath?: string;
  readonly repoDir: string;
}

/**
 * Canonical health check endpoints for DevLab services in development mode.
 */
export const ECOSYSTEM_HEALTH_SERVICES: readonly ServiceHealthConfig[] = [
  {
    id: "portal-api",
    name: "DevLab Portal API",
    host: "localhost",
    port: 4000,
    healthPath: "/health",
    jwksPath: DEFAULT_JWKS_PATH,
    repoDir: "devlab-portal",
  },
  {
    id: "finai-api",
    name: "FinAI API",
    host: "localhost",
    port: 4001,
    healthPath: "/health",
    repoDir: "finai",
  },
  {
    id: "orchestrai-gateway",
    name: "Orchestrai Gateway",
    host: "localhost",
    port: 4002,
    healthPath: "/health",
    repoDir: "orchestrai",
  },
  {
    id: "logs-api",
    name: "DevLab Logs Ingest",
    host: "localhost",
    port: 4003,
    healthPath: "/health",
    repoDir: "devlab-logs",
  },
  {
    id: "devlab-guard",
    name: "DevLab Guard",
    host: "localhost",
    port: 8000,
    healthPath: "/healthz",
    repoDir: "devlab-guard",
  },
  {
    id: "incidentai",
    name: "IncidentAI",
    host: "localhost",
    port: 8001,
    healthPath: "/healthz",
    repoDir: "incidentai",
  },
] as const;

/**
 * Default connection timeout in milliseconds for health probe calls.
 */
export const DEFAULT_PROBE_TIMEOUT_MS = 2500;
