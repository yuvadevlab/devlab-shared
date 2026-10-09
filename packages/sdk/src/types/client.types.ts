/**
 * @file packages/sdk/src/types/client.types.ts
 * @description Configuration and options for the unified DevLabClient platform SDK.
 * @module @yuva-devlab/sdk
 */

import type { ILLMProvider } from "@yuva-devlab/ai-client";
import type { PricingLoaderFn } from "@yuva-devlab/billing";
import type { IEventBus } from "@yuva-devlab/events";
import type { IEmbeddingProvider } from "@yuva-devlab/rag";

/**
 * Configuration options for initializing the master DevLabClient.
 */
export interface DevLabClientConfig {
  /** Optional machine API key for authenticating with the DevLab Gateway */
  readonly apiKey?: string;
  /** Optional gateway base URL (defaults to DEFAULT_GATEWAY_URL) */
  readonly gatewayUrl?: string;
  /** Unique platform application slug (e.g. "finai", "orchestrai") */
  readonly appId?: string;
  /** Tenant isolation partition ID */
  readonly tenantId?: string;
  /** Custom LLM provider adapter override */
  readonly aiProvider?: ILLMProvider;
  /** Custom vector embedding provider override */
  readonly embeddingProvider?: IEmbeddingProvider;
  /** Custom domain event bus instance */
  readonly eventBus?: IEventBus;
  /** Remote pricing loader callback */
  readonly pricingLoader?: PricingLoaderFn;
  /** Global request timeout in milliseconds */
  readonly timeoutMs?: number;
}
