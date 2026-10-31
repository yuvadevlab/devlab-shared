import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export type { ClassValue };

/**
 * Platform-native class name composer.
 * Zero-runtime dependency, does not parse or run regex over class strings.
 * Use for @layer dl-* and BEM class composition.
 *
 * @param inputs - Class names, falsy conditionals, or arrays.
 * @returns Clean joined class name string.
 */
export function cx(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Merges multiple Tailwind class names and conditionally applied class definitions.
 * Combines clsx dynamic toggling with tailwind-merge collision deduplication.
 * Provided for backwards compatibility during migration to @layer platform CSS.
 *
 * @param inputs - List of class names, conditional records, or arrays.
 * @returns Deduplicated, normalized CSS class string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
