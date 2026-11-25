/**
 * @file apps/ui-storybook/.storybook/source-transform.ts
 * @description Normalizes CSF 3 `render` stories in Storybook Show Code into
 * copy-pasteable JSX or idiomatic React function components without stage wrappers.
 */

const STAGE_CLASS_RE =
  /^(dl-story-[\w-]+|dl-flex-(?:row|col)-gap-\d+|dl-items-\w+|p-\d+|flex|flex-col|gap-\d+)$/;

function dedent(block: string): string {
  const lines = block.replace(/^\n+|\s+$/g, "").split("\n");
  const indents = lines
    .filter((l) => l.trim().length > 0)
    .map((l) => l.match(/^\s*/)?.[0].length ?? 0);
  const minIndent = indents.length > 0 ? Math.min(...indents) : 0;
  return lines
    .map((l) => (l.length >= minIndent ? l.slice(minIndent) : l))
    .join("\n")
    .trim();
}

function extractBalancedSlice(
  text: string,
  startIdx: number,
  openChar: string,
  closeChar: string,
): { content: string; endIdx: number } | null {
  let depth = 0;
  let quote: string | null = null;
  for (let i = startIdx; i < text.length; i += 1) {
    const ch = text[i];
    const prev = i > 0 ? text[i - 1] : "";
    if (quote) {
      if (ch === quote && prev !== "\\") quote = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      quote = ch;
      continue;
    }
    if (ch === openChar) depth += 1;
    else if (ch === closeChar) {
      depth -= 1;
      if (depth === 0) {
        return { content: text.slice(startIdx + 1, i), endIdx: i };
      }
    }
  }
  return null;
}

function isStageOnlyDivOpen(openTag: string): boolean {
  const match = openTag.match(/^<div\s+className=(?:"([^"]*)"|'([^']*)')\s*>$/);
  if (!match) return false;
  const classes = (match[1] ?? match[2] ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return classes.length > 0 && classes.every((c) => STAGE_CLASS_RE.test(c));
}

function stripOuterStageWrapper(rawJsx: string): string {
  let current = dedent(rawJsx.replace(/;\s*$/, ""));
  if (current.startsWith("(")) {
    const parens = extractBalancedSlice(current, 0, "(", ")");
    if (parens && parens.endIdx === current.length - 1) {
      current = dedent(parens.content);
    }
  }
  const openEnd = current.indexOf(">");
  if (openEnd === -1) return current;
  const openTag = current.slice(0, openEnd + 1);
  if (!isStageOnlyDivOpen(openTag) || !current.endsWith("</div>")) {
    return current;
  }

  let depth = 0;
  const tagRe = /<\/?div\b[^>]*>/g;
  let match: RegExpExecArray | null;
  while ((match = tagRe.exec(current)) !== null) {
    if (match[0].startsWith("</div")) {
      depth -= 1;
      if (depth === 0 && match.index !== current.length - "</div>".length) {
        return current;
      }
    } else if (!match[0].endsWith("/>")) {
      depth += 1;
    }
  }
  if (depth !== 0) return current;

  return dedent(current.slice(openEnd + 1, current.length - "</div>".length));
}

function toComponentName(storyName?: string): string {
  if (!storyName) return "Example";
  const cleaned = storyName.replace(/[^A-Za-z0-9]+/g, " ").trim();
  const pascal = cleaned
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
  return pascal || "Example";
}

function formatBlockBody(blockBody: string, componentName: string): string {
  const cleaned = dedent(blockBody);
  const returnMatch = cleaned.match(/\breturn\s+([\s\S]*);?\s*$/);
  if (returnMatch && cleaned.startsWith("return")) {
    return stripOuterStageWrapper(returnMatch[1]);
  }

  if (returnMatch && returnMatch.index !== undefined) {
    const jsx = stripOuterStageWrapper(returnMatch[1]);
    const indentedJsx = jsx
      .split("\n")
      .map((line) => `    ${line}`)
      .join("\n");
    const prefix = dedent(cleaned.slice(0, returnMatch.index));
    const indentedPrefix = prefix
      ? prefix
          .split("\n")
          .map((line) => `  ${line}`)
          .join("\n") + "\n\n"
      : "";
    return `function ${componentName}() {\n${indentedPrefix}  return (\n${indentedJsx}\n  );\n}`;
  }

  const indentedBody = cleaned
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n");
  return `function ${componentName}() {\n${indentedBody}\n}`;
}

/**
 * Unwraps CSF 3 `{ render: () => ... }` wrappers and story stage `<div>` scaffolds
 * so Storybook's "Show code" outputs clean JSX or copy-pasteable React functions.
 */
export function transformStorySource(
  code: string,
  storyContext: { name?: string },
): string {
  const trimmed = code.trim();
  if (!trimmed.startsWith("{")) return code;

  const objectSlice = extractBalancedSlice(trimmed, 0, "{", "}");
  if (!objectSlice) return code;
  const innerObj = objectSlice.content.trim();

  const renderMatch = innerObj.match(
    /(?:^|[,\s])render\s*:\s*(?:\([^)]*\)|[A-Za-z0-9_$]+)\s*=>\s*/,
  );
  if (!renderMatch || renderMatch.index === undefined) return code;

  const bodyStart = renderMatch.index + renderMatch[0].length;
  const firstChar = innerObj[bodyStart];

  if (firstChar === "{") {
    const extracted = extractBalancedSlice(innerObj, bodyStart, "{", "}");
    if (!extracted) return code;
    return formatBlockBody(
      extracted.content,
      toComponentName(storyContext.name),
    );
  }

  if (firstChar === "(") {
    const extracted = extractBalancedSlice(innerObj, bodyStart, "(", ")");
    if (extracted) return stripOuterStageWrapper(extracted.content);
  }

  return stripOuterStageWrapper(innerObj.slice(bodyStart));
}
