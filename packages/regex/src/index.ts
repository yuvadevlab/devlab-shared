/**
 * @file packages/regex/src/index.ts
 * @description Centralized barrel export for all regular expressions and lexical patterns across DevLab.
 *
 * ─── Package Invariant ─────────────────────────────────────────────
 * Single source of truth for all regex patterns, UUID checks, PII redactions,
 * security guard patterns, and URI validations.
 * Zero external dependencies for universal browser, worker, and node consumption.
 * ───────────────────────────────────────────────────────────────────
 * @module @yuva-devlab/regex
 */

export * from "./uuid.regex";
export * from "./security.regex";
export * from "./pii.regex";
export * from "./uri.regex";
