import React from "react";

/**
 * Static dictionary mapping component slugs to their lazy-loaded documentation views.
 * Enables zero-overhead dynamic routing with static page pre-generation.
 */
const REGISTRY: Record<
  string,
  () => Promise<{ default: React.ComponentType }>
> = {
  accordion: () => import("./components/accordion"),
  alert: () => import("./components/alert"),
  "alert-dialog": () => import("./components/alert-dialog"),
  "aspect-ratio": () => import("./components/aspect-ratio"),
  avatar: () => import("./components/avatar"),
  badge: () => import("./components/badge"),
  breadcrumb: () => import("./components/breadcrumb"),
  button: () => import("./components/button"),
  calendar: () => import("./components/calendar"),
  card: () => import("./components/card"),
  carousel: () => import("./components/carousel"),
  chart: () => import("./components/chart"),
  checkbox: () => import("./components/checkbox"),
  collapsible: () => import("./components/collapsible"),
  command: () => import("./components/command"),
  "confirm-dialog": () => import("./components/confirm-dialog"),
  "context-menu": () => import("./components/context-menu"),
  "copy-button": () => import("./components/copy-button"),
  "date-picker": () => import("./components/date-picker"),
  dialog: () => import("./components/dialog"),
  drawer: () => import("./components/drawer"),
  "dropdown-menu": () => import("./components/dropdown-menu"),
  form: () => import("./components/form"),
  "hover-card": () => import("./components/hover-card"),
  input: () => import("./components/input"),
  "input-otp": () => import("./components/input-otp"),
  label: () => import("./components/label"),
  "loading-state": () => import("./components/loading-state"),
  menubar: () => import("./components/menubar"),
  "metric-card": () => import("./components/metric-card"),
  "navigation-menu": () => import("./components/navigation-menu"),
  pagination: () => import("./components/pagination"),
  panel: () => import("./components/panel"),
  popover: () => import("./components/popover"),
  progress: () => import("./components/progress"),
  "radio-group": () => import("./components/radio-group"),
  resizable: () => import("./components/resizable"),
  "scroll-area": () => import("./components/scroll-area"),
  "searchable-select": () => import("./components/searchable-select"),
  "secret-reveal-card": () => import("./components/secret-reveal-card"),
  select: () => import("./components/select"),
  separator: () => import("./components/separator"),
  sheet: () => import("./components/sheet"),
  sidebar: () => import("./components/sidebar"),
  skeleton: () => import("./components/skeleton"),
  slider: () => import("./components/slider"),
  "status-badge": () => import("./components/status-badge"),
  "status-chip": () => import("./components/status-chip"),
  switch: () => import("./components/switch"),
  table: () => import("./components/table"),
  tabs: () => import("./components/tabs"),
  textarea: () => import("./components/textarea"),
  toaster: () => import("./components/toaster"),
  toggle: () => import("./components/toggle"),
  "toggle-group": () => import("./components/toggle-group"),
  tooltip: () => import("./components/tooltip"),
};

/**
 * Resolves the documentation view component for a given component slug.
 */
export async function getComponentDocComponent(
  slug: string,
): Promise<React.ComponentType | null> {
  const loader = REGISTRY[slug];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}
