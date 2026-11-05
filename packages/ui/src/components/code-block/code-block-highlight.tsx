import type { ReactNode } from "react";

type CodeTokenKind =
  | "comment"
  | "string"
  | "keyword"
  | "number"
  | "tag"
  | "attribute"
  | "function";

const KEYWORDS = new Set(
  "any as asserts async await boolean break case catch class const continue declare default delete do else export extends finally for from function get if implements import in infer instanceof is keyof let never new number of readonly return satisfies set static string super switch throw try type typeof unknown var void while yield".split(
    " ",
  ),
);
const CONSTANTS = new Set(["false", "null", "true", "undefined", "NaN"]);
const SQL_KEYWORDS = new Set(
  "alter and as asc begin by case commit create cross delete desc distinct drop else end except exists from full group having inner insert into join left limit not null offset on or order outer right rollback select set table then union update values where".split(
    " ",
  ),
);
const TOKEN_PATTERN =
  /(?:\/\/[^\n]*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|<\/?[A-Za-z][\w.$:-]*|\/?>|[A-Za-z_$][\w$]*|\b\d+(?:\.\d+)?\b)/g;

/**
 * Renders code with GitHub Dark-inspired syntax colors without a highlighter dependency.
 *
 * @param source - One source line from the code block.
 * @param language - Language label used to select language-specific tokens.
 * @param setTagState - Updates whether the scanner remains inside a JSX tag.
 * @param startsInsideTag - Whether the previous line ended inside a JSX tag.
 * @returns Text and colored token spans preserving the input exactly.
 */
export function highlightCodeLine(
  source: string,
  language: string,
  setTagState: (inTag: boolean) => void,
  startsInsideTag: boolean,
): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let inTag = startsInsideTag;
  let match: RegExpExecArray | null;
  const normalizedLanguage = language.toLowerCase();
  TOKEN_PATTERN.lastIndex = 0;

  while ((match = TOKEN_PATTERN.exec(source))) {
    const token = match[0];
    if (match.index > cursor) {
      nodes.push(source.slice(cursor, match.index));
    }

    let kind: CodeTokenKind | undefined;
    if (token.startsWith("//") || token.startsWith("/*")) {
      kind = "comment";
    } else if (/^["'`]/.test(token)) {
      const isJsonKey =
        normalizedLanguage === "json" &&
        source.slice(TOKEN_PATTERN.lastIndex).trimStart().startsWith(":");
      kind = isJsonKey ? "attribute" : "string";
    } else if (/^<\/?[A-Za-z]/.test(token)) {
      kind = "tag";
      inTag = true;
    } else if (token === ">" || token === "/>") {
      nodes.push(token);
      inTag = false;
      cursor = TOKEN_PATTERN.lastIndex;
      continue;
    } else if (/^\d/.test(token)) {
      kind = "number";
    } else if (inTag) {
      kind = "attribute";
    } else if (
      normalizedLanguage === "sql" &&
      SQL_KEYWORDS.has(token.toLowerCase())
    ) {
      kind = "keyword";
    } else if (
      (normalizedLanguage === "css" || normalizedLanguage === "scss") &&
      source.slice(TOKEN_PATTERN.lastIndex).trimStart().startsWith(":")
    ) {
      kind = "attribute";
    } else if (KEYWORDS.has(token)) {
      kind = "keyword";
    } else if (CONSTANTS.has(token)) {
      kind = "number";
    } else {
      const next = source.slice(TOKEN_PATTERN.lastIndex).match(/^\s*(.)/)?.[1];
      if (next === "(") kind = "function";
    }

    nodes.push(
      kind ? (
        <span key={match.index} className={`dl-code-block__token--${kind}`}>
          {token}
        </span>
      ) : (
        token
      ),
    );
    cursor = TOKEN_PATTERN.lastIndex;
  }

  if (cursor < source.length) nodes.push(source.slice(cursor));
  setTagState(inTag);
  return nodes;
}
