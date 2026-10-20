/**
 * @file packages/auth-client/src/types/ui.types.ts
 * @description Contract properties for pre-built authentication UI components.
 * @module @yuva-devlab/auth-client
 */

import type { ReactNode } from "react";
import type { AuthUser } from "./auth-client.types";

/**
 * Common presentation, branding, and environment properties shared across all auth views.
 */
export interface BaseAuthFormProps {
  /** Optional base API URL */
  readonly apiBaseUrl?: string;
  /** Optional brand theme preset (e.g. "finai", "orchestrai", "logs", "portal") */
  readonly brand?: string;
  /** Optional theme override */
  readonly theme?: string;
  /** Optional custom CSS class name for container styling */
  readonly className?: string;
  /** Optional logo node placed above the card title */
  readonly logo?: ReactNode;
  /** Optional icon node placed above the card title (alias for logo) */
  readonly icon?: ReactNode;
  /** Whether to render within a full-viewport vertically centered page shell */
  readonly fullPage?: boolean;
  /** Callback fired when authentication or request fails */
  readonly onError?: (error: Error) => void;
}

/**
 * Base properties for authentication forms that establish an active user session.
 */
export interface BaseAuthSessionProps extends BaseAuthFormProps {
  /** Callback fired upon successful authentication or registration */
  readonly onSuccess?: (user: AuthUser, token: string) => void;
  /** URL to navigate to upon successful completion */
  readonly redirectTo?: string;
}

/**
 * Properties for the pre-built SignIn authentication form component.
 */
export interface SignInProps extends BaseAuthSessionProps {
  /** URL for the sign up navigation link */
  readonly signUpUrl?: string;
  /** URL for the forgot password navigation link */
  readonly forgotPasswordUrl?: string;
}

/**
 * Properties for the pre-built SignUp registration form component.
 */
export interface SignUpProps extends BaseAuthSessionProps {
  /** URL for the sign in navigation link */
  readonly signInUrl?: string;
  /** Target tenant UUID or slug to bind new user to */
  readonly tenantId?: string;
}

/**
 * Properties for the pre-built ForgotPassword form component.
 */
export interface ForgotPasswordProps extends BaseAuthFormProps {
  /** Callback fired when password reset request succeeds */
  readonly onSuccess?: (email: string) => void;
  /** URL for the back to sign in link */
  readonly signInUrl?: string;
}
