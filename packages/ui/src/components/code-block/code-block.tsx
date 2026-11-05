import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { highlightCodeLine } from "./code-block-highlight";
import {
  CodeBlockProps,
  CodeBlockHeaderProps,
  CodeBlockContentProps,
} from "./code-block-types";

export type { CodeBlockProps, CodeBlockHeaderProps, CodeBlockContentProps };

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
        <Check className="size-4 text-success" />
      ) : (
        <Copy className="size-4" />
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
    <div className="flex items-center gap-2">
      {filename && <span className="dl-code-block__filename">{filename}</span>}
      {language && <span className="dl-code-block__language">{language}</span>}
    </div>
    <div className="flex items-center gap-1.5">{children}</div>
  </div>
));
CodeBlockHeader.displayName = "CodeBlockHeader";

/**
 * Code container pre element with support for horizontal scrolling or word wrapping.
 */
export const CodeBlockContent = React.forwardRef<
  HTMLPreElement,
  CodeBlockContentProps
>(
  (
    {
      className,
      wrap = false,
      lineNumbers = false,
      language = "tsx",
      children,
      ...props
    },
    ref,
  ) => {
    const rawText = typeof children === "string" ? children : null;
    const lines = rawText && lineNumbers ? rawText.trim().split("\n") : null;
    let isInsideTag = false;

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
        {lines ? (
          lines.map((line, idx) => (
            <div key={idx} className="dl-code-block__line">
              <span className="dl-code-block__line-num">{idx + 1}</span>
              <span>
                {highlightCodeLine(
                  line,
                  language,
                  (value) => {
                    isInsideTag = value;
                  },
                  isInsideTag,
                )}
              </span>
            </div>
          ))
        ) : (
          <code>
            {rawText
              ? rawText.split("\n").map((line, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && "\n"}
                    {highlightCodeLine(
                      line,
                      language,
                      (value) => {
                        isInsideTag = value;
                      },
                      isInsideTag,
                    )}
                  </React.Fragment>
                ))
              : children}
          </code>
        )}
      </pre>
    );
  },
);
CodeBlockContent.displayName = "CodeBlockContent";

/**
 * Enterprise code snippet display with syntax font, optional header, copy button,
 * and line numbers.
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
        <CodeBlockContent lineNumbers={lineNumbers} language={language}>
          {code ?? children}
        </CodeBlockContent>
      </div>
    );
  },
);
CodeBlock.displayName = "CodeBlock";
