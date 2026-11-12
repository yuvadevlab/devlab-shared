/**
 * @file packages/auth-client/src/components/auth-styles.ts
 * @description Scoped design system CSS rules mapping brand tokens to auth components.
 * Aggregates viewport layout shells, cards, form inputs, buttons, and state confirmation rules.
 * @module @yuva-devlab/auth-client
 */

import { AUTH_BASE_STYLES } from "./auth-styles.base";
import { AUTH_CONTROL_STYLES } from "./auth-styles.controls";
import { AUTH_STATE_STYLES } from "./auth-styles.states";

/**
 * Universal stylesheet injected into full-viewport and standalone auth components.
 */
export const AUTH_STYLES = `${AUTH_BASE_STYLES}\n${AUTH_CONTROL_STYLES}\n${AUTH_STATE_STYLES}`;
