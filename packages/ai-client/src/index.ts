/**
 * @file packages/ai-client/src/index.ts
 * @description Master barrel export for the DevLab platform multi-provider AI client.
 *
 * Provides typed LLM adapters (Ollama, Groq, Google, OpenAI, Anthropic),
 * centralized endpoints, models, and execution constants,
 * multi-tier fallback cascade, self-healing structured JSON extraction,
 * Big 3 credential resolvers, and provider factories.
 *
 * @module @yuva-devlab/ai-client
 */

export * from "./constants";
export * from "./types";
export * from "./config";
export * from "./adapters";
export * from "./cascade";
export * from "./schema";
export * from "./factory";
