import { clsx, type ClassValue } from "clsx";

export type { ClassValue };

/**
 * Platform-native class name composer.
 * Zero-overhead utility that joins class names and evaluates conditional expressions.
 * Use for @layer dl-* semantic class composition.
 *
 * @param inputs - Class names, falsy conditionals, or arrays.
 * @returns Clean joined class name string.
 */
export function cx(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Canonical class name helper for components.
 * Joins class names and filters falsy values.
 *
 * @param inputs - List of class names, conditional records, or arrays.
 * @returns Clean joined CSS class string.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
