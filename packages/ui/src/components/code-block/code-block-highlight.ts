/**
 * @file packages/ui/src/components/code-block/code-block-highlight.ts
 * @description Lightweight, zero-dependency syntax tokenizer for TSX, TypeScript,
 * JSON, SQL, CSS, and shell snippets.
 */

export type CodeTokenKind =
  | "plain"
  | "comment"
  | "string"
  | "keyword"
  | "type"
  | "function"
  | "tag"
  | "attr"
  | "number"
  | "operator";

/**
 * Single syntax-classified segment within a highlighted source line.
 */
export interface CodeToken {
  kind: CodeTokenKind;
  value: string;
}

const TS_KEYWORDS = new Set([
  "as",
  "async",
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "default",
  "delete",
  "else",
  "enum",
  "export",
  "extends",
  "false",
  "finally",
  "for",
  "from",
  "function",
  "if",
  "implements",
  "import",
  "in",
  "instanceof",
  "interface",
  "let",
  "new",
  "null",
  "of",
  "private",
  "protected",
  "public",
  "readonly",
  "return",
  "static",
  "switch",
  "throw",
  "true",
  "try",
  "type",
  "typeof",
  "undefined",
  "var",
  "void",
  "while",
  "yield",
]);

const SQL_KEYWORDS = new Set([
  "SELECT",
  "FROM",
  "WHERE",
  "AND",
  "OR",
  "NOT",
  "IN",
  "IS",
  "NULL",
  "AS",
  "ON",
  "JOIN",
  "LEFT",
  "RIGHT",
  "INNER",
  "GROUP",
  "BY",
  "ORDER",
  "LIMIT",
  "OFFSET",
  "INSERT",
  "INTO",
  "VALUES",
  "UPDATE",
  "SET",
  "DELETE",
  "COUNT",
  "SUM",
  "AVG",
  "DISTINCT",
  "DESC",
  "ASC",
]);

const BASH_KEYWORDS = new Set([
  "pnpm",
  "npm",
  "npx",
  "yarn",
  "git",
  "vercel",
  "turbo",
  "uv",
  "cd",
  "export",
  "echo",
]);

const TOKEN_PATTERN = new RegExp(
  [
    "(\\/\\*[\\s\\S]*?\\*\\/|\\/\\/[^\\n]*|--[^\\n]*|#[^\\n]*)",
    "(\"(?:\\\\.|[^\"\\\\])*\"|'(?:\\\\.|[^'\\\\])*'|`(?:\\\\.|[^`\\\\])*`)",
    "(<\\/?[A-Za-z][A-Za-z0-9.]*|\\/>)",
    "\\b(\\d+(?:\\.\\d+)?)\\b",
    "([A-Za-z_$][A-Za-z0-9_$]*)",
    "([{}()\\[\\].,:;?+\\-*/=<>!&|^~%]+)",
  ].join("|"),
  "g",
);

function classifyIdentifier(
  word: string,
  rest: string,
  lang: string,
): CodeTokenKind {
  const isSql = lang === "sql";
  const isShell = lang === "bash" || lang === "sh" || lang === "shell";

  if (isSql && SQL_KEYWORDS.has(word.toUpperCase())) return "keyword";
  if (isShell && BASH_KEYWORDS.has(word)) return "keyword";
  if (TS_KEYWORDS.has(word)) return "keyword";
  if (/^\s*=/.test(rest) && /^[a-z]/.test(word)) return "attr";
  if (/^\s*\(/.test(rest)) return "function";
  if (/^[A-Z]/.test(word)) return "type";
  return "plain";
}

function tokenizeLine(line: string, lang: string): CodeToken[] {
  const tokens: CodeToken[] = [];
  let cursor = 0;
  TOKEN_PATTERN.lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = TOKEN_PATTERN.exec(line)) !== null) {
    if (match.index > cursor) {
      tokens.push({ kind: "plain", value: line.slice(cursor, match.index) });
    }
    const [full, comment, str, tag, num, ident, op] = match;
    const after = line.slice(match.index + full.length);

    if (comment) tokens.push({ kind: "comment", value: comment });
    else if (str) {
      const isJsonKey = /^\s*:/.test(after);
      tokens.push({ kind: isJsonKey ? "attr" : "string", value: str });
    } else if (tag) tokens.push({ kind: "tag", value: tag });
    else if (num) tokens.push({ kind: "number", value: num });
    else if (ident) {
      tokens.push({
        kind: classifyIdentifier(ident, after, lang),
        value: ident,
      });
    } else if (op) tokens.push({ kind: "operator", value: op });

    cursor = match.index + full.length;
  }

  if (cursor < line.length) {
    tokens.push({ kind: "plain", value: line.slice(cursor) });
  }
  return tokens;
}

/**
 * Splits a source snippet into lines of syntax-classified tokens.
 *
 * @param code - Raw source code string.
 * @param language - Optional language hint (`tsx`, `typescript`, `json`, `sql`, `bash`).
 * @returns Array of token arrays, one per source line.
 */
export function tokenizeCodeLines(
  code: string,
  language = "tsx",
): CodeToken[][] {
  const normalizedLang = language.toLowerCase();
  return code
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => tokenizeLine(line, normalizedLang));
}
