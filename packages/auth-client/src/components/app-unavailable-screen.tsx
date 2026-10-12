/**
 * @file packages/auth-react/src/components/app-unavailable-screen.tsx
 * @description Full-screen overlay presented when an application has been deactivated by the platform kill-switch.
 * @module @yuva-devlab/auth-react
 */

import React from "react";
import { AlertTriangle, RefreshCw, Wrench } from "lucide-react";
import { AppStatus } from "../types";

/**
 * Properties for AppUnavailableScreen.
 */
export interface AppUnavailableScreenProps {
  /** The current non-active status */
  readonly status: AppStatus;
  /** Optional callback to trigger status re-evaluation */
  readonly onRetry?: () => void;
}

/**
 * Renders a full-screen alert message when an application is inactive or in maintenance.
 *
 * @param props - Component properties
 * @returns React component
 */
export const AppUnavailableScreen: React.FC<AppUnavailableScreenProps> = ({
  status,
  onRetry,
}) => {
  const isMaintenance = status === AppStatus.MAINTENANCE;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#09090b",
        color: "#f4f4f5",
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "24px",
        boxSizing: "border-box",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          backgroundColor: isMaintenance
            ? "rgba(234, 179, 8, 0.15)"
            : "rgba(239, 68, 68, 0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "24px",
        }}
      >
        {isMaintenance ? (
          <Wrench size={32} color="#eab308" />
        ) : (
          <AlertTriangle size={32} color="#ef4444" />
        )}
      </div>

      <h1
        style={{
          fontSize: "24px",
          fontWeight: 600,
          margin: "0 0 12px 0",
          letterSpacing: "-0.025em",
        }}
      >
        {isMaintenance
          ? "Scheduled System Maintenance"
          : "Application Currently Unavailable"}
      </h1>

      <p
        style={{
          fontSize: "15px",
          color: "#a1a1aa",
          maxWidth: "480px",
          lineHeight: 1.6,
          margin: "0 0 32px 0",
        }}
      >
        {isMaintenance
          ? "This service is currently undergoing routine maintenance to improve reliability. Please check back shortly."
          : "Access to this application has been temporarily deactivated by platform administrators. Please contact your organization owner for assistance."}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#27272a",
            color: "#fafafa",
            border: "1px solid #3f3f46",
            borderRadius: "6px",
            padding: "10px 20px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            transition: "background-color 0.15s ease",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#3f3f46")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#27272a")
          }
        >
          <RefreshCw size={16} />
          Check Status Again
        </button>
      )}
    </div>
  );
};
