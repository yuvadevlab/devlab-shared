/**
 * @file src/brands/index.ts
 * @description Central export index for all DevLab brand specifications.
 */

import { FINAI_BRAND } from "./finai.tokens";
import { LOGS_BRAND } from "./logs.tokens";
import { ORCHESTRAI_BRAND } from "./orchestrai.tokens";
import { PORTAL_BRAND } from "./portal.tokens";
import { VITALAI_BRAND } from "./vitalai.tokens";

export { FINAI_BRAND } from "./finai.tokens";
export { LOGS_BRAND } from "./logs.tokens";
export { ORCHESTRAI_BRAND } from "./orchestrai.tokens";
export { PORTAL_BRAND } from "./portal.tokens";
export { VITALAI_BRAND } from "./vitalai.tokens";

export const ALL_BRANDS = [
  FINAI_BRAND,
  LOGS_BRAND,
  ORCHESTRAI_BRAND,
  PORTAL_BRAND,
  VITALAI_BRAND,
] as const;

export const BRAND_MAP = {
  finai: FINAI_BRAND,
  logs: LOGS_BRAND,
  orchestrai: ORCHESTRAI_BRAND,
  portal: PORTAL_BRAND,
  vitalai: VITALAI_BRAND,
} as const;
