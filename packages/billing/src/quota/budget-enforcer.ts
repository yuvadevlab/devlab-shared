/**
 * @file packages/billing/src/quota/budget-enforcer.ts
 * @description Tenant budget quota enforcer evaluating spending limits against cost ledger.
 * @module @yuva-devlab/billing
 */

import { Logger, loggerWithConfig } from "@yuva-devlab/logger";
import { BUDGET_THRESHOLDS } from "../constants";
import type { CostLedger } from "../ledger";
import {
  BillingEnforcementAction,
  type BudgetEvaluationResult,
  BudgetQuotaStatus,
} from "../types";

const logger = loggerWithConfig(new Logger("BudgetEnforcer"));

/**
 * Enforces financial budget caps and throttling policies on tenant partitions.
 *
 * @example
 * ```typescript
 * const enforcer = new BudgetEnforcer(ledger);
 * const evalResult = enforcer.evaluateBudget("tenant_corp", 100.0);
 * if (evalResult.isThrottled) {
 *   throw new BillingQuotaExceededError("tenant_corp", evalResult.currentSpendUsd, 100.0);
 * }
 * ```
 */
export class BudgetEnforcer {
  public constructor(private readonly ledger: CostLedger) {}

  /**
   * Evaluates current tenant expenditure against allocated monthly spend limit.
   *
   * @param tenantId - Target tenant ID.
   * @param maxMonthlySpendUsd - Configured budget spending limit in USD.
   * @param periodStartMs - Start timestamp of current billing cycle.
   * @returns BudgetEvaluationResult determining whether execution is allowed or blocked.
   */
  public evaluateBudget(
    tenantId: string,
    maxMonthlySpendUsd: number,
    periodStartMs = 0,
  ): BudgetEvaluationResult {
    // If no cap is set (0 or negative), treat as unlimited healthy allowance
    if (maxMonthlySpendUsd <= 0) {
      return {
        tenantId,
        action: BillingEnforcementAction.ALLOW,
        status: BudgetQuotaStatus.HEALTHY,
        currentSpendUsd: 0,
        maxMonthlySpendUsd: 0,
        percentConsumed: 0,
        isThrottled: false,
      };
    }

    const summary = this.ledger.getTenantUsageSummary(tenantId, periodStartMs);
    const currentSpendUsd = summary.totalSpendUsd;
    const percentConsumed = Math.round(
      (currentSpendUsd / maxMonthlySpendUsd) * 100,
    );

    // 1. Quota fully exhausted or exceeded -> Throttle and block expensive runs
    if (percentConsumed >= BUDGET_THRESHOLDS.THROTTLE_PERCENT) {
      logger.warn(
        `[evaluateBudget] Tenant '${tenantId}' exceeded spending budget (${percentConsumed}%)`,
        {
          currentSpendUsd,
          maxMonthlySpendUsd,
        },
      );
      return {
        tenantId,
        action: BillingEnforcementAction.THROTTLE,
        status: BudgetQuotaStatus.THROTTLED,
        currentSpendUsd,
        maxMonthlySpendUsd,
        percentConsumed,
        isThrottled: true,
      };
    }

    // 2. Approaching quota limit -> Warn operator
    if (percentConsumed >= BUDGET_THRESHOLDS.WARNING_PERCENT) {
      logger.warn(
        `[evaluateBudget] Tenant '${tenantId}' approaching budget limit (${percentConsumed}%)`,
        {
          currentSpendUsd,
          maxMonthlySpendUsd,
        },
      );
      return {
        tenantId,
        action: BillingEnforcementAction.WARN,
        status: BudgetQuotaStatus.WARNING,
        currentSpendUsd,
        maxMonthlySpendUsd,
        percentConsumed,
        isThrottled: false,
      };
    }

    // 3. Normal healthy consumption
    return {
      tenantId,
      action: BillingEnforcementAction.ALLOW,
      status: BudgetQuotaStatus.HEALTHY,
      currentSpendUsd,
      maxMonthlySpendUsd,
      percentConsumed,
      isThrottled: false,
    };
  }
}
