/**
 * @file packages/billing/src/counter/token-counter.ts
 * @description Fast token estimation, prompt tokenization, and dynamic cost estimation engine.
 * @module @yuva-devlab/billing
 */

import { Logger, loggerWithConfig } from "@yuva-devlab/logger";
import { SAFETY_CEILING_PRICING } from "../constants";
import type { IPricingResolver, ModelPricingRate } from "../types";

const logger = loggerWithConfig(new Logger("TokenCounter"));

/**
 * Token counting utility providing heuristic BPE tokenization and dynamic server-driven cost calculations.
 *
 * @example
 * ```typescript
 * import { TokenCounter, DynamicPricingResolver } from "@yuva-devlab/billing";
 *
 * const resolver = new DynamicPricingResolver();
 * resolver.registerModel("gpt-4o", { promptUsdPerMillion: 2.5, completionUsdPerMillion: 10.0 });
 *
 * const counter = new TokenCounter({ pricingResolver: resolver });
 * const tokens = counter.countTextTokens("Analyze financial statements");
 * const cost = counter.estimateCostUsd("gpt-4o", tokens, 100);
 * ```
 */
export class TokenCounter {
  /** Average number of characters per token in standard LLM tokenizers (tiktoken / BPE) */
  private readonly charsPerToken: number;
  private readonly pricingResolver?: IPricingResolver;

  /**
   * Initializes the TokenCounter.
   *
   * @param options - Configuration including characters per token ratio and dynamic pricing resolver.
   */
  public constructor(options?: {
    charsPerToken?: number;
    pricingResolver?: IPricingResolver;
  }) {
    this.charsPerToken = Math.max(1.0, options?.charsPerToken ?? 4.0);
    this.pricingResolver = options?.pricingResolver;
  }

  /**
   * Counts or estimates tokens within a plain text string.
   *
   * @param text - Input text content.
   * @returns Approximated token count.
   */
  public countTextTokens(text: string): number {
    if (!text || text.length === 0) {
      return 0;
    }
    return Math.ceil(text.length / this.charsPerToken);
  }

  /**
   * Counts tokens across structured chat messages including overhead formatting.
   *
   * @param messages - Array of message objects containing content and role.
   * @returns Total aggregate token count.
   */
  public countMessageTokens(
    messages: readonly { content?: string; role?: string }[],
  ): number {
    let count = 0;
    // Base formatting overhead per message (e.g. <|im_start|>role\ncontent<|im_end|>)
    const perMessageOverhead = 4;

    for (const msg of messages) {
      count += perMessageOverhead;
      if (msg.role) {
        count += this.countTextTokens(msg.role);
      }
      if (msg.content) {
        count += this.countTextTokens(msg.content);
      }
    }

    return count;
  }

  /**
   * Estimates monetary cost in USD for a given model based on token usage.
   * Dynamically resolves pricing rates without hardcoded model tables.
   *
   * @param model - Model name or identifier.
   * @param promptTokens - Number of input prompt tokens.
   * @param completionTokens - Number of generated completion tokens.
   * @param explicitRate - Optional explicit pricing rate override.
   * @returns Estimated cost in USD rounded to 6 decimal places.
   */
  public estimateCostUsd(
    model: string,
    promptTokens: number,
    completionTokens: number,
    explicitRate?: ModelPricingRate,
  ): number {
    let pricing: ModelPricingRate;

    if (explicitRate) {
      pricing = explicitRate;
    } else if (this.pricingResolver) {
      const resolved = this.pricingResolver.getPricingSync(model);
      pricing = resolved ?? SAFETY_CEILING_PRICING;
    } else {
      logger.warn(
        "[estimateCostUsd] TokenCounter estimating cost without configured pricing resolver; applying safety revenue ceiling",
        { model },
      );
      pricing = SAFETY_CEILING_PRICING;
    }

    const promptCost = (promptTokens / 1_000_000) * pricing.promptUsdPerMillion;
    const completionCost =
      (completionTokens / 1_000_000) * pricing.completionUsdPerMillion;

    return Number((promptCost + completionCost).toFixed(6));
  }
}
