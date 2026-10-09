/**
 * @file packages/sdk/src/client/devlab-client.ts
 * @description Master DevLab platform client unifying AI, RAG, swarms, billing, caching, and events.
 * @module @yuva-devlab/sdk
 */

import {
  ToolRegistry,
  compilePrompt,
  type UniversalTool,
} from "@yuva-devlab/agent-core";
import {
  createDefaultProvider,
  type ILLMProvider,
  type LLMRequest,
  type LLMResponse,
  type LLMStreamChunk,
} from "@yuva-devlab/ai-client";
import {
  BudgetEnforcer,
  CostLedger,
  DynamicPricingResolver,
  TokenCounter,
} from "@yuva-devlab/billing";
import { InMemoryEventBus, type IEventBus } from "@yuva-devlab/events";
import { Logger, loggerWithConfig } from "@yuva-devlab/logger";
import {
  InMemoryVectorStore,
  MockEmbeddingProvider,
  TextChunker,
  type IEmbeddingProvider,
  type RagQuery,
  type RagSearchResult,
} from "@yuva-devlab/rag";
import { SemanticCache } from "@yuva-devlab/semantic-cache";
import { DEFAULT_CLIENT_TIMEOUT_MS, DEFAULT_GATEWAY_URL } from "../constants";
import type { DevLabClientConfig } from "../types";

const logger = loggerWithConfig(new Logger("DevLabClient"));

/**
 * Master client providing unified access to the complete DevLab platform capabilities.
 *
 * @example
 * ```typescript
 * import { DevLabClient } from "@yuva-devlab/sdk";
 *
 * const client = new DevLabClient({ apiKey: "dlk_..." });
 * const response = await client.complete({
 *   model: "gemini-2.5-flash",
 *   messages: [{ role: "user", content: "Hello!" }],
 * });
 * ```
 */
export class DevLabClient {
  public readonly ai: ILLMProvider;
  public readonly embedder: IEmbeddingProvider;
  public readonly cache: SemanticCache;
  public readonly tools: ToolRegistry;
  public readonly vectorStore: InMemoryVectorStore;
  public readonly chunker: TextChunker;
  public readonly events: IEventBus;
  public readonly billing: {
    readonly counter: TokenCounter;
    readonly ledger: CostLedger;
    readonly enforcer: BudgetEnforcer;
    readonly pricing: DynamicPricingResolver;
  };

  public readonly gatewayUrl: string;
  public readonly tenantId?: string;
  public readonly timeoutMs: number;

  /**
   * Initializes the unified DevLab platform client.
   *
   * @param config - Platform client options
   */
  public constructor(config: DevLabClientConfig = {}) {
    this.gatewayUrl = config.gatewayUrl ?? DEFAULT_GATEWAY_URL;
    this.tenantId = config.tenantId;
    this.timeoutMs = config.timeoutMs ?? DEFAULT_CLIENT_TIMEOUT_MS;

    // 1. Initialize AI inference
    this.ai = config.aiProvider ?? createDefaultProvider();

    // 2. Initialize Embeddings & Vector RAG
    this.embedder = config.embeddingProvider ?? new MockEmbeddingProvider();
    this.chunker = new TextChunker();
    this.vectorStore = new InMemoryVectorStore(this.embedder);

    // 3. Initialize Semantic Caching
    this.cache = new SemanticCache(this.embedder);

    // 4. Initialize Agent Tool Registry
    this.tools = new ToolRegistry();

    // 5. Initialize Server-Driven Billing & Metering
    const pricing = new DynamicPricingResolver({
      loader: config.pricingLoader,
    });
    const ledger = new CostLedger();
    const enforcer = new BudgetEnforcer(ledger);
    const counter = new TokenCounter({ pricingResolver: pricing });
    this.billing = { counter, ledger, enforcer, pricing };

    // 6. Initialize Distributed Event Bus
    this.events = config.eventBus ?? new InMemoryEventBus();

    logger.debug("[constructor] DevLabClient initialized", {
      gatewayUrl: this.gatewayUrl,
      tenantId: this.tenantId,
    });
  }

  /**
   * Completes an LLM prompt request.
   *
   * @param request - LLM completion request
   * @returns Model response
   */
  public async complete(request: LLMRequest): Promise<LLMResponse> {
    logger.debug("[complete] Executing AI completion via unified client", {
      model: request.model,
    });
    return this.ai.complete(request);
  }

  /**
   * Streams token chunks incrementally.
   *
   * @param request - LLM completion request
   * @returns Async iterable yielding token deltas
   */
  public async *stream(request: LLMRequest): AsyncIterable<LLMStreamChunk> {
    yield* this.ai.stream(request);
  }

  /**
   * Executes a vector similarity search across ingested document chunks.
   *
   * @param query - Search parameters
   * @returns Scored document chunks
   */
  public async search(query: RagQuery): Promise<RagSearchResult> {
    logger.debug("[search] Executing RAG search via unified client", {
      query: query.query,
    });
    return this.vectorStore.search(query);
  }

  /**
   * Executes a registered agent tool by name.
   *
   * @param toolName - Registered tool slug
   * @param input - Tool input arguments
   * @param ctx - Tool execution context
   * @returns Tool execution result
   */
  public async executeTool<TInput = unknown, TOutput = unknown>(
    toolName: string,
    input: TInput,
    ctx: { executionId: string; tenantId?: string },
  ): Promise<TOutput> {
    logger.debug("[executeTool] Executing registered tool", { toolName });
    const tool = this.tools.getOrThrow(toolName) as UniversalTool<
      TInput,
      TOutput
    >;
    return tool.execute(input, {
      executionId: ctx.executionId,
      tenantId: ctx.tenantId ?? this.tenantId,
    });
  }

  /**
   * Helper to compile a system prompt with tool documentation.
   */
  public compilePrompt(
    template: string,
    variables: Record<string, unknown> = {},
  ): string {
    return compilePrompt({
      template,
      variables,
      tools: this.tools.listAll(),
    });
  }
}
