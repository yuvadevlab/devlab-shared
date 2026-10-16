/**
 * @file packages/auth-client/src/components/auth-input.tsx
 * @description Styled form input field with icon, token theming, and password visibility toggle.
 * @module @yuva-devlab/auth-client
 */

import React, {
  useState,
  type ReactNode,
  type InputHTMLAttributes,
} from "react";
import { Eye, EyeOff } from "lucide-react";

export interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Unique HTML element ID */
  readonly id: string;
  /** Accessible label displayed above the input */
  readonly label: string;
  /** Optional icon prefix displayed inside the input */
  readonly icon?: ReactNode;
  /** Whether the field is a password and should include visibility toggle */
  readonly isPassword?: boolean;
}

export const AuthInput: React.FC<AuthInputProps> = ({
  id,
  label,
  icon,
  isPassword = false,
  type = "text",
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  const inputClass = [
    "dl-auth-input",
    icon ? "dl-auth-input--has-icon" : "",
    isPassword ? "dl-auth-input--has-eye" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="dl-auth-input-group">
      <label htmlFor={id} className="dl-auth-label">
        {label}
      </label>
      <div className="dl-auth-input-wrapper">
        {icon && <span className="dl-auth-input-icon">{icon}</span>}
        <input id={id} type={inputType} className={inputClass} {...props} />
        {isPassword && (
          <button
            type="button"
            className="dl-auth-eye-btn"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        )}
      </div>
    </div>
  );
};
