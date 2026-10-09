/**
 * @file packages/regex/src/uuid.regex.ts
 * @description Standard regular expressions and validation helpers for UUIDs across DevLab services.
 * @module @yuva-devlab/regex
 */

/**
 * Standard RFC 4122 / RFC 9562 compliant UUID pattern (v1, v4, v7).
 * Case-insensitive match on canonical 8-4-4-4-12 hex format.
 */
export const UUID_REGEX: RegExp =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Validates whether a given string is a syntactically valid RFC UUID.
 *
 * @param candidate - The string to validate.
 * @returns True if candidate is a valid UUID string.
 */
export function isValidUuid(candidate: string): boolean {
  // Discard empty or non-string candidate inputs early
  if (!candidate || typeof candidate !== "string") {
    return false;
  }
  return UUID_REGEX.test(candidate.trim());
}
