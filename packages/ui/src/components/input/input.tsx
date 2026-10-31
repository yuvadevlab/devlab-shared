import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Optional leading icon or interactive element rendered before the input text.
   * Automatically indents the placeholder and text to avoid overlapping.
   */
  startIcon?: React.ReactNode;
  /**
   * Optional trailing icon or interactive element rendered after the input text.
   * Useful for clear buttons, visibility toggles, or status indicators.
   */
  endIcon?: React.ReactNode;
}

/**
 * Textual input control styled with design system tokens and scoped CSS.
 * Provides accessible focus states, logical padding, and seamless icon integration.
 *
 * @example
 * ```tsx
 * // Standard text input
 * <Input placeholder="Enter your email" type="email" />
 *
 * // Search box with built-in start icon
 * <Input
 *   type="search"
 *   placeholder="Search agents..."
 *   startIcon={<Search />}
 * />
 *
 * // Password field with end visibility action
 * <Input
 *   type={showPassword ? "text" : "password"}
 *   placeholder="Password"
 *   endIcon={
 *     <button type="button" onClick={() => setShowPassword(!showPassword)}>
 *       {showPassword ? <EyeOff /> : <Eye />}
 *     </button>
 *   }
 * />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, ...props }, ref) => {
    const inputEl = (
      <input
        type={type}
        className={cn(
          "dl-input",
          startIcon && "dl-input--has-start-icon",
          endIcon && "dl-input--has-end-icon",
          className,
        )}
        ref={ref}
        {...props}
      />
    );

    if (!startIcon && !endIcon) {
      return inputEl;
    }

    return (
      <div className="dl-input-wrapper">
        {startIcon && (
          <span className="dl-input-icon dl-input-icon--start">
            {startIcon}
          </span>
        )}
        {inputEl}
        {endIcon && (
          <span className="dl-input-icon dl-input-icon--end">{endIcon}</span>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
