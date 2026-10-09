/**
 * @file packages/ai-client/src/types/credentials.types.ts
 * @description Standardized typed credentials and resolver contracts following Big 3 SDK specifications.
 *
 * Eliminates implicit global process.env coupling by enforcing explicit configuration,
 * dynamic credential resolvers (BYOK / Vault / Secrets Manager), and actionable error guidance.
 *
 * @module @yuva-devlab/ai-client
 */

import { DomainError, ErrorCode } from "@yuva-devlab/errors";

/**
 * Standard credential and connection properties for any AI provider.
 *
 * @example
 * ```typescript
 * const creds: ProviderCredentials = {
 *   apiKey: "sk-proj-...",
 *   baseUrl: "https://api.openai.com/v1",
 *   defaultModel: "gpt-4o",
 * };
 * ```
 */
export interface ProviderCredentials {
  /** Authentication API key or bearer token */
  readonly apiKey?: string;
  /** Custom base endpoint URL */
  readonly baseUrl?: string;
  /** Optional organization or tenant routing identifier */
  readonly organizationId?: string;
  /** Default model identifier if not specified in request */
  readonly defaultModel?: string;
}

/**
 * Dynamic asynchronous credential resolver function.
 * Enables integration with AWS Secrets Manager, GCP Secret Manager, or multi-tenant BYOK databases.
 *
 * @example
 * ```typescript
 * const vaultResolver: CredentialResolver = async () => {
 *   const secret = await vaultClient.getSecret("ai/openai");
 *   return { apiKey: secret.token };
 * };
 * ```
 */
export type CredentialResolver = () =>
  Promise<ProviderCredentials> | ProviderCredentials;

/**
 * Actionable error thrown when an adapter is invoked without necessary credentials.
 * Provides clear instructions and hints to the developer or consuming agent.
 *
 * @example
 * ```typescript
 * throw new MissingCredentialError("OpenAI", "OPENAI_API_KEY");
 * ```
 */
export class MissingCredentialError extends DomainError<
  typeof ErrorCode.UNAUTHORIZED
> {
  constructor(providerName: string, envVarHint: string) {
    super(
      `Missing credentials for provider '${providerName}'. ` +
        `Pass an explicit apiKey in the adapter config or provide a CredentialResolver. ` +
        `Hint: If running locally in Node.js, ensure '${envVarHint}' is set in your application environment.`,
      ErrorCode.UNAUTHORIZED,
      401,
      { providerName, envVarHint },
    );
  }
}
