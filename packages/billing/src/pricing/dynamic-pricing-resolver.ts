/**
 * @file packages/billing/src/pricing/dynamic-pricing-resolver.ts
 * @description Thread-safe in-memory cache and resolver for server-driven model pricing rates.
 * @module @yuva-devlab/billing
 */

import { Logger, loggerWithConfig } from "@yuva-devlab/logger";
import {
  DEFAULT_PRICING_CACHE_TTL_MS,
  SAFETY_CEILING_PRICING,
} from "../constants";
import type {
  IPricingResolver,
  ModelPricingRate,
  PricingLoaderFn,
  PricingLookupOptions,
} from "../types";

const logger = loggerWithConfig(new Logger("DynamicPricingResolver"));

/**
 * High-performance, server-driven model pricing resolver.
 * Caches database/API rates in memory and ensures zero revenue leakage for unpriced models.
 *
 * @example
 * ```typescript
 * import { DynamicPricingResolver } from "@yuva-devlab/billing";
 *
 * const resolver = new DynamicPricingResolver({
 *   loader: async () => {
 *     const res = await fetch("/api/v1/platform/pricing");
 *     return res.json();
 *   },
 * });
 *
 * const rate = await resolver.getPricing("gpt-4o");
 * ```
 */
export class DynamicPricingResolver implements IPricingResolver {
  private readonly cache = new Map<string, ModelPricingRate>();
  private readonly loader?: PricingLoaderFn;
  private readonly cacheTtlMs: number;
  private lastRefreshedAt = 0;
  private refreshPromise: Promise<void> | null = null;

  /**
   * Initializes the dynamic pricing resolver.
   *
   * @param options - Configuration including optional remote loader and cache TTL
   */
  public constructor(options?: {
    loader?: PricingLoaderFn;
    cacheTtlMs?: number;
    initialRates?: Record<string, ModelPricingRate>;
  }) {
    this.loader = options?.loader;
    this.cacheTtlMs = options?.cacheTtlMs ?? DEFAULT_PRICING_CACHE_TTL_MS;

    if (options?.initialRates) {
      this.bulkRegister(options.initialRates);
    }
  }

  /**
   * Resolves pricing for a model asynchronously, fetching fresh rates from DB/API if stale.
   *
   * @param model - Model identifier string
   * @param options - Lookup options
   * @returns Model pricing rates or safety ceiling
   */
  public async getPricing(
    model: string,
    options?: PricingLookupOptions,
  ): Promise<ModelPricingRate | null> {
    const normalizedModel = model.trim();
    const isStale = Date.now() - this.lastRefreshedAt > this.cacheTtlMs;

    // Refresh cache if stale and a loader is provided
    if ((isStale || !this.cache.has(normalizedModel)) && this.loader) {
      await this.refreshFromLoader();
    }

    const cached = this.cache.get(normalizedModel);
    if (cached) {
      return cached;
    }

    // Safety guard against revenue leakage: apply safety ceiling for unlisted models
    const useSafetyCeiling = options?.useSafetyCeilingOnUnknown ?? true;
    if (useSafetyCeiling) {
      logger.warn(
        "[getPricing] Unpriced model detected in billing evaluation; applying safety revenue ceiling",
        { model: normalizedModel, ceiling: SAFETY_CEILING_PRICING },
      );
      return SAFETY_CEILING_PRICING;
    }

    return null;
  }

  /**
   * Synchronously looks up cached pricing without network roundtrips.
   *
   * @param model - Model identifier string
   * @returns Cached rate or safety ceiling
   */
  public getPricingSync(model: string): ModelPricingRate | null {
    const normalizedModel = model.trim();
    const cached = this.cache.get(normalizedModel);
    if (cached) {
      return cached;
    }

    logger.warn(
      "[getPricingSync] Uncached model encountered during sync billing calculation; applying safety revenue ceiling",
      { model: normalizedModel },
    );
    return SAFETY_CEILING_PRICING;
  }

  /**
   * Registers or updates a single model rate live without server restarts.
   *
   * @param model - Model identifier
   * @param pricing - Monetary pricing rate
   */
  public registerModel(model: string, pricing: ModelPricingRate): void {
    this.cache.set(model.trim(), {
      promptUsdPerMillion: Number(pricing.promptUsdPerMillion),
      completionUsdPerMillion: Number(pricing.completionUsdPerMillion),
    });
    logger.debug("[registerModel] Registered dynamic model pricing rate", {
      model,
      pricing,
    });
  }

  /**
   * Bulk updates all model pricing rates from a database or control plane payload.
   *
   * @param pricingMap - Record mapping model IDs to pricing rates
   */
  public bulkRegister(pricingMap: Record<string, ModelPricingRate>): void {
    for (const [model, pricing] of Object.entries(pricingMap)) {
      this.cache.set(model.trim(), {
        promptUsdPerMillion: Number(pricing.promptUsdPerMillion),
        completionUsdPerMillion: Number(pricing.completionUsdPerMillion),
      });
    }
    this.lastRefreshedAt = Date.now();
    logger.info("[bulkRegister] Bulk updated dynamic model pricing rates", {
      totalModels: this.cache.size,
    });
  }

  /**
   * Internal deduplicated refresh operation invoking the remote loader.
   */
  private async refreshFromLoader(): Promise<void> {
    if (!this.loader) {
      return;
    }

    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = (async () => {
      try {
        const rates = await this.loader!();
        this.bulkRegister(rates);
      } catch (error) {
        logger.error(
          "[refreshFromLoader] Failed to refresh dynamic pricing from loader",
          {
            error,
          },
        );
      } finally {
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }
}
