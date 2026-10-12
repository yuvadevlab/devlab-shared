/**
 * @file packages/auth-client/src/types/ui.types.ts
 * @description Contract properties for pre-built authentication UI components.
 * @module @yuva-devlab/auth-client
 */

import type { AuthUser } from "./auth-client.types";

/**
 * Properties for the pre-built SignIn authentication form component.
 */
export interface SignInProps {
  /** Callback fired upon successful authentication */
  readonly onSuccess?: (user: AuthUser, token: string) => void;
  /** Callback fired when authentication fails */
  readonly onError?: (error: Error) => void;
  /** URL to navigate to upon successful sign in */
  readonly redirectTo?: string;
  /** URL for the sign up navigation link */
  readonly signUpUrl?: string;
  /** URL for the forgot password navigation link */
  readonly forgotPasswordUrl?: string;
  /** Optional base API URL */
  readonly apiBaseUrl?: string;
  /** Optional custom CSS class name for container styling */
  readonly className?: string;
}

/**
 * Properties for the pre-built SignUp registration form component.
 */
export interface SignUpProps {
  /** Callback fired upon successful registration */
  readonly onSuccess?: (user: AuthUser, token: string) => void;
  /** Callback fired when registration fails */
  readonly onError?: (error: Error) => void;
  /** URL to navigate to upon successful registration */
  readonly redirectTo?: string;
  /** URL for the sign in navigation link */
  readonly signInUrl?: string;
  /** Target tenant UUID or slug to bind new user to */
  readonly tenantId?: string;
  /** Optional base API URL */
  readonly apiBaseUrl?: string;
  /** Optional custom CSS class name */
  readonly className?: string;
}

/**
 * Properties for the pre-built ForgotPassword form component.
 */
export interface ForgotPasswordProps {
  /** Callback fired when password reset request succeeds */
  readonly onSuccess?: (email: string) => void;
  /** Callback fired when request fails */
  readonly onError?: (error: Error) => void;
  /** URL for the back to sign in link */
  readonly signInUrl?: string;
  /** Optional base API URL */
  readonly apiBaseUrl?: string;
  /** Optional custom CSS class name */
  readonly className?: string;
}
