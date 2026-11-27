/**
 * @file packages/agent-core/src/harness/tool-plan-filter.ts
 * @description Streaming filter that strips `<tool_plan>` and `<tool_call>` XML wrappers from visible token streams.
 * @module @yuva-devlab/agent-core/harness/tool-plan-filter
 */

/** Opening tag for XML-wrapped tool plan blocks. */
export const TOOL_PLAN_OPEN = "<tool_plan>";
/** Closing tag for XML-wrapped tool plan blocks. */
export const TOOL_PLAN_CLOSE = "</tool_plan>";
/** Opening tag for XML-wrapped single tool call blocks. */
export const TOOL_CALL_OPEN = "<tool_call>";
/** Closing tag for XML-wrapped single tool call blocks. */
export const TOOL_CALL_CLOSE = "</tool_call>";

function partialSuffixLength(text: string, tag: string): number {
  const max = Math.min(text.length, tag.length - 1);
  for (let len = max; len >= 1; len--) {
    if (text.endsWith(tag.slice(0, len))) return len;
  }
  return 0;
}

/**
 * Strips any complete or orphan `<tool_plan>` / `<tool_call>` tags from text.
 *
 * @param text - Raw model text output.
 * @returns Sanitized user-visible text.
 */
export function stripToolPlanTags(text: string): string {
  return text
    .replace(/<tool_plan>[\s\S]*?<\/tool_plan>/gi, "")
    .replace(/<tool_call>[\s\S]*?<\/tool_call>/gi, "")
    .replace(/<\/?(?:tool_plan|tool_call)>/gi, "")
    .trim();
}

/**
 * Streaming filter that hides `<tool_plan>…</tool_plan>` and `<tool_call>…</tool_call>`
 * blocks (and partial opening or orphan closing tags) from the user-visible token stream.
 */
export class ToolPlanStreamFilter {
  private buffer = "";
  private suppressingTag: string | null = null;

  /**
   * Processes one streamed delta and returns only safe user-visible characters.
   *
   * @param text - Incoming token or reasoning delta.
   * @returns Safe visible substring to forward to the client.
   */
  push(text: string): string {
    this.buffer += text;
    let visible = "";

    for (;;) {
      if (!this.suppressingTag) {
        const candidates: Array<{
          idx: number;
          open: string;
          close: string | null;
        }> = [
          {
            idx: this.buffer.indexOf(TOOL_PLAN_OPEN),
            open: TOOL_PLAN_OPEN,
            close: TOOL_PLAN_CLOSE,
          },
          {
            idx: this.buffer.indexOf(TOOL_CALL_OPEN),
            open: TOOL_CALL_OPEN,
            close: TOOL_CALL_CLOSE,
          },
          {
            idx: this.buffer.indexOf(TOOL_PLAN_CLOSE),
            open: TOOL_PLAN_CLOSE,
            close: null,
          },
          {
            idx: this.buffer.indexOf(TOOL_CALL_CLOSE),
            open: TOOL_CALL_CLOSE,
            close: null,
          },
        ].filter((c) => c.idx !== -1);

        if (candidates.length === 0) {
          const keep = Math.max(
            partialSuffixLength(this.buffer, TOOL_PLAN_OPEN),
            partialSuffixLength(this.buffer, TOOL_CALL_OPEN),
            partialSuffixLength(this.buffer, TOOL_PLAN_CLOSE),
            partialSuffixLength(this.buffer, TOOL_CALL_CLOSE),
          );
          const emitLength = this.buffer.length - keep;
          if (emitLength > 0) {
            visible += this.buffer.slice(0, emitLength);
            this.buffer = this.buffer.slice(emitLength);
          }
          return visible;
        }

        candidates.sort((a, b) => a.idx - b.idx);
        const earliest = candidates[0];

        visible += this.buffer.slice(0, earliest.idx);
        this.buffer = this.buffer.slice(earliest.idx + earliest.open.length);
        if (earliest.close) {
          this.suppressingTag = earliest.close;
        }
      } else {
        const close = this.buffer.indexOf(this.suppressingTag);
        if (close === -1) {
          const keep = partialSuffixLength(this.buffer, this.suppressingTag);
          this.buffer = this.buffer.slice(this.buffer.length - keep);
          return visible;
        }
        this.buffer = this.buffer.slice(close + this.suppressingTag.length);
        this.suppressingTag = null;
      }
    }
  }

  /**
   * Emits any remaining buffered text at the end of the stream.
   *
   * @returns Flushed visible remainder.
   */
  flush(): string {
    if (this.suppressingTag) {
      this.buffer = "";
      return "";
    }
    const out = stripToolPlanTags(this.buffer);
    this.buffer = "";
    return out;
  }
}
