/**
 * @file packages/billing/src/ledger/cost-ledger.ts
 * @description Append-only transaction ledger storing token consumption and monetary costs.
 * @module @yuva-devlab/billing
 */

import { Logger, loggerWithConfig } from "@yuva-devlab/logger";
import type {
  BillingLedgerEntryType,
  CostLedgerEntry,
  TenantUsageSummary,
} from "../types";

const logger = loggerWithConfig(new Logger("CostLedger"));

/**
 * Append-only transactional financial ledger partitioned by tenant.
 *
 * @example
 * ```typescript
 * const ledger = new CostLedger();
 * ledger.recordExpenditure({
 *   tenantId: "tenant_1",
 *   entryType: BillingLedgerEntryType.COMPLETION,
 *   promptTokens: 50,
 *   completionTokens: 20,
 *   costUsd: 0.000045,
 *   modelIdentifier: "gpt-4o-mini",
 * });
 * const summary = ledger.getTenantUsageSummary("tenant_1");
 * ```
 */
export class CostLedger {
  private readonly ledger: CostLedgerEntry[] = [];

  /**
   * Appends an immutable expenditure entry to the tenant ledger.
   *
   * @param params - Expenditure properties including tenantId, tokens, and cost.
   * @returns Persisted CostLedgerEntry.
   */
  public recordExpenditure(params: {
    tenantId: string;
    entryType: BillingLedgerEntryType;
    promptTokens: number;
    completionTokens: number;
    costUsd: number;
    modelIdentifier: string;
    executionId?: string;
  }): CostLedgerEntry {
    const entry: CostLedgerEntry = {
      id: crypto.randomUUID(),
      tenantId: params.tenantId,
      entryType: params.entryType,
      promptTokens: params.promptTokens,
      completionTokens: params.completionTokens,
      costUsd: Number(params.costUsd.toFixed(6)),
      modelIdentifier: params.modelIdentifier,
      executionId: params.executionId,
      timestamp: Date.now(),
    };

    this.ledger.push(entry);
    logger.debug("[recordExpenditure] Recorded billing expenditure", {
      tenantId: entry.tenantId,
      costUsd: entry.costUsd,
      model: entry.modelIdentifier,
    });

    return entry;
  }

  /**
   * Retrieves aggregated usage and financial totals for a tenant since period start.
   *
   * @param tenantId - Target tenant ID.
   * @param periodStartMs - Epoch timestamp marking beginning of billing period.
   * @returns Computed TenantUsageSummary.
   */
  public getTenantUsageSummary(
    tenantId: string,
    periodStartMs = 0,
  ): TenantUsageSummary {
    const entries = this.ledger.filter(
      (e) => e.tenantId === tenantId && e.timestamp >= periodStartMs,
    );

    let totalSpendUsd = 0;
    let totalPromptTokens = 0;
    let totalCompletionTokens = 0;

    for (const e of entries) {
      totalSpendUsd += e.costUsd;
      totalPromptTokens += e.promptTokens;
      totalCompletionTokens += e.completionTokens;
    }

    return {
      tenantId,
      totalSpendUsd: Number(totalSpendUsd.toFixed(6)),
      totalPromptTokens,
      totalCompletionTokens,
      totalTokens: totalPromptTokens + totalCompletionTokens,
      entryCount: entries.length,
      periodStart: new Date(periodStartMs).toISOString(),
    };
  }

  /**
   * Returns all raw ledger entries for a tenant partition.
   *
   * @param tenantId - Target tenant ID.
   * @returns Array of CostLedgerEntries.
   */
  public getEntriesByTenant(tenantId: string): readonly CostLedgerEntry[] {
    return this.ledger.filter((e) => e.tenantId === tenantId);
  }
}
