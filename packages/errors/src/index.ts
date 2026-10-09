/**
 * @file packages/errors/src/index.ts
 * @description Centralized barrel export for the DevLab platform error handling foundation.
 *
 * Provides standardized ErrorCode enums, DomainError base classes, Result monad,
 * and concrete domain error specializations.
 *
 * @module @yuva-devlab/errors
 */

export * from "./codes";
export * from "./domain-error";
export * from "./domain-errors";
export * from "./result";
