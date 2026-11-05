import { Fragment, isValidElement, type ReactNode } from "react";

type JSXProps = Record<string, unknown> & { children?: ReactNode };

/** Callback for collecting a named import required by a preview source. */
export type ExampleImportCollector = (moduleName: string, name: string) => void;

const externalComponentModules: Record<string, string> = {
  Area: "recharts",
  AreaChart: "recharts",
  Bar: "recharts",
  BarChart: "recharts",
  CartesianGrid: "recharts",
  Cell: "recharts",
  Line: "recharts",
  LineChart: "recharts",
  Pie: "recharts",
  PieChart: "recharts",
  ResponsiveContainer: "recharts",
  XAxis: "recharts",
  YAxis: "recharts",
};

const iconNames = new Set(
  `Activity AlertCircle AlertTriangle AlignCenter AlignJustify AlignLeft AlignRight ArrowRight BarChart Bold Calculator Calendar CalendarDays CheckCircle ChevronDown ChevronsUpDown Cpu Database Eye EyeOff Home Inbox Info Italic Layers Mail Menu MessageSquare Package PanelBottom RefreshCw Search Send Settings ShieldAlert ShieldCheck Sliders SlidersHorizontal Smile Sparkles Terminal Trash2 TrendingUp Underline User Zap`.split(
    " ",
  ),
);

/**
 * Converts a rendered React tree to JSX and collects its component imports.
 *
 * @param node - Rendered child or component preview.
 * @param addImport - Receives each component import needed by the JSX output.
 * @returns JSX source, or null when the tree contains unsupported render props.
 */
export function serializePreviewNode(
  node: ReactNode,
  addImport: ExampleImportCollector,
): string | null {
  return renderNode(node, addImport);
}

/**
 * Returns a likely source module for a component name in a fallback snippet.
 *
 * @param name - JSX component identifier.
 * @returns Source module that exports the component.
 */
export function getFallbackImportModule(name: string): string {
  if (externalComponentModules[name]) return externalComponentModules[name];
  return iconNames.has(name) ? "lucide-react" : "@yuva-devlab/ui";
}

function renderNode(
  node: ReactNode,
  addImport: ExampleImportCollector,
): string | null {
  if (node === null || node === undefined || typeof node === "boolean") {
    return "";
  }
  if (typeof node === "string") {
    if (!node.trim()) return `{${JSON.stringify(node)}}`;
    return node === node.trim()
      ? escapeText(node)
      : `{${JSON.stringify(node)}}`;
  }
  if (typeof node === "number") return `{${node}}`;
  if (Array.isArray(node)) {
    const rendered = node.map((child) => renderNode(child, addImport));
    if (rendered.some((child) => child === null)) return null;
    return rendered.filter(Boolean).join("\n");
  }
  if (!isValidElement(node)) return null;

  const { type } = node;
  if (type === Fragment) {
    const children = renderNode((node.props as JSXProps).children, addImport);
    return children === null
      ? null
      : `<>${children ? `\n${indent(children, 2)}\n` : ""}</>`;
  }

  const props = node.props as JSXProps;
  const tagName = typeof type === "string" ? type : getComponentName(type);
  if (!tagName) return null;
  if (typeof type !== "string") {
    addImport(getComponentModule(type, tagName), tagName);
  }

  const attributes = renderProps(props, addImport);
  const children = renderNode(props.children, addImport) ?? "";
  if (!children) return `<${tagName}${attributes} />`;
  return `<${tagName}${attributes}>\n${indent(children, 2)}\n</${tagName}>`;
}

function renderProps(
  props: JSXProps,
  addImport: ExampleImportCollector,
): string {
  const attributes: string[] = [];
  for (const [originalName, value] of Object.entries(props)) {
    if (
      originalName === "children" ||
      originalName === "key" ||
      originalName === "ref" ||
      originalName.startsWith("on") ||
      value === undefined
    ) {
      continue;
    }
    if (typeof value === "function") continue;

    const name =
      originalName === "value" && props.onChange
        ? "defaultValue"
        : originalName === "checked" && props.onCheckedChange
          ? "defaultChecked"
          : originalName === "open" && props.onOpenChange
            ? "defaultOpen"
            : originalName;
    const renderedValue = renderPropValue(value, addImport);
    if (renderedValue === null) continue;
    attributes.push(
      renderedValue === "" ? ` ${name}` : ` ${name}=${renderedValue}`,
    );
  }
  return attributes.join("");
}

function renderPropValue(
  value: unknown,
  addImport: ExampleImportCollector,
): string | null {
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") {
    return `{${value}}`;
  }
  if (value instanceof Date) {
    return `{new Date(${JSON.stringify(value.toISOString())})}`;
  }
  if (Array.isArray(value)) {
    const items = value.map((item) => renderPropValue(item, addImport));
    return items.some((item) => item === null)
      ? null
      : `{[${items.join(", ")}]}`;
  }
  if (isValidElement(value)) {
    const element = renderNode(value, addImport);
    return element === null ? null : `{${element}}`;
  }
  if (value && typeof value === "object") {
    try {
      return `{${JSON.stringify(value)}}`;
    } catch {
      return null;
    }
  }
  return null;
}

function getComponentModule(type: unknown, name: string): string {
  if (isLucideIcon(type, name)) return "lucide-react";
  return externalComponentModules[name] ?? "@yuva-devlab/ui";
}

function isLucideIcon(type: unknown, name: string): boolean {
  if (!iconNames.has(name)) return false;
  if (name === "Calendar") return typeof type !== "function";
  if (name === "Terminal" || name === "BarChart") {
    return getLucideRender(type) !== null;
  }
  return true;
}

function getComponentName(type: unknown): string | null {
  if (typeof type === "function") {
    const displayName = Reflect.get(type, "displayName");
    return typeof displayName === "string" ? displayName : type.name || null;
  }
  if (type && typeof type === "object" && "displayName" in type) {
    const displayName = type.displayName;
    return typeof displayName === "string" ? displayName : null;
  }
  return null;
}

function getLucideRender(type: unknown): string | null {
  if (!type || typeof type !== "object" || !("render" in type)) return null;
  const render = type.render;
  return typeof render === "function" && render.toString().includes("iconNode")
    ? render.toString()
    : null;
}

function indent(source: string, spaces: number): string {
  const prefix = " ".repeat(spaces);
  return source
    .split("\n")
    .map((line) => `${prefix}${line}`)
    .join("\n");
}

function escapeText(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
