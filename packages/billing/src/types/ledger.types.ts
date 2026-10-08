/**
 * @file packages/billing/src/types/ledger.types.ts
 * @description Domain types and contracts for tenant cost ledgers and budget enforcers.
 * @module @yuva-devlab/billing
 */

/**
 * Categorical type of billing transaction ledger entry.
 */
export const BillingLedgerEntryType = {
  PROMPT: "PROMPT",
  COMPLETION: "COMPLETION",
  TOOL: "TOOL",
  EMBEDDING: "EMBEDDING",
} as const;

export type BillingLedgerEntryType =
  (typeof BillingLedgerEntryType)[keyof typeof BillingLedgerEntryType];

/**
 * Enforcement action recommended by the budget supervisor.
 */
export const BillingEnforcementAction = {
  ALLOW: "ALLOW",
  WARN: "WARN",
  THROTTLE: "THROTTLE",
  BLOCK: "BLOCK",
} as const;

export type BillingEnforcementAction =
  (typeof BillingEnforcementAction)[keyof typeof BillingEnforcementAction];

/**
 * Health status indicator of tenant budget quota.
 */
export const BudgetQuotaStatus = {
  HEALTHY: "HEALTHY",
  WARNING: "WARNING",
  THROTTLED: "THROTTLED",
  EXHAUSTED: "EXHAUSTED",
} as const;

export type BudgetQuotaStatus =
  (typeof BudgetQuotaStatus)[keyof typeof BudgetQuotaStatus];

/**
 * Immutable audit ledger entry representing a discrete financial expenditure.
 */
export interface CostLedgerEntry {
  readonly id: string;
  readonly tenantId: string;
  readonly entryType: BillingLedgerEntryType;
  readonly promptTokens: number;
  readonly completionTokens: number;
  readonly costUsd: number;
  readonly modelIdentifier: string;
  readonly executionId?: string;
  readonly timestamp: number;
}

/**
 * Aggregated tenant consumption metrics across an accounting billing cycle.
 */
export interface TenantUsageSummary {
  readonly tenantId: string;
  readonly totalSpendUsd: number;
  readonly totalPromptTokens: number;
  readonly totalCompletionTokens: number;
  readonly totalTokens: number;
  readonly entryCount: number;
  readonly periodStart: string;
}

/**
 * Result evaluation of a tenant budget enforcement inspection.
 */
export interface BudgetEvaluationResult {
  readonly tenantId: string;
  readonly action: BillingEnforcementAction;
  readonly status: BudgetQuotaStatus;
  readonly currentSpendUsd: number;
  readonly maxMonthlySpendUsd: number;
  readonly percentConsumed: number;
  readonly isThrottled: boolean;
}
