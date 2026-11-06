import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input, type InputProps } from "@/components/input";
import { cn } from "@/lib/utils";

export interface PasswordInputProps extends Omit<InputProps, "type"> {
  /**
   * Whether to display the interactive show/hide password toggle button.
   * @default true
   */
  showToggle?: boolean;
}

/**
 * Enterprise password input control with accessible show/hide toggle.
 * Built with design system tokens and Radix focus management.
 *
 * @example
 * ```tsx
 * <PasswordInput placeholder="Enter your credentials" required />
 * ```
 */
export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(({ className, showToggle = true, endIcon, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const toggleButton = showToggle ? (
    <button
      type="button"
      className="dl-password-toggle-btn"
      onClick={() => setShowPassword((prev) => !prev)}
      aria-label={showPassword ? "Hide password" : "Show password"}
      aria-pressed={showPassword}
      tabIndex={-1}
    >
      {showPassword ? (
        <EyeOff className="size-4" aria-hidden="true" />
      ) : (
        <Eye className="size-4" aria-hidden="true" />
      )}
    </button>
  ) : null;

  return (
    <Input
      type={showPassword ? "text" : "password"}
      className={cn("dl-password-input", className)}
      ref={ref}
      endIcon={toggleButton ?? endIcon}
      {...props}
    />
  );
});

PasswordInput.displayName = "PasswordInput";
