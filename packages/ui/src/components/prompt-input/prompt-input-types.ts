import * as React from "react";

export interface PromptInputAttachmentItem {
  id: string;
  name: string;
  size?: number | string;
  type?: string;
}

export interface PromptInputProps extends Omit<
  React.HTMLAttributes<HTMLFormElement>,
  "onSubmit"
> {
  /** Current text value in controlled mode */
  value?: string;
  /** Initial text value in uncontrolled mode */
  defaultValue?: string;
  /** Callback fired when textarea value changes */
  onValueChange?: (value: string) => void;
  /** Callback fired on submission (Enter without Shift or Send button click) */
  onSubmit?: (value: string, attachments: PromptInputAttachmentItem[]) => void;
  /** Callback fired when the Stop generation button is pressed */
  onStop?: () => void;
  /** Placeholder hint in the textarea */
  placeholder?: string;
  /** Whether the model is currently generating output */
  isGenerating?: boolean;
  /** Whether the prompt input is disabled */
  disabled?: boolean;
  /** Initial or controlled attachments array */
  attachments?: PromptInputAttachmentItem[];
  /** Callback fired when attachments are added or removed */
  onAttachmentsChange?: (attachments: PromptInputAttachmentItem[]) => void;
  /** Maximum number of attachments permitted */
  maxAttachments?: number;
  /** Optional slot for ModelSelector or custom model badge */
  modelSelector?: React.ReactNode;
}
