/**
 * @file packages/auth-react/src/components/user-button.tsx
 * @description Compact user avatar and profile dropdown trigger button.
 * @module @yuva-devlab/auth-react
 */

import React, { useContext } from "react";
import { LogOut, User } from "lucide-react";
import { DevLabAuthContext } from "../provider/auth-context";

/**
 * Compact profile button displaying user initials or avatar, with one-click logout.
 */
export const UserButton: React.FC = () => {
  const auth = useContext(DevLabAuthContext);

  if (!auth || !auth.isAuthenticated || !auth.user) {
    return null;
  }

  const { user, logout } = auth;
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : (user.email?.slice(0, 2).toUpperCase() ?? "U");

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "12px",
        backgroundColor: "#18181b",
        border: "1px solid #27272a",
        borderRadius: "9999px",
        padding: "4px 12px 4px 4px",
      }}
    >
      <div
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          backgroundColor: "#3f3f46",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: 600,
          color: "#fafafa",
        }}
      >
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.name ?? "User"}
            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
          />
        ) : initials ? (
          initials
        ) : (
          <User size={14} />
        )}
      </div>

      <span
        style={{
          fontSize: "13px",
          color: "#f4f4f5",
          fontWeight: 500,
          maxWidth: "140px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {user.name ?? user.email ?? "User"}
      </span>

      <button
        type="button"
        onClick={logout}
        title="Sign Out"
        style={{
          background: "none",
          border: "none",
          color: "#71717a",
          cursor: "pointer",
          padding: "2px",
          display: "flex",
          alignItems: "center",
        }}
        onMouseOver={(e) => (e.currentTarget.style.color = "#ef4444")}
        onMouseOut={(e) => (e.currentTarget.style.color = "#71717a")}
      >
        <LogOut size={14} />
      </button>
    </div>
  );
};
