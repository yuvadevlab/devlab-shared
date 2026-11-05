"use client";

import { Questionnaire } from "@yuva-devlab/ui";
import { ComponentView } from "@/components/component-view";
import { createExampleSource } from "@/lib/create-example-source";

/**
 * Interactive documentation for Questionnaire.
 */
export default function QuestionnaireDoc() {
  return (
    <ComponentView
      title="Questionnaire"
      category="Data Entry"
      description="Single-choice question group that submits selected answers."
      preview={
        <Questionnaire
          questions={[
            {
              id: "rating",
              prompt: "Was this response helpful?",
              options: ["Yes", "Somewhat", "No"],
            },
          ]}
          onSubmit={() => {}}
        />
      }
      codeSnippet={createExampleSource({
        imports: ["Questionnaire"],
        setup: `const questions = [
  {
    id: "rating",
    prompt: "Was this response helpful?",
    options: ["Yes", "Somewhat", "No"],
  },
  {
    id: "reason",
    prompt: "What should we improve?",
    options: ["Accuracy", "Clarity", "More detail"],
  },
];`,
        body: `<Questionnaire
  questions={questions}
  onSubmit={(answers) => console.log("Submitted answers:", answers)}
/>`,
      })}
      propsList={[
        {
          name: "questions",
          type: "QuestionnaireQuestion[]",
          default: "—",
          description: "Questions with IDs, prompts, and option labels.",
        },
        {
          name: "onSubmit",
          type: "(answers: Record<string, string>) => void",
          default: "—",
          description: "Receives selected answers keyed by question ID.",
        },
        {
          name: "submitLabel",
          type: "string",
          default: '"Submit answers"',
          description: "Submit button text.",
        },
      ]}
    />
  );
}
