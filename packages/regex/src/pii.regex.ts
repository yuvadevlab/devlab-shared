/**
 * @file packages/regex/src/pii.regex.ts
 * @description Regular expressions and algorithmic validators for Personally Identifiable Information (PII).
 * @module @yuva-devlab/regex
 */

/**
 * Standard RFC-5322 simplified email pattern.
 */
export const EMAIL_REGEX: RegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Standard US Social Security Number format (###-##-#### or #########).
 */
export const US_SSN_REGEX: RegExp =
  /^(?!000|666|9\d{2})\d{3}-(?!00)\d{2}-(?!0000)\d{4}$/;

/**
 * International E.164 phone number pattern (+[1-9] followed by up to 14 digits).
 */
export const E164_PHONE_REGEX: RegExp = /^\+[1-9]\d{1,14}$/;

/**
 * Credit card structural format matcher (Visa, MasterCard, Amex, Discover).
 */
export const CREDIT_CARD_FORMAT_REGEX: RegExp =
  /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$/;

/**
 * DevLab platform API Key pattern (`dlk_` followed by base62/hex characters).
 */
export const DEVLAB_API_KEY_REGEX: RegExp = /^dlk_[a-zA-Z0-9]{32,64}$/;

/**
 * OpenAI API Key token pattern (`sk-...`).
 */
export const OPENAI_API_KEY_REGEX: RegExp = /^sk-[a-zA-Z0-9]{20,64}$/;

/**
 * GitHub Token pattern (`ghp_`, `gho_`, `ghu_`, `ghs_`, `ghr_`).
 */
export const GITHUB_TOKEN_REGEX: RegExp = /^gh[pousr]_[a-zA-Z0-9]{36,40}$/;

/**
 * Validates a credit card number using Luhn's algorithm (Mod 10).
 *
 * @param cardNumber - Cleaned numeric string of the card digits.
 * @returns True if card passes the Luhn checksum check.
 */
export function isValidLuhnChecksum(cardNumber: string): boolean {
  // Strip non-digit formatting characters
  const digits = cardNumber.replace(/\D/g, "");
  // Must be between 13 and 19 digits
  if (digits.length < 13 || digits.length > 19) {
    return false;
  }

  let sum = 0;
  let shouldDouble = false;

  // Loop backwards through digits
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  // Valid if sum modulo 10 is zero
  return sum % 10 === 0;
}

/**
 * Validates whether candidate string looks like a payment card number with valid checksum.
 *
 * @param candidate - Raw credit card candidate string.
 * @returns True if matches format and passes Luhn check.
 */
export function isValidCreditCard(candidate: string): boolean {
  const sanitized = candidate.replace(/[\s-]/g, "");
  // Guard against non-matching structural format
  if (!CREDIT_CARD_FORMAT_REGEX.test(sanitized)) {
    return false;
  }
  return isValidLuhnChecksum(sanitized);
}
