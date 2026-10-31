import React from "react";

/**
 * Static dictionary mapping component slugs to their lazy-loaded documentation views.
 * Enables zero-overhead dynamic routing with static page pre-generation.
 */
const REGISTRY: Record<
  string,
  () => Promise<{ default: React.ComponentType }>
> = {
  accordion: () => import("@/registry/components/accordion"),
  alert: () => import("@/registry/components/alert"),
  "alert-dialog": () => import("@/registry/components/alert-dialog"),
  "aspect-ratio": () => import("@/registry/components/aspect-ratio"),
  avatar: () => import("@/registry/components/avatar"),
  badge: () => import("@/registry/components/badge"),
  box: () => import("@/registry/components/box"),
  breadcrumb: () => import("@/registry/components/breadcrumb"),
  button: () => import("@/registry/components/button"),
  calendar: () => import("@/registry/components/calendar"),
  card: () => import("@/registry/components/card"),
  carousel: () => import("@/registry/components/carousel"),
  chart: () => import("@/registry/components/chart"),
  checkbox: () => import("@/registry/components/checkbox"),
  collapsible: () => import("@/registry/components/collapsible"),
  command: () => import("@/registry/components/command"),
  "confirm-dialog": () => import("@/registry/components/confirm-dialog"),
  container: () => import("@/registry/components/container"),
  "context-menu": () => import("@/registry/components/context-menu"),
  "copy-button": () => import("@/registry/components/copy-button"),
  "date-picker": () => import("@/registry/components/date-picker"),
  dialog: () => import("@/registry/components/dialog"),
  drawer: () => import("@/registry/components/drawer"),
  "dropdown-menu": () => import("@/registry/components/dropdown-menu"),
  "empty-state": () => import("@/registry/components/empty-state"),
  flex: () => import("@/registry/components/flex"),
  form: () => import("@/registry/components/form"),
  grid: () => import("@/registry/components/grid"),
  heading: () => import("@/registry/components/heading"),
  "hover-card": () => import("@/registry/components/hover-card"),
  input: () => import("@/registry/components/input"),
  "input-otp": () => import("@/registry/components/input-otp"),
  label: () => import("@/registry/components/label"),
  "loading-state": () => import("@/registry/components/loading-state"),
  menubar: () => import("@/registry/components/menubar"),
  "metric-card": () => import("@/registry/components/metric-card"),
  "navigation-menu": () => import("@/registry/components/navigation-menu"),
  pagination: () => import("@/registry/components/pagination"),
  panel: () => import("@/registry/components/panel"),
  popover: () => import("@/registry/components/popover"),
  progress: () => import("@/registry/components/progress"),
  "radio-group": () => import("@/registry/components/radio-group"),
  resizable: () => import("@/registry/components/resizable"),
  "scroll-area": () => import("@/registry/components/scroll-area"),
  "searchable-select": () => import("@/registry/components/searchable-select"),
  "secret-reveal-card": () =>
    import("@/registry/components/secret-reveal-card"),
  select: () => import("@/registry/components/select"),
  separator: () => import("@/registry/components/separator"),
  sheet: () => import("@/registry/components/sheet"),
  sidebar: () => import("@/registry/components/sidebar"),
  skeleton: () => import("@/registry/components/skeleton"),
  slider: () => import("@/registry/components/slider"),
  stack: () => import("@/registry/components/stack"),
  "status-badge": () => import("@/registry/components/status-badge"),
  "status-chip": () => import("@/registry/components/status-chip"),
  switch: () => import("@/registry/components/switch"),
  table: () => import("@/registry/components/table"),
  tabs: () => import("@/registry/components/tabs"),
  text: () => import("@/registry/components/text"),
  textarea: () => import("@/registry/components/textarea"),
  toaster: () => import("@/registry/components/toaster"),
  toggle: () => import("@/registry/components/toggle"),
  "toggle-group": () => import("@/registry/components/toggle-group"),
  tooltip: () => import("@/registry/components/tooltip"),
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
