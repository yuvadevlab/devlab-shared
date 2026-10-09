/**
 * @file packages/regex/src/security.regex.ts
 * @description Regular expressions for detecting command injections, path traversals, secrets, and credentials.
 * @module @yuva-devlab/regex
 */

/**
 * Path traversal attack signatures matching recursive parent directory navigation.
 */
export const PATH_TRAVERSAL_REGEX: RegExp = /(\.\.[/\\])+/g;

/**
 * Common shell metacharacters and command chaining symbols indicative of shell injection.
 */
export const SHELL_INJECTION_REGEX: RegExp = /[;&|`$><]/g;

/**
 * SQL injection heuristic patterns matching common SQL comment markers, unions, or tautologies.
 */
export const SQL_INJECTION_INDICATORS_REGEX: RegExp =
  /(\b(union|select|insert|update|delete|drop|truncate|alter)\b|\b(or|and)\b\s+["']?\w+["']?\s*=\s*["']?\w+|--|\/\*|\*\/)/i;

/**
 * Secret tokens, API keys, credentials, and authentication headers paired with their redaction strings.
 */
export const SECRET_REDACTION_PATTERNS: readonly [RegExp, string][] = [
  // Bearer tokens & JWTs
  [/Bearer\s+[A-Za-z0-9\-_.]+/gi, "Bearer [REDACTED]"],
  // OpenAI & generic API keys (sk-...)
  [/sk-[a-zA-Z0-9]{20,}/g, "sk-[REDACTED]"],
  // DevLab API Keys (dlk_...)
  [/dlk_[a-zA-Z0-9]{32,}/g, "dlk_[REDACTED]"],
  // GitHub Personal Access Tokens (ghp_..., gho_..., etc.)
  [/gh[pous]_[a-zA-Z0-9]{36}/g, "gh*_[REDACTED]"],
  // AWS Access Key ID
  [/AKIA[0-9A-Z]{16}/g, "AKIA[REDACTED]"],
  // Passwords embedded inside connection strings / URLs
  [/:\/\/([^:]+):([^@]+)@/g, "://$1:[REDACTED]@"],
  // Email addresses in logs
  [/([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, "[EMAIL_REDACTED]"],
];

/**
 * High-risk credential and authentication token file paths (Critical security risk).
 */
export const CRITICAL_CREDENTIAL_PATTERNS: readonly RegExp[] = [
  /[\\/]\.ssh([\\/]|$)/i,
  /[\\/]\.aws([\\/]|$)/i,
  /[\\/]\.gnupg([\\/]|$)/i,
  /[\\/]\.config[\\/]gcloud([\\/]|$)/i,
  /[\\/]\.azure([\\/]|$)/i,
  /[\\/]\.kube([\\/]config)?$/i,
  /[\\/]id_(rsa|ed25519|ecdsa|dsa)(\.pub)?$/i,
  /\.(pem|key|pkcs12|pfx)$/i,
  /^\/(etc[\\/](shadow|passwd|sudoers)|System[\\/]|private[\\/])/i,
];

/**
 * Environment configuration and secret token file patterns.
 */
export const SECRET_CONFIG_PATTERNS: readonly RegExp[] = [
  /(^|[\\/])\.env(\.[a-zA-Z0-9_-]+)?$/i,
  /(^|[\\/])\.npmrc$/i,
  /(^|[\\/])\.dockercfg$/i,
  /(^|[\\/])\.docker[\\/]config\.json$/i,
  /(^|[\\/])credentials\.json$/i,
  /(^|[\\/])service-account.*\.json$/i,
];

/**
 * Redacts known sensitive secrets and tokens from a raw log or debug string.
 *
 * @param content - Input text possibly containing secrets.
 * @returns Sanitized string with secrets masked.
 */
export function redactSecrets(content: string): string {
  // Return directly if input is falsy or not a string
  if (!content || typeof content !== "string") {
    return content;
  }

  let sanitized = content;
  // Apply each replacement rule sequentially
  for (const [pattern, replacement] of SECRET_REDACTION_PATTERNS) {
    sanitized = sanitized.replace(pattern, replacement);
  }
  return sanitized;
}
