import * as React from "react";
import {
  CheckCircle2,
  XCircle,
  MinusCircle,
  ChevronRight,
  FlaskConical,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  TestCaseItem,
  TestCaseStatus,
  TestResultsProps,
  TestCaseProps,
} from "./test-results-types";

export type { TestCaseItem, TestCaseStatus, TestResultsProps, TestCaseProps };

export const TestCase = React.forwardRef<HTMLDivElement, TestCaseProps>(
  ({ className, test, defaultExpanded = false, ...props }, ref) => {
    const [expanded, setExpanded] = React.useState(defaultExpanded);
    const hasError = Boolean(test.errorMessage);

    const renderIcon = () => {
      switch (test.status) {
        case "passed":
          return <CheckCircle2 className="size-4 text-success shrink-0" />;
        case "failed":
          return <XCircle className="size-4 text-destructive shrink-0" />;
        case "skipped":
        default:
          return (
            <MinusCircle
              style={{
                width: "1rem",
                height: "1rem",
                color: "var(--muted-foreground)",
                flexShrink: 0,
              }}
            />
          );
      }
    };

    return (
      <div ref={ref} className={cn("dl-test-case", className)} {...props}>
        <div
          className={cn("dl-test-case__row", hasError && "dl-cursor-pointer")}
          onClick={() => hasError && setExpanded((prev) => !prev)}
        >
          <div className="dl-test-case__info">
            {renderIcon()}
            <span className="dl-test-case__name">{test.name}</span>
          </div>

          <div className="dl-test-case__meta">
            {test.durationMs !== undefined && (
              <span className="dl-test-case__duration">
                {test.durationMs}ms
              </span>
            )}
            {hasError && (
              <ChevronRight
                className={cn(
                  "dl-test-case__chevron",
                  expanded && "dl-test-case__chevron--expanded",
                )}
              />
            )}
          </div>
        </div>

        {expanded && test.errorMessage && (
          <div className="dl-test-case__error">{test.errorMessage}</div>
        )}
      </div>
    );
  },
);
TestCase.displayName = "TestCase";

/**
 * Test execution results dashboard visualizing passed, failed, and skipped unit or integration tests.
 *
 * @example
 * ```tsx
 * <TestResults
 *   title="packages/ui Unit Tests"
 *   duration="1.2s"
 *   tests={[
 *     { id: "1", name: "renders button correctly", status: "passed", durationMs: 4 },
 *     { id: "2", name: "validates zod schema", status: "failed", errorMessage: "Expected true, received false" }
 *   ]}
 * />
 * ```
 */
export const TestResults = React.forwardRef<HTMLDivElement, TestResultsProps>(
  (
    {
      className,
      title = "Test Results",
      duration,
      tests = [],
      children,
      ...props
    },
    ref,
  ) => {
    const passed = tests.filter((t) => t.status === "passed").length;
    const failed = tests.filter((t) => t.status === "failed").length;
    const skipped = tests.filter((t) => t.status === "skipped").length;

    return (
      <div ref={ref} className={cn("dl-test-results", className)} {...props}>
        <div className="dl-test-results__header">
          <div className="dl-test-results__header-left">
            <FlaskConical
              style={{ width: "1rem", height: "1rem", color: "var(--primary)" }}
            />
            <span className="dl-test-results__title">{title}</span>
            {duration && (
              <span className="dl-test-results__duration">in {duration}</span>
            )}
          </div>

          <div className="dl-test-results__summary">
            <span className="dl-test-results__badge dl-test-results__badge--passed">
              {passed} passed
            </span>
            {failed > 0 && (
              <span className="dl-test-results__badge dl-test-results__badge--failed">
                {failed} failed
              </span>
            )}
            {skipped > 0 && (
              <span className="dl-test-results__badge dl-test-results__badge--skipped">
                {skipped} skipped
              </span>
            )}
          </div>
        </div>

        <div className="dl-test-results__list">
          {tests.map((test) => (
            <TestCase key={test.id} test={test} />
          ))}
        </div>

        {children}
      </div>
    );
  },
);
TestResults.displayName = "TestResults";
