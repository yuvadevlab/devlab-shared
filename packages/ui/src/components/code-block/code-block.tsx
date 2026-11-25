import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { tokenizeCodeLines, type CodeToken } from "./code-block-highlight";
import {
  CodeBlockProps,
  CodeBlockHeaderProps,
  CodeBlockContentProps,
} from "./code-block-types";

export {
  tokenizeCodeLines,
  type CodeToken,
  type CodeTokenKind,
} from "./code-block-highlight";
export type { CodeBlockProps, CodeBlockHeaderProps, CodeBlockContentProps };

/**
 * Renders an array of syntax tokens as colorized spans inside a code line.
 */
export function renderHighlightedTokens(tokens: CodeToken[]): React.ReactNode {
  return tokens.map((token, idx) =>
    token.kind === "plain" ? (
      <React.Fragment key={idx}>{token.value}</React.Fragment>
    ) : (
      <span key={idx} className={`dl-tok--${token.kind}`}>
        {token.value}
      </span>
    ),
  );
}

/**
 * Copy to clipboard button with temporary success checkmark animation.
 */
export const CodeBlockCopyButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { code?: string }
>(({ className, code = "", onClick, ...props }, ref) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!code) return;
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy code"}
      className={cn("dl-code-block__copy-btn", className)}
      {...props}
    >
      {copied ? (
        <Check
          className="dl-code-block__copy-icon dl-code-block__copy-icon--ok"
          aria-hidden="true"
        />
      ) : (
        <Copy className="dl-code-block__copy-icon" aria-hidden="true" />
      )}
    </button>
  );
});
CodeBlockCopyButton.displayName = "CodeBlockCopyButton";

/**
 * Header section of a code block showing filename, language badge, and actions.
 */
export const CodeBlockHeader = React.forwardRef<
  HTMLDivElement,
  CodeBlockHeaderProps
>(({ className, filename, language, children, ...props }, ref) => (
  <div ref={ref} className={cn("dl-code-block__header", className)} {...props}>
    <div className="dl-code-block__header-meta">
      {filename && <span className="dl-code-block__filename">{filename}</span>}
      {language && <span className="dl-code-block__language">{language}</span>}
    </div>
    <div className="dl-code-block__header-actions">{children}</div>
  </div>
));
CodeBlockHeader.displayName = "CodeBlockHeader";

/**
 * Code container pre element supporting syntax highlighting, optional line numbers,
 * and horizontal scrolling or wrapping.
 */
export const CodeBlockContent = React.forwardRef<
  HTMLPreElement,
  CodeBlockContentProps
>(
  (
    {
      className,
      language = "tsx",
      wrap = false,
      lineNumbers = false,
      children,
      ...props
    },
    ref,
  ) => {
    const rawText = typeof children === "string" ? children : null;
    const tokenLines = React.useMemo(
      () =>
        rawText !== null
          ? tokenizeCodeLines(rawText.trimEnd(), language)
          : null,
      [rawText, language],
    );

    return (
      <pre
        ref={ref}
        className={cn(
          "dl-code-block__content",
          wrap && "dl-code-block__content--wrap",
          className,
        )}
        {...props}
      >
        {tokenLines ? (
          <code className="dl-code-block__code">
            {tokenLines.map((tokens, idx) => (
              <span key={idx} className="dl-code-block__line">
                {lineNumbers && (
                  <span className="dl-code-block__line-num">{idx + 1}</span>
                )}
                <span className="dl-code-block__line-text">
                  {tokens.length > 0 ? renderHighlightedTokens(tokens) : " "}
                </span>
              </span>
            ))}
          </code>
        ) : (
          <code>{children}</code>
        )}
      </pre>
    );
  },
);
CodeBlockContent.displayName = "CodeBlockContent";

/**
 * Enterprise code snippet display with client-side syntax highlighting, optional header,
 * copy button, and line numbers.
 *
 * @example
 * ```tsx
 * <CodeBlock code="const a = 10;" language="typescript" filename="main.ts" />
 * ```
 */
export const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  (
    {
      className,
      filename,
      language,
      code,
      copyable = true,
      lineNumbers = false,
      children,
      ...props
    },
    ref,
  ) => {
    const codeString = code ?? (typeof children === "string" ? children : "");

    return (
      <div ref={ref} className={cn("dl-code-block", className)} {...props}>
        {(filename || language || copyable) && (
          <CodeBlockHeader filename={filename} language={language}>
            {copyable && <CodeBlockCopyButton code={codeString} />}
          </CodeBlockHeader>
        )}
        <CodeBlockContent language={language} lineNumbers={lineNumbers}>
          {code ?? children}
        </CodeBlockContent>
      </div>
    );
  },
);
CodeBlock.displayName = "CodeBlock";
