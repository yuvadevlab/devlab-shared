/**
 * @file packages/ai-client/src/constants/models.constants.ts
 * @description Centralized catalog of default model identifiers across providers.
 *
 * Update model versions (e.g. gemma4, qwen2.5, llama-3.3, gemini-2.5) in this single file.
 *
 * @module @yuva-devlab/ai-client
 */

/**
 * Standard default model names assigned to providers when none is explicitly specified in the request.
 */
export const AI_DEFAULT_MODELS = Object.freeze({
  /** Default Ollama local model */
  OLLAMA: "qwen2.5:7b",
  /** Default Groq ultra-low latency model */
  GROQ: "llama-3.3-70b-versatile",
  /** Default Google Gemini model */
  GOOGLE: "gemini-2.5-flash",
  /** Default OpenAI model */
  OPENAI: "gpt-4o-mini",
  /** Default Anthropic Claude model */
  ANTHROPIC: "claude-3-5-haiku-latest",
});
