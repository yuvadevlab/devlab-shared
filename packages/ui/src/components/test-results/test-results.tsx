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

function renderTestIcon(status: TestCaseStatus) {
  switch (status) {
    case "passed":
      return (
        <CheckCircle2
          className="dl-test-case__icon dl-test-case__icon--passed"
          aria-hidden="true"
        />
      );
    case "failed":
      return (
        <XCircle
          className="dl-test-case__icon dl-test-case__icon--failed"
          aria-hidden="true"
        />
      );
    case "skipped":
    default:
      return (
        <MinusCircle
          className="dl-test-case__icon dl-test-case__icon--skipped"
          aria-hidden="true"
        />
      );
  }
}

/**
 * Individual test assertion row inside {@link TestResults}.
 */
export const TestCase = React.forwardRef<HTMLDivElement, TestCaseProps>(
  ({ className, test, defaultExpanded = false, ...props }, ref) => {
    const [expanded, setExpanded] = React.useState(defaultExpanded);
    const hasError = Boolean(test.errorMessage);

    return (
      <div ref={ref} className={cn("dl-test-case", className)} {...props}>
        <button
          type="button"
          className={cn(
            "dl-test-case__row",
            hasError && "dl-test-case__row--interactive",
          )}
          onClick={() => hasError && setExpanded((prev) => !prev)}
          aria-expanded={hasError ? expanded : undefined}
          disabled={!hasError}
        >
          <span className="dl-test-case__info">
            {renderTestIcon(test.status)}
            <span className="dl-test-case__name">{test.name}</span>
          </span>

          <span className="dl-test-case__meta">
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
                aria-hidden="true"
              />
            )}
          </span>
        </button>

        {expanded && test.errorMessage && (
          <div className="dl-test-case__error">{test.errorMessage}</div>
        )}
      </div>
    );
  },
);
TestCase.displayName = "TestCase";

/**
 * Test execution results dashboard visualizing passed, failed, and skipped tests.
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
    const total = Math.max(tests.length, 1);
    const passedPct = Math.round((passed / total) * 100);
    const failedPct = Math.round((failed / total) * 100);

    return (
      <div ref={ref} className={cn("dl-test-results", className)} {...props}>
        <div className="dl-test-results__header">
          <div className="dl-test-results__header-left">
            <FlaskConical
              className="dl-test-results__header-icon"
              aria-hidden="true"
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

        {tests.length > 0 && (
          <svg
            className="dl-test-results__bar"
            viewBox="0 0 100 3"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <rect
              className="dl-test-results__bar-track"
              width="100"
              height="3"
            />
            <rect
              className="dl-test-results__bar-pass"
              x="0"
              width={passedPct}
              height="3"
            />
            <rect
              className="dl-test-results__bar-fail"
              x={passedPct}
              width={failedPct}
              height="3"
            />
          </svg>
        )}

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
