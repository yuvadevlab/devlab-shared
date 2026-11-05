import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import { Label } from "@/components/label";
import { RadioGroup, RadioGroupItem } from "@/components/radio-group";

/**
 * Single-choice question and its response options.
 */
export interface QuestionnaireQuestion {
  /** Unique key used in the submitted answer map. */
  id: string;
  /** Prompt shown above the choices. */
  prompt: string;
  /** Available response labels. */
  options: string[];
}

/**
 * Props for a single-choice questionnaire.
 */
export interface QuestionnaireProps extends Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  "onSubmit"
> {
  /** Questions displayed in the questionnaire. */
  questions: QuestionnaireQuestion[];
  /** Called with the selected value for each question. */
  onSubmit: (answers: Record<string, string>) => void;
  /** Submit button label. */
  submitLabel?: string;
}

/**
 * Collects one response for each question and submits the answer map.
 */
export const Questionnaire = React.forwardRef<
  HTMLFormElement,
  QuestionnaireProps
>(
  (
    {
      className,
      questions,
      onSubmit,
      submitLabel = "Submit answers",
      ...props
    },
    ref,
  ) => {
    const [answers, setAnswers] = React.useState<Record<string, string>>({});

    return (
      <form
        ref={ref}
        className={cn("dl-questionnaire", className)}
        data-slot="questionnaire"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(answers);
        }}
        {...props}
      >
        {questions.map((question) => (
          <fieldset
            className="dl-questionnaire__question"
            key={question.id}
            name={question.id}
          >
            <legend id={`${question.id}-legend`}>{question.prompt}</legend>
            <RadioGroup
              aria-labelledby={`${question.id}-legend`}
              className="dl-questionnaire__options"
              name={question.id}
              onValueChange={(value) =>
                setAnswers((current) => ({
                  ...current,
                  [question.id]: value,
                }))
              }
              required
              value={answers[question.id] ?? ""}
            >
              {question.options.map((option, index) => {
                const optionId = `${question.id}-${index}`;
                const selected = answers[question.id] === option;

                return (
                  <div
                    className={cn(
                      "dl-questionnaire__option",
                      selected && "dl-questionnaire__option--selected",
                    )}
                    key={optionId}
                  >
                    <RadioGroupItem
                      id={optionId}
                      value={option}
                      aria-label={option}
                    />
                    <Label
                      className="dl-questionnaire__label"
                      htmlFor={optionId}
                    >
                      {option}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </fieldset>
        ))}
        <Button className="dl-questionnaire__submit" type="submit">
          {submitLabel}
        </Button>
      </form>
    );
  },
);
Questionnaire.displayName = "Questionnaire";
