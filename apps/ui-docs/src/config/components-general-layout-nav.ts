import type { ComponentMeta } from "@/config/meta-types";

export const GENERAL_LAYOUT_NAV_COMPONENTS: ComponentMeta[] = [
  // General
  {
    name: "Button",
    slug: "button",
    href: "/components/button",
    category: "General",
    description: "Primary interactive trigger for forms, dialogs, and actions.",
    keywords: ["btn", "click", "action", "trigger", "press"],
  },
  {
    name: "Copy Button",
    slug: "copy-button",
    href: "/components/copy-button",
    category: "General",
    description: "One-click clipboard copy button with visual state feedback.",
    keywords: ["clipboard", "copy", "paste", "duplicate"],
  },
  {
    name: "Heading",
    slug: "heading",
    href: "/components/heading",
    category: "General",
    description:
      "Accessible heading primitive decoupling semantic hierarchy from visual size.",
    keywords: ["title", "h1", "h2", "h3", "heading", "typography", "header"],
  },
  {
    name: "Text",
    slug: "text",
    href: "/components/text",
    category: "General",
    description:
      "Multi-variant text primitive for body copy, captions, code, and metrics.",
    keywords: [
      "paragraph",
      "text",
      "body",
      "caption",
      "code",
      "metric",
      "typography",
    ],
  },
  {
    name: "Heading",
    slug: "heading",
    href: "/components/heading",
    category: "General",
    description:
      "Accessible heading primitive decoupling semantic hierarchy from visual size.",
    keywords: ["title", "h1", "h2", "h3", "heading", "typography", "header"],
  },
  {
    name: "Text",
    slug: "text",
    href: "/components/text",
    category: "General",
    description:
      "Multi-variant text primitive for body copy, captions, code, and metrics.",
    keywords: [
      "paragraph",
      "text",
      "body",
      "caption",
      "code",
      "metric",
      "typography",
    ],
  },

  // Layout
  {
    name: "Box",
    slug: "box",
    href: "/components/box",
    category: "Layout",
    description:
      "Primitive bounding container for padding, borders, shadows, and token surfaces.",
    keywords: ["box", "container", "surface", "padding", "border"],
  },
  {
    name: "Flex",
    slug: "flex",
    href: "/components/flex",
    category: "Layout",
    description:
      "Polymorphic 1D flex container with alignment, direction, wrapping, and token gaps.",
    keywords: ["flex", "flexbox", "row", "col", "align", "justify", "wrap"],
  },
  {
    name: "Stack",
    slug: "stack",
    href: "/components/stack",
    category: "Layout",
    description:
      "High-velocity vertical or horizontal content flow with token-governed spacing.",
    keywords: ["stack", "vertical", "column", "flow", "gap", "spacing"],
  },
  {
    name: "Grid",
    slug: "grid",
    href: "/components/grid",
    category: "Layout",
    description:
      "Responsive 2D grid layout supporting uniform columns and auto-fit column widths.",
    keywords: ["grid", "columns", "rows", "responsive", "2d"],
  },
  {
    name: "Container",
    slug: "container",
    href: "/components/container",
    category: "Layout",
    description:
      "Centered max-width content boundary with responsive breakpoint thresholds.",
    keywords: ["container", "max-width", "center", "layout", "wrapper"],
  },
  {
    name: "Aspect Ratio",
    slug: "aspect-ratio",
    href: "/components/aspect-ratio",
    category: "Layout",
    description:
      "Maintains consistent aspect ratios for responsive media and embeds.",
    keywords: ["media", "image", "video", "ratio", "embed"],
  },
  {
    name: "Panel",
    slug: "panel",
    href: "/components/panel",
    category: "Layout",
    description:
      "Container card for structured dashboard sections, sidebars, and grouped content.",
    keywords: ["section", "container", "box", "dashboard"],
  },
  {
    name: "Resizable",
    slug: "resizable",
    href: "/components/resizable",
    category: "Layout",
    description: "Accessible resizable panel layout groups with drag handles.",
    keywords: ["split", "pane", "drag", "resize", "dock", "handle"],
  },
  {
    name: "Scroll Area",
    slug: "scroll-area",
    href: "/components/scroll-area",
    category: "Layout",
    description: "Custom scrollable area with cross-browser themed scrollbars.",
    keywords: ["scroll", "overflow", "scrollbar", "custom-scroll"],
  },
  {
    name: "Separator",
    slug: "separator",
    href: "/components/separator",
    category: "Layout",
    description: "Visual or semantic divider between interface elements.",
    keywords: ["divider", "rule", "line", "hr", "split"],
  },

  // Navigation
  {
    name: "Breadcrumb",
    slug: "breadcrumb",
    href: "/components/breadcrumb",
    category: "Navigation",
    description:
      "Hierarchical trail of navigation links indicating current page location.",
    keywords: ["nav", "path", "trail", "hierarchy", "crumb"],
  },
  {
    name: "Dropdown Menu",
    slug: "dropdown-menu",
    href: "/components/dropdown-menu",
    category: "Navigation",
    description:
      "Menu triggered by a button displaying a list of options or actions.",
    keywords: ["menu", "popup", "action", "context", "dropdown"],
  },
  {
    name: "Menubar",
    slug: "menubar",
    href: "/components/menubar",
    category: "Navigation",
    description:
      "Desktop application-style horizontal menubar with nested dropdowns.",
    keywords: ["menu", "toolbar", "desktop", "file", "menubar"],
  },
  {
    name: "Navigation Menu",
    slug: "navigation-menu",
    href: "/components/navigation-menu",
    category: "Navigation",
    description:
      "Accessible top-level site navigation menu with rich flyout panels.",
    keywords: ["navbar", "mega-menu", "site-nav", "navigation"],
  },
  {
    name: "Pagination",
    slug: "pagination",
    href: "/components/pagination",
    category: "Navigation",
    description:
      "Navigation controls for multi-page datasets and search results.",
    keywords: ["page", "prev", "next", "paginate", "pages"],
  },
  {
    name: "Sidebar",
    slug: "sidebar",
    href: "/components/sidebar",
    category: "Navigation",
    description:
      "Collapsible application sidebar layout with responsive mobile support.",
    keywords: ["nav", "drawer", "aside", "dock", "sidebar"],
  },
  {
    name: "Tabs",
    slug: "tabs",
    href: "/components/tabs",
    category: "Navigation",
    description:
      "Segmented content switcher organizing views within a single container.",
    keywords: ["tab", "switch", "segment", "view"],
  },
];
