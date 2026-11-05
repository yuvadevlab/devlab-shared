import * as React from "react";
import { File, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Props for a file attachment preview.
 */
export interface AttachmentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** File name displayed in the attachment. */
  name: string;
  /** Optional URL for opening or downloading the file. */
  href?: string;
  /** Optional human-readable file size. */
  size?: string;
  /** Optional callback that renders a remove button. */
  onRemove?: () => void;
}

/**
 * Displays a file attachment with an optional link and remove action.
 */
export const Attachment = React.forwardRef<HTMLDivElement, AttachmentProps>(
  ({ className, name, href, size, onRemove, ...props }, ref) => {
    const content = (
      <>
        <File aria-hidden="true" className="dl-attachment__icon" />
        <span className="dl-attachment__content">
          <span className="dl-attachment__name">{name}</span>
          {size && <span className="dl-attachment__size">{size}</span>}
        </span>
      </>
    );

    return (
      <div
        ref={ref}
        className={cn("dl-attachment", className)}
        data-slot="attachment"
        {...props}
      >
        {href ? (
          <a className="dl-attachment__link" href={href}>
            {content}
          </a>
        ) : (
          content
        )}
        {onRemove && (
          <button
            aria-label={`Remove ${name}`}
            className="dl-attachment__remove"
            onClick={onRemove}
            type="button"
          >
            <X aria-hidden="true" />
          </button>
        )}
      </div>
    );
  },
);
Attachment.displayName = "Attachment";
