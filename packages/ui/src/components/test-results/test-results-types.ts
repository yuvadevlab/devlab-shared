import * as React from "react";

export type TestCaseStatus = "passed" | "failed" | "skipped";

export interface TestCaseItem {
  id: string;
  name: string;
  status: TestCaseStatus;
  durationMs?: number;
  errorMessage?: string;
}

export interface TestResultsProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  /** Test suite title */
  title?: string;
  /** Total elapsed time, e.g. "1.4s" */
  duration?: string;
  /** Test cases list */
  tests: TestCaseItem[];
}

export interface TestCaseProps extends React.HTMLAttributes<HTMLDivElement> {
  test: TestCaseItem;
  defaultExpanded?: boolean;
}
