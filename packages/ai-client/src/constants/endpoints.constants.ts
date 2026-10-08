/**
 * @file packages/ai-client/src/constants/endpoints.constants.ts
 * @description Centralized API endpoint URLs and protocols for AI providers across DevLab.
 *
 * All base URLs, API versions, and host paths are maintained here in a single location
 * so version bumps and endpoint migrations never require searching through adapter code.
 *
 * @module @yuva-devlab/ai-client
 */

/**
 * Canonical default endpoints for external AI model provider APIs.
 */
export const AI_ENDPOINTS = Object.freeze({
  /** Local or edge Ollama REST service endpoint */
  OLLAMA_DEFAULT_BASE_URL: "http://127.0.0.1:11434",
  /** Groq OpenAI-compatible v1 chat completions endpoint */
  GROQ_DEFAULT_BASE_URL: "https://api.groq.com/openai/v1",
  /** OpenAI standard v1 REST API endpoint */
  OPENAI_DEFAULT_BASE_URL: "https://api.openai.com/v1",
  /** Anthropic Claude v1 REST messages API endpoint */
  ANTHROPIC_DEFAULT_BASE_URL: "https://api.anthropic.com/v1",
  /** Google Gemini Generative Language v1beta endpoint */
  GOOGLE_GEMINI_DEFAULT_BASE_URL:
    "https://generativelanguage.googleapis.com/v1beta",
  /** Required Anthropic API version header value */
  ANTHROPIC_VERSION_HEADER: "2023-06-01",
});
