/**
 * @file packages/billing/src/types/pricing.types.ts
 * @description Type definitions and contracts for dynamic, database-driven model pricing.
 * @module @yuva-devlab/billing
 */

/**
 * Monetary pricing rate for an LLM model in USD per 1,000,000 tokens.
 */
export interface ModelPricingRate {
  /** Cost in USD per 1,000,000 prompt (input) tokens */
  readonly promptUsdPerMillion: number;
  /** Cost in USD per 1,000,000 completion (output) tokens */
  readonly completionUsdPerMillion: number;
}

/**
 * Options configuring behavior when looking up model pricing.
 */
export interface PricingLookupOptions {
  /**
   * If true, applies a conservative safety ceiling instead of failing when a model is unpriced.
   * Prevents revenue leakage / zero-cost execution for newly introduced models.
   * @default true
   */
  readonly useSafetyCeilingOnUnknown?: boolean;
}

/**
 * Contract for resolving live, server-driven model pricing rates.
 */
export interface IPricingResolver {
  /**
   * Asynchronously resolves pricing rates for a model identifier.
   * Fetches from remote control plane or database if not cached.
   *
   * @param model - Model identifier (e.g. "gpt-4o", "claude-3-7-sonnet")
   * @param options - Lookup options
   * @returns ModelPricingRate or null if model cannot be priced
   */
  getPricing(
    model: string,
    options?: PricingLookupOptions,
  ): Promise<ModelPricingRate | null>;

  /**
   * Synchronously inspects the in-memory cache for pricing rates.
   *
   * @param model - Model identifier
   * @returns Cached ModelPricingRate or null if not yet loaded in memory
   */
  getPricingSync(model: string): ModelPricingRate | null;

  /**
   * Registers or updates pricing for a specific model in memory.
   *
   * @param model - Model identifier
   * @param pricing - Monetary pricing rate
   */
  registerModel(model: string, pricing: ModelPricingRate): void;

  /**
   * Bulk updates model pricing rates from a database or gateway payload.
   *
   * @param pricingMap - Dictionary of model identifiers to rates
   */
  bulkRegister(pricingMap: Record<string, ModelPricingRate>): void;
}

/**
 * Dynamic pricing loader callback function.
 * Fetches current model rates from PostgreSQL, Prisma, or Gateway API.
 */
export type PricingLoaderFn = () => Promise<Record<string, ModelPricingRate>>;
