/**
 * @file packages/billing/src/constants/pricing.constants.ts
 * @description Centralized threshold constants and safety revenue bounds for dynamic model pricing.
 * @module @yuva-devlab/billing
 */

import type { ModelPricingRate } from "../types";

/**
 * Default cache duration in milliseconds for live model pricing matrices (5 minutes).
 * Provides low-latency lookups while remaining responsive to real-time control plane updates.
 */
export const DEFAULT_PRICING_CACHE_TTL_MS = 300_000;

/**
 * Conservative safety ceiling pricing applied when a newly released model is executed
 * before its pricing has been populated in the database or control plane.
 *
 * CRITICAL BUSINESS INVARIANT: Under NO circumstances should an unpriced model execute
 * at $0.00 (free cost). This rate prevents revenue leakage during propagation windows.
 */
export const SAFETY_CEILING_PRICING: Readonly<ModelPricingRate> = Object.freeze(
  {
    promptUsdPerMillion: 1.5,
    completionUsdPerMillion: 6.0,
  },
);

/**
 * Budget enforcement percentage thresholds against monthly allocation.
 */
export const BUDGET_THRESHOLDS = Object.freeze({
  /** Warning threshold percentage of allocated budget (80%) */
  WARNING_PERCENT: 80,
  /** Critical throttle threshold percentage of allocated budget (100%) */
  THROTTLE_PERCENT: 100,
});
