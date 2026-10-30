import type { ComponentMeta } from "./meta-types";

export const DISPLAY_FEEDBACK_COMPONENTS: ComponentMeta[] = [
  // Data Display
  {
    name: "Accordion",
    slug: "accordion",
    href: "/components/accordion",
    category: "Data Display",
    description:
      "Vertically stacked interactive disclosure headings with expand/collapse.",
    keywords: ["collapse", "expand", "disclosure", "faq", "accordion"],
  },
  {
    name: "Avatar",
    slug: "avatar",
    href: "/components/avatar",
    category: "Data Display",
    description:
      "Visual representation of a user profile with image and fallback initials.",
    keywords: ["user", "image", "profile", "picture", "photo"],
  },
  {
    name: "Badge",
    slug: "badge",
    href: "/components/badge",
    category: "Data Display",
    description:
      "Compact badge tag for status, counter indicators, or categories.",
    keywords: ["tag", "pill", "chip", "counter", "badge"],
  },
  {
    name: "Card",
    slug: "card",
    href: "/components/card",
    category: "Data Display",
    description:
      "Flexible content card container with header, content, and footer slots.",
    keywords: ["box", "container", "panel", "card"],
  },
  {
    name: "Carousel",
    slug: "carousel",
    href: "/components/carousel",
    category: "Data Display",
    description:
      "Motion-ready slideshow carousel with touch gesture navigation.",
    keywords: ["slider", "slideshow", "gallery", "swiper", "carousel"],
  },
  {
    name: "Chart",
    slug: "chart",
    href: "/components/chart",
    category: "Data Display",
    description:
      "Theme-aware Recharts visualization container with CSS tokens.",
    keywords: ["graph", "recharts", "bar", "line", "analytics", "plot"],
  },
  {
    name: "Collapsible",
    slug: "collapsible",
    href: "/components/collapsible",
    category: "Data Display",
    description:
      "Expandable disclosure section container for hiding secondary content.",
    keywords: ["toggle", "expand", "hide", "show", "details"],
  },
  {
    name: "Hover Card",
    slug: "hover-card",
    href: "/components/hover-card",
    category: "Data Display",
    description:
      "Preview popover card revealed when hovering over a trigger link.",
    keywords: ["preview", "tooltip", "popover", "card", "hover"],
  },
  {
    name: "Loading State",
    slug: "loading-state",
    href: "/components/loading-state",
    category: "Data Display",
    description:
      "Visual spinner or skeleton placeholder indicating async background tasks.",
    keywords: ["spinner", "loader", "busy", "progress", "waiting"],
  },
  {
    name: "Metric Card",
    slug: "metric-card",
    href: "/components/metric-card",
    category: "Data Display",
    description:
      "KPI metric summary card displaying values, trends, and change rates.",
    keywords: ["kpi", "stat", "analytics", "trend", "dashboard", "metric"],
  },
  {
    name: "Popover",
    slug: "popover",
    href: "/components/popover",
    category: "Data Display",
    description:
      "Rich interactive floating popover positioned relative to anchor.",
    keywords: ["floating", "flyout", "popup", "anchor"],
  },
  {
    name: "Secret Reveal Card",
    slug: "secret-reveal-card",
    href: "/components/secret-reveal-card",
    category: "Data Display",
    description:
      "Interactive card for masking and revealing sensitive tokens and API keys.",
    keywords: ["api-key", "token", "mask", "password", "secret", "reveal"],
  },
  {
    name: "Status Badge",
    slug: "status-badge",
    href: "/components/status-badge",
    category: "Data Display",
    description:
      "Live agent status indicator badge with animated pulsing ping beacon.",
    keywords: ["beacon", "online", "live", "agent", "health", "pulse"],
  },
  {
    name: "Status Chip",
    slug: "status-chip",
    href: "/components/status-chip",
    category: "Data Display",
    description:
      "Compact semantic status tag with dot indicator and state variants.",
    keywords: ["chip", "pill", "state", "dot", "tag"],
  },
  {
    name: "Table",
    slug: "table",
    href: "/components/table",
    category: "Data Display",
    description:
      "Tabular dataset presentation with hover states and column borders.",
    keywords: ["grid", "data", "rows", "columns", "table"],
  },
  {
    name: "Tooltip",
    slug: "tooltip",
    href: "/components/tooltip",
    category: "Data Display",
    description:
      "Contextual popup displaying assistive text when hovering or focusing an element.",
    keywords: ["hint", "hover", "popup", "tooltip"],
  },

  // Feedback & Overlays
  {
    name: "Alert",
    slug: "alert",
    href: "/components/alert",
    category: "Feedback & Overlays",
    description:
      "Prominent callout banner for system notifications, warnings, and errors.",
    keywords: ["banner", "warning", "error", "info", "notice"],
  },
  {
    name: "Alert Dialog",
    slug: "alert-dialog",
    href: "/components/alert-dialog",
    category: "Feedback & Overlays",
    description:
      "Modal dialog interrupting workflow to require critical confirmation.",
    keywords: ["modal", "confirm", "warning", "destructive", "prompt"],
  },
  {
    name: "Confirm Dialog",
    slug: "confirm-dialog",
    href: "/components/confirm-dialog",
    category: "Feedback & Overlays",
    description:
      "Simplified confirmation modal wrapper for destructive actions.",
    keywords: ["confirm", "prompt", "dialog", "action", "modal"],
  },
  {
    name: "Dialog",
    slug: "dialog",
    href: "/components/dialog",
    category: "Feedback & Overlays",
    description:
      "Standard modal window overlay for user workflows and detailed forms.",
    keywords: ["modal", "popup", "window", "dialog"],
  },
  {
    name: "Drawer",
    slug: "drawer",
    href: "/components/drawer",
    category: "Feedback & Overlays",
    description:
      "Bottom-sheet modal drawer with gesture dragging for mobile viewports.",
    keywords: ["sheet", "mobile", "bottom-sheet", "drag", "drawer"],
  },
  {
    name: "Progress",
    slug: "progress",
    href: "/components/progress",
    category: "Feedback & Overlays",
    description: "Visual linear progress bar indicating completion percentage.",
    keywords: ["loading", "bar", "percent", "progress"],
  },
  {
    name: "Sheet",
    slug: "sheet",
    href: "/components/sheet",
    category: "Feedback & Overlays",
    description: "Off-canvas sliding side panel emerging from screen edges.",
    keywords: ["slideout", "drawer", "sidebar", "panel", "sheet"],
  },
  {
    name: "Skeleton",
    slug: "skeleton",
    href: "/components/skeleton",
    category: "Feedback & Overlays",
    description:
      "Pulsing placeholder shape simulating content while asynchronously loading.",
    keywords: ["placeholder", "loader", "ghost", "shimmer", "skeleton"],
  },
  {
    name: "Toaster",
    slug: "toaster",
    href: "/components/toaster",
    category: "Feedback & Overlays",
    description:
      "Toast notification manager powered by Sonner with action support.",
    keywords: ["toast", "notification", "snack", "sonner", "toaster"],
  },
];
