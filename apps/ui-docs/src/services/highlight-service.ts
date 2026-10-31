import "server-only";
import { codeToHtml } from "shiki";

/**
 * Server-only syntax highlighter utility powered by Shiki.
 * Generates pre-colored HTML code snippets at build/request time with zero client runtime.
 *
 * @param code - Raw code string to tokenize and highlight
 * @param lang - Target language (defaults to 'tsx')
 * @returns HTML string containing tokenized syntax spans
 */
export async function highlightCode(
  code: string,
  lang: string = "tsx",
): Promise<string> {
  try {
    return await codeToHtml(code.trim(), {
      lang,
      theme: "github-dark",
    });
  } catch {
    const escaped = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return `<pre class="shiki"><code>${escaped}</code></pre>`;
  }
}
