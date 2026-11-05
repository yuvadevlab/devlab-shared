"use client";

import React from "react";
import { Terminal, AlertTriangle } from "lucide-react";
import {
  Confirmation,
  ConfirmationMedia,
  ConfirmationContent,
  ConfirmationTitle,
  ConfirmationDescription,
  ConfirmationActions,
  Button,
} from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";
import { createExampleSource } from "@/lib/create-example-source";

export default function ConfirmationDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "basic",
      title: "Command Approval",
      description:
        "Ask user approval before running a terminal or git command.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <Confirmation>
            <ConfirmationMedia>
              <Terminal className="size-4" />
            </ConfirmationMedia>
            <ConfirmationContent>
              <ConfirmationTitle>Run git push origin main?</ConfirmationTitle>
              <ConfirmationDescription>
                Pushes 3 commits to the remote production repository.
              </ConfirmationDescription>
            </ConfirmationContent>
            <ConfirmationActions>
              <Button variant="outline" size="sm">
                Deny
              </Button>
              <Button size="sm">Approve</Button>
            </ConfirmationActions>
          </Confirmation>
        </div>
      ),
      codeSnippet: createExampleSource({
        externalImports: ['import { Terminal } from "lucide-react";'],
        imports: [
          "Button",
          "Confirmation",
          "ConfirmationActions",
          "ConfirmationContent",
          "ConfirmationDescription",
          "ConfirmationMedia",
          "ConfirmationTitle",
        ],
        body: `<Confirmation>
  <ConfirmationMedia><Terminal className="size-4" /></ConfirmationMedia>
  <ConfirmationContent>
    <ConfirmationTitle>Run git push origin main?</ConfirmationTitle>
    <ConfirmationDescription>
      Pushes 3 commits to the remote production repository.
    </ConfirmationDescription>
  </ConfirmationContent>
  <ConfirmationActions>
    <Button variant="outline" size="sm">Deny</Button>
    <Button size="sm">Approve</Button>
  </ConfirmationActions>
  </Confirmation>`,
      }),
    },
    {
      id: "destructive",
      title: "Destructive Action Guardrail",
      description:
        "Highlighted alert for high-risk deletions or irreversible operations.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md">
          <Confirmation variant="destructive">
            <ConfirmationMedia>
              <AlertTriangle className="size-4" />
            </ConfirmationMedia>
            <ConfirmationContent>
              <ConfirmationTitle>
                Drop database table audit_logs?
              </ConfirmationTitle>
              <ConfirmationDescription>
                Permanent data loss will occur. 142k rows will be dropped.
              </ConfirmationDescription>
            </ConfirmationContent>
            <ConfirmationActions>
              <Button variant="outline" size="sm">
                Cancel
              </Button>
              <Button variant="destructive" size="sm">
                Confirm Drop
              </Button>
            </ConfirmationActions>
          </Confirmation>
        </div>
      ),
      codeSnippet: createExampleSource({
        externalImports: ['import { AlertTriangle } from "lucide-react";'],
        imports: [
          "Button",
          "Confirmation",
          "ConfirmationActions",
          "ConfirmationContent",
          "ConfirmationDescription",
          "ConfirmationMedia",
          "ConfirmationTitle",
        ],
        body: `<Confirmation variant="destructive">
  <ConfirmationMedia><AlertTriangle className="size-4" /></ConfirmationMedia>
  <ConfirmationContent>
    <ConfirmationTitle>Drop database table audit_logs?</ConfirmationTitle>
    <ConfirmationDescription>
      This permanently deletes 142,000 rows and cannot be undone.
    </ConfirmationDescription>
  </ConfirmationContent>
  <ConfirmationActions>
    <Button variant="outline" size="sm">Cancel</Button>
    <Button variant="destructive" size="sm">Confirm</Button>
  </ConfirmationActions>
  </Confirmation>`,
      }),
    },
  ];

  const propsList: PropDefinition[] = [
    {
      name: "variant",
      type: '"outline" | "card" | "destructive"',
      default: '"outline"',
      description: "Card border styling and risk level coloring.",
    },
    {
      name: "size",
      type: '"sm" | "md"',
      default: '"md"',
      description: "Padding and font dimension scale.",
    },
  ];

  const cssClasses: CssClassDefinition[] = [
    {
      name: ".dl-confirmation",
      description: "Container card for approval gate.",
    },
    {
      name: ".dl-confirmation__media",
      description: "Left icon or visual slot.",
    },
    {
      name: ".dl-confirmation__actions",
      description: "Right-aligned approve/deny buttons.",
    },
  ];

  return (
    <ComponentView
      title="Confirmation"
      description="Human-in-the-loop action approval card for sensitive or destructive AI agent actions, with title, risk description, and contextual approve/deny actions."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
