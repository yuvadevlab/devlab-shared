import { GENERAL_LAYOUT_NAV_COMPONENTS } from "@/config/components-general-layout-nav";
import { DATA_ENTRY_UTILITY_COMPONENTS } from "@/config/components-data-entry-utility";
import { DISPLAY_FEEDBACK_COMPONENTS } from "@/config/components-display-feedback";
import type { ComponentMeta } from "@/config/meta-types";

export * from "@/config/meta-types";

export const COMPONENTS_LIST: ComponentMeta[] = [
  ...GENERAL_LAYOUT_NAV_COMPONENTS,
  ...DATA_ENTRY_UTILITY_COMPONENTS,
  ...DISPLAY_FEEDBACK_COMPONENTS,
];
