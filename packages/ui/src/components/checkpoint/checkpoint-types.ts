import * as React from "react";

export interface CheckpointProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Timestamp or label describing the checkpoint */
  label?: React.ReactNode;
  /** Callback fired when restore is clicked */
  onRestore?: () => void;
  /** Custom label for restore button. Defaults to "Restore" */
  restoreLabel?: string;
}
