import { GENERAL_LAYOUT_NAV_COMPONENTS } from "./components-general-layout-nav";
import { DATA_ENTRY_UTILITY_COMPONENTS } from "./components-data-entry-utility";
import { DISPLAY_FEEDBACK_COMPONENTS } from "./components-display-feedback";
import type { ComponentMeta } from "./meta-types";

export * from "./meta-types";

export const COMPONENTS_LIST: ComponentMeta[] = [
  ...GENERAL_LAYOUT_NAV_COMPONENTS,
  ...DATA_ENTRY_UTILITY_COMPONENTS,
  ...DISPLAY_FEEDBACK_COMPONENTS,
];
