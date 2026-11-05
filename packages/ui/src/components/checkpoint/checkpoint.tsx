import * as React from "react";
import { History } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import { Marker } from "@/components/marker";
import { Trace, TraceIcon, TraceLine, TraceTitle } from "@/components/trace";
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
      <Trace ref={ref} className={cn("dl-checkpoint", className)} {...props}>
        <TraceLine>
          <TraceIcon>
            <History />
          </TraceIcon>
          <TraceTitle>
            <Marker>{label}</Marker>
          </TraceTitle>
          {onRestore && (
            <Button type="button" onClick={onRestore} variant="ghost" size="sm">
              {restoreLabel}
            </Button>
          )}
          {children}
        </TraceLine>
      </Trace>
    );
  },
);

Checkpoint.displayName = "Checkpoint";
