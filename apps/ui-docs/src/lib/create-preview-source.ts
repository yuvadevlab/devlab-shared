import type { ReactNode } from "react";
import {
  getFallbackImportModule,
  serializePreviewNode,
  type ExampleImportCollector,
} from "@/lib/serialize-preview-node";

/**
 * Builds a complete React example from the exact rendered preview and its data.
 *
 * Existing authored modules are retained; JSX fragments are generated from the
 * preview tree so the displayed code stays aligned with what the user sees.
 *
 * @param preview - React tree displayed in the component example.
 * @param authoredSource - Existing source, retained when it is already a module.
 * @returns Complete copyable React source for the example.
 */
export function createPreviewSource(
  preview: ReactNode,
  authoredSource: string,
): string {
  if (
    /^\s*["']use client["'];[\s\S]*\bexport\s+default\b/.test(authoredSource)
  ) {
    return authoredSource;
  }

  const imports = new Map<string, Set<string>>();
  const addImport: ExampleImportCollector = (moduleName, name) => {
    const names = imports.get(moduleName) ?? new Set<string>();
    names.add(name);
    imports.set(moduleName, names);
  };
  const body = serializePreviewNode(preview, addImport);
  if (body === null) return wrapSnippet(authoredSource);

  const importLines = [...imports.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(
      ([moduleName, names]) =>
        `import { ${[...names].sort().join(", ")} } from "${moduleName}";`,
    );
  const renderedBody = `<>${body ? `\n${indent(body, 2)}\n` : ""}</>`;

  return `"use client";

${importLines.join("\n")}

export default function Example() {
  return (
${indent(renderedBody, 4)}
  );
}`;
}

function wrapSnippet(source: string): string {
  const sourceImports = source.match(/^\s*import[\s\S]*?;\s*/gm) ?? [];
  const withoutImports = source.replace(/^\s*import[\s\S]*?;\s*/gm, "").trim();
  const jsxStart = withoutImports.search(/<\/?[A-Z][A-Za-z0-9.]*(?:\s|>)/);
  const setup = jsxStart > 0 ? withoutImports.slice(0, jsxStart).trim() : "";
  const body =
    jsxStart >= 0 ? withoutImports.slice(jsxStart).trim() : withoutImports;
  const tags = [...body.matchAll(/<\/?([A-Z][A-Za-z0-9.]*)\b/g)].map(
    ([, name]) => name,
  );
  const namesByModule = new Map<string, Set<string>>();
  for (const name of tags) {
    const moduleName = getFallbackImportModule(name);
    const names = namesByModule.get(moduleName) ?? new Set<string>();
    names.add(name);
    namesByModule.set(moduleName, names);
  }
  const generatedImports = [...namesByModule.entries()].map(
    ([moduleName, names]) =>
      `import { ${[...names].sort().join(", ")} } from "${moduleName}";`,
  );
  const mergedImports = mergeNamedImports(sourceImports, generatedImports);
  const wrappedBody =
    body.startsWith("<") && !body.startsWith("<>") ? body : `<>${body}</>`;

  return `"use client";

${mergedImports.join("\n")}

export default function Example() {
${setup ? `${indent(setup, 2)}\n` : ""}
  return (
${indent(wrappedBody, 4)}
  );
}`;
}

function mergeNamedImports(
  sourceImports: string[],
  generatedImports: string[],
): string[] {
  const namedImports = new Map<string, Set<string>>();
  const otherImports: string[] = [];

  for (const statement of sourceImports) {
    const match = statement.match(
      /^\s*import\s*\{([^}]+)\}\s*from\s*(["'])([^"']+)\2;/s,
    );
    if (!match) {
      otherImports.push(statement.trim());
      continue;
    }

    const names = namedImports.get(match[3]) ?? new Set<string>();
    for (const item of match[1].split(",")) {
      if (item.trim()) names.add(item.trim());
    }
    namedImports.set(match[3], names);
  }

  for (const statement of generatedImports) {
    const match = statement.match(
      /^import\s*\{([^}]+)\}\s*from\s*(["'])([^"']+)\2;$/,
    );
    if (!match) continue;
    const names = namedImports.get(match[3]) ?? new Set<string>();
    for (const item of match[1].split(",")) {
      if (item.trim()) names.add(item.trim());
    }
    namedImports.set(match[3], names);
  }

  return [
    ...otherImports,
    ...[...namedImports.entries()].map(
      ([moduleName, names]) =>
        `import { ${[...names].sort().join(", ")} } from "${moduleName}";`,
    ),
  ];
}

function indent(source: string, spaces: number): string {
  const prefix = " ".repeat(spaces);
  return source
    .split("\n")
    .map((line) => `${prefix}${line}`)
    .join("\n");
}
