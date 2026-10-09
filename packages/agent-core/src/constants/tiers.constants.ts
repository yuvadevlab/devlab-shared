/**
 * @file packages/agent-core/src/constants/tiers.constants.ts
 * @description Permission tiers, confirmation policies, and capability declarations for agent tools.
 * @module @yuva-devlab/agent-core
 */

/**
 * Access authorization tier determining the privilege level required to execute a tool.
 */
export const AccessTier = {
  /** Read-only inspection tools with zero mutation side-effects */
  READ_ONLY: "READ_ONLY",
  /** State-mutating tools modifying user data, files, or records */
  WRITE: "WRITE",
  /** System administrative or elevated operations (privilege escalation, deletion) */
  ADMIN: "ADMIN",
} as const;

export type AccessTier = (typeof AccessTier)[keyof typeof AccessTier];

/**
 * Human-in-the-loop confirmation requirement policy before tool dispatch.
 */
export const ConfirmationPolicy = {
  /** Safe to run automatically without prompting the operator */
  AUTO_EXECUTE: "AUTO_EXECUTE",
  /** Requires interactive human approval in chat UI before dispatch */
  REQUIRE_APPROVAL: "REQUIRE_APPROVAL",
  /** High-risk operation requiring explicit verification and safety confirmation */
  DANGEROUS: "DANGEROUS",
} as const;

export type ConfirmationPolicy =
  (typeof ConfirmationPolicy)[keyof typeof ConfirmationPolicy];

/**
 * Fine-grained operational capabilities claimed by a tool for sandboxing and security auditing.
 */
export const ToolCapability = {
  /** Outbound network or HTTP API access */
  NETWORK: "NETWORK",
  /** Local filesystem read or write access */
  FILESYSTEM: "FILESYSTEM",
  /** Financial transactions, balance modification, or billing meters */
  FINANCIAL: "FINANCIAL",
  /** Arbitrary process or shell command execution */
  EXEC: "EXEC",
  /** Web browser automation, scraping, or headless rendering */
  BROWSER: "BROWSER",
  /** Relational, document, or vector database queries */
  DATABASE: "DATABASE",
} as const;

export type ToolCapability =
  (typeof ToolCapability)[keyof typeof ToolCapability];
