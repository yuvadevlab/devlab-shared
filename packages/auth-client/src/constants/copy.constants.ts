/**
 * @file packages/auth-client/src/constants/copy.constants.ts
 * @description Centralized UI copy dictionary for authentication feedback, alerts, and unavailable screens.
 * @module @yuva-devlab/auth-client
 */

/**
 * Text strings displayed within the AppUnavailableScreen component.
 */
export const UNAVAILABLE_COPY = Object.freeze({
  MAINTENANCE_TITLE: "Scheduled System Maintenance",
  INACTIVE_TITLE: "Application Currently Unavailable",
  MAINTENANCE_DESC:
    "This service is currently undergoing routine maintenance to improve reliability. Please check back shortly.",
  INACTIVE_DESC:
    "Access to this application has been temporarily deactivated by platform administrators. Please contact your organization owner for assistance.",
  RETRY_BTN: "Check Status Again",
});
