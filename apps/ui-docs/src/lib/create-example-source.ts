/**
 * Options for building a copyable, complete React example.
 */
export interface ExampleSourceOptions {
  /** Additional imports for React hooks, icons, or other application code. */
  externalImports?: string[];
  /** Named imports from the DevLab UI package. */
  imports: string[];
  /** Optional declarations placed inside the example component. */
  setup?: string;
  /** JSX returned by the example component. */
  body: string;
}

/**
 * Formats a runnable React component example with imports and optional setup.
 */
export function createExampleSource({
  externalImports = [],
  imports,
  setup,
  body,
}: ExampleSourceOptions): string {
  const indent = (value: string, spaces: number) =>
    value
      .split("\n")
      .map((line) => `${" ".repeat(spaces)}${line}`)
      .join("\n");
  const setupBlock = setup ? `\n${indent(setup, 2)}\n` : "\n";

  return `"use client";

${[
  ...externalImports,
  `import { ${imports.join(", ")} } from "@yuva-devlab/ui";`,
].join("\n")}

export default function Example() {${setupBlock}  return (
${indent(body, 4)}
  );
}`;
}
