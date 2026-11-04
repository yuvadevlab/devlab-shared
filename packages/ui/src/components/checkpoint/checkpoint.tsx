import * as React from "react";
import { History } from "lucide-react";
import { cn } from "@/lib/utils";
import { CheckpointProps } from "./checkpoint-types";

export type { CheckpointProps };

/**
 * Checkpoint divider marking a notable conversation turn or restore snapshot.
 *
 * @example
 * ```tsx
 * <Checkpoint label="Checkpoint: Before schema migration" onRestore={handleRestore} />
 * ```
 */
export const Checkpoint = React.forwardRef<HTMLDivElement, CheckpointProps>(
  (
    {
      className,
      label = "Checkpoint",
      onRestore,
      restoreLabel = "Restore",
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn("dl-checkpoint", className)} {...props}>
        <div className="dl-checkpoint__content">
          <History className="size-3 text-muted-foreground" />
          <span>{label}</span>
          {onRestore && (
            <button
              type="button"
              onClick={onRestore}
              className="dl-checkpoint__restore-btn"
            >
              {restoreLabel}
            </button>
          )}
          {children}
        </div>
      </div>
    );
  },
);

Checkpoint.displayName = "Checkpoint";
