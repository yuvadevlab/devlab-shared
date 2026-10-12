/**
 * @file packages/auth-client/src/components/auth-input.tsx
 * @description Styled form input field with icon and password visibility toggle.
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
  style,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label
        htmlFor={id}
        style={{ fontSize: "13px", fontWeight: 500, color: "#d4d4d8" }}
      >
        {label}
      </label>
      <div style={{ position: "relative" }}>
        {icon && (
          <span
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#71717a",
              display: "flex",
            }}
          >
            {icon}
          </span>
        )}
        <input
          id={id}
          type={inputType}
          style={{
            width: "100%",
            padding: icon ? "10px 38px 10px 38px" : "10px 12px",
            backgroundColor: "#18181b",
            border: "1px solid #3f3f46",
            borderRadius: "8px",
            color: "#fafafa",
            fontSize: "14px",
            outline: "none",
            boxSizing: "border-box",
            ...style,
          }}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              color: "#71717a",
              cursor: "pointer",
              padding: 0,
              display: "flex",
            }}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
};
