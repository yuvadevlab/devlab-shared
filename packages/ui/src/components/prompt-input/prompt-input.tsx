import * as React from "react";
import { ArrowUp, Square, Paperclip, X, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PromptInputProps,
  PromptInputAttachmentItem,
} from "./prompt-input-types";

export type { PromptInputProps, PromptInputAttachmentItem };

/**
 * Enterprise message composition field for conversational AI and agent commands.
 * Features auto-resize textarea, file attachments, model selector slot, and Enter submission.
 *
 * @example
 * ```tsx
 * <PromptInput
 *   onSubmit={(val, files) => handleSendMessage(val, files)}
 *   placeholder="Ask the agent to refactor code..."
 * />
 * ```
 */
export const PromptInput = React.forwardRef<HTMLFormElement, PromptInputProps>(
  (
    {
      className,
      value: propValue,
      defaultValue = "",
      onValueChange,
      onSubmit,
      onStop,
      placeholder = "Send a message or prompt...",
      isGenerating = false,
      disabled = false,
      attachments: propAttachments,
      onAttachmentsChange,
      maxAttachments = 5,
      modelSelector,
      ...props
    },
    ref,
  ) => {
    const isControlled = propValue !== undefined;
    const [internalVal, setInternalVal] = React.useState(defaultValue);
    const text = isControlled ? propValue : internalVal;

    const [internalFiles, setInternalFiles] = React.useState<
      PromptInputAttachmentItem[]
    >([]);
    const files =
      propAttachments !== undefined ? propAttachments : internalFiles;

    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const updateText = (next: string) => {
      if (!isControlled) setInternalVal(next);
      onValueChange?.(next);
    };

    const updateFiles = (next: PromptInputAttachmentItem[]) => {
      if (propAttachments === undefined) setInternalFiles(next);
      onAttachmentsChange?.(next);
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateText(e.target.value);
      // Auto-resize
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 224)}px`;
      }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (disabled) return;
      if (isGenerating) {
        onStop?.();
        return;
      }
      if (!text.trim() && files.length === 0) return;

      onSubmit?.(text, files);
      updateText("");
      updateFiles([]);
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleFormSubmit(e);
      }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = e.target.files;
      if (!selected || selected.length === 0) return;

      const newItems: PromptInputAttachmentItem[] = Array.from(selected).map(
        (f) => ({
          id: `${Date.now()}-${f.name}`,
          name: f.name,
          size: f.size,
          type: f.type,
        }),
      );

      const combined = [...files, ...newItems].slice(0, maxAttachments);
      updateFiles(combined);
      e.target.value = "";
    };

    const handleRemoveFile = (id: string) => {
      updateFiles(files.filter((f) => f.id !== id));
    };

    const canSubmit = (text.trim().length > 0 || files.length > 0) && !disabled;

    return (
      <form
        ref={ref}
        onSubmit={handleFormSubmit}
        className={cn(
          "dl-prompt-input",
          disabled && "dl-prompt-input--disabled",
          className,
        )}
        {...props}
      >
        {/* Attachments preview row */}
        {files.length > 0 && (
          <div className="dl-prompt-input__attachments">
            {files.map((file) => (
              <span key={file.id} className="dl-prompt-input__chip">
                <FileText className="size-3 text-muted-foreground" />
                <span className="dl-prompt-input__chip-name">{file.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(file.id)}
                  aria-label={`Remove ${file.name}`}
                  className="dl-prompt-input__chip-remove"
                >
                  <X className="size-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          className="dl-prompt-input__textarea"
        />

        {/* Action Toolbar */}
        <div className="dl-prompt-input__toolbar">
          <div className="dl-prompt-input__left-actions">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              multiple
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled || files.length >= maxAttachments}
              aria-label="Attach file"
              className="dl-prompt-input__btn"
            >
              <Paperclip className="size-3.5" />
            </button>
            {modelSelector}
          </div>

          <div className="dl-prompt-input__right-actions">
            {isGenerating ? (
              <button
                type="button"
                onClick={onStop}
                aria-label="Stop generation"
                className="dl-prompt-input__btn dl-prompt-input__btn--stop"
              >
                <Square className="size-3 fill-current" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!canSubmit}
                aria-label="Send message"
                className="dl-prompt-input__btn dl-prompt-input__btn--send"
              >
                <ArrowUp className="size-3.5 stroke-[2.5]" />
              </button>
            )}
          </div>
        </div>
      </form>
    );
  },
);

PromptInput.displayName = "PromptInput";
