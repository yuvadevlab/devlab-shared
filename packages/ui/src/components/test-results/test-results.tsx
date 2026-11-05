import * as React from "react";
import {
  CheckCircle2,
  XCircle,
  MinusCircle,
  ChevronRight,
  FlaskConical,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/code-block";
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceContent,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/trace";
import {
  TestCaseItem,
  TestCaseStatus,
  TestResultsProps,
  TestCaseProps,
} from "./test-results-types";

export type { TestCaseItem, TestCaseStatus, TestResultsProps, TestCaseProps };

/**
 * Renders one test result and expandable failure detail.
 */
export const TestCase = React.forwardRef<HTMLDivElement, TestCaseProps>(
  ({ className, test, defaultExpanded = false, ...props }, ref) => {
    const [expanded, setExpanded] = React.useState(defaultExpanded);
    const renderIcon = () => {
      switch (test.status) {
        case "passed":
          return <CheckCircle2 className="size-4 text-success shrink-0" />;
        case "failed":
          return <XCircle className="size-4 text-destructive shrink-0" />;
        case "skipped":
        default:
          return (
            <MinusCircle className="size-4 text-muted-foreground shrink-0" />
          );
      }
    };

    const line = (
      <TraceLine
        className={className}
        status={
          test.status === "failed"
            ? "error"
            : test.status === "passed"
              ? "success"
              : "default"
        }
        {...props}
      >
        <TraceIcon>{renderIcon()}</TraceIcon>
        <TraceTitle className="min-w-0 flex-1">{test.name}</TraceTitle>
        {test.durationMs !== undefined && (
          <span className="text-xs text-muted-foreground">
            {test.durationMs}ms
          </span>
        )}
        {test.errorMessage && (
          <ChevronRight
            className={cn(
              "size-4 text-muted-foreground transition-transform",
              expanded && "rotate-90",
            )}
          />
        )}
      </TraceLine>
    );

    return (
      <Trace ref={ref}>
        {test.errorMessage ? (
          <TraceCollapsible
            open={expanded}
            onOpenChange={setExpanded}
            defaultOpen={defaultExpanded}
          >
            <TraceCollapsibleTrigger className="w-full">
              {line}
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent>
              <TraceContent>
                <CodeBlock
                  code={test.errorMessage}
                  language="text"
                  copyable={false}
                  lineNumbers={false}
                />
              </TraceContent>
            </TraceCollapsibleContent>
          </TraceCollapsible>
        ) : (
          line
        )}
      </Trace>
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
      <Trace ref={ref} className={className} {...props}>
        <TraceLine>
          <TraceIcon>
            <FlaskConical />
          </TraceIcon>
          <TraceTitle>{title}</TraceTitle>
          {duration && (
            <span className="text-xs text-muted-foreground">in {duration}</span>
          )}
          <span className="ml-auto text-xs text-muted-foreground">
            {passed} passed{failed > 0 ? ` · ${failed} failed` : ""}
            {skipped > 0 ? ` · ${skipped} skipped` : ""}
          </span>
        </TraceLine>
        <Trace>
          {tests.map((test) => (
            <TestCase key={test.id} test={test} />
          ))}
        </Trace>

        {children}
      </Trace>
    );
  },
);
TestResults.displayName = "TestResults";
