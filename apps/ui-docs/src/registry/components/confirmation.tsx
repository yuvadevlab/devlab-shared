"use client";

import React, { useState } from "react";
import { Terminal, AlertTriangle, CheckCircle2 } from "lucide-react";
import {
  Confirmation,
  ConfirmationMedia,
  ConfirmationContent,
  ConfirmationTitle,
  ConfirmationDescription,
  ConfirmationActions,
  ConfirmationRequest,
  ConfirmationAccepted,
  ConfirmationRejected,
  type ConfirmationApprovalState,
  Button,
} from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/component-view";

const BASIC_CODE = `import { useState } from "react";
import { Terminal, CheckCircle2 } from "lucide-react";
import {
  Confirmation,
  ConfirmationMedia,
  ConfirmationContent,
  ConfirmationTitle,
  ConfirmationDescription,
  ConfirmationActions,
  ConfirmationRequest,
  ConfirmationAccepted,
  ConfirmationRejected,
  type ConfirmationApprovalState,
  Button,
} from "@yuva-devlab/ui";

export function ConfirmationDemo() {
  const [state, setState] = useState<ConfirmationApprovalState>(
    "approval-requested",
  );

  return (
    <Confirmation state={state}>
      <ConfirmationMedia>
        <Terminal aria-hidden="true" />
      </ConfirmationMedia>
      <ConfirmationContent>
        <ConfirmationTitle>Run git push origin main?</ConfirmationTitle>
        <ConfirmationDescription>
          Pushes 3 commits to the remote production repository.
        </ConfirmationDescription>
      </ConfirmationContent>
      <ConfirmationRequest>
        <ConfirmationActions>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setState("approval-rejected")}
          >
            Deny
          </Button>
          <Button size="sm" onClick={() => setState("approval-accepted")}>
            Approve
          </Button>
        </ConfirmationActions>
      </ConfirmationRequest>
      <ConfirmationAccepted>
        <CheckCircle2 aria-hidden="true" /> Approved for execution
      </ConfirmationAccepted>
      <ConfirmationRejected>Execution denied</ConfirmationRejected>
    </Confirmation>
  );
}`;

const DESTRUCTIVE_CODE = `import { AlertTriangle } from "lucide-react";
import {
  Confirmation,
  ConfirmationMedia,
  ConfirmationContent,
  ConfirmationTitle,
  ConfirmationDescription,
  ConfirmationActions,
  Button,
} from "@yuva-devlab/ui";

export function DestructiveConfirmationDemo() {
  return (
    <Confirmation variant="destructive">
      <ConfirmationMedia>
        <AlertTriangle aria-hidden="true" />
      </ConfirmationMedia>
      <ConfirmationContent>
        <ConfirmationTitle>Drop database table audit_logs?</ConfirmationTitle>
        <ConfirmationDescription>
          Permanent data loss will occur. 142k rows will be dropped.
        </ConfirmationDescription>
      </ConfirmationContent>
      <ConfirmationActions>
        <Button variant="outline" size="sm">Cancel</Button>
        <Button variant="destructive" size="sm">Confirm Drop</Button>
      </ConfirmationActions>
    </Confirmation>
  );
}`;

export default function ConfirmationDocPage() {
  const [approvalState, setApprovalState] =
    useState<ConfirmationApprovalState>("approval-requested");

  const variants: ComponentVariant[] = [
    {
      id: "basic",
      title: "Interactive Command Approval",
      description:
        "Approve or deny tool execution with responsive action layout and inline resolution status.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--lg">
          <Confirmation state={approvalState}>
            <ConfirmationMedia>
              <Terminal aria-hidden="true" />
            </ConfirmationMedia>
            <ConfirmationContent>
              <ConfirmationTitle>Run git push origin main?</ConfirmationTitle>
              <ConfirmationDescription>
                Pushes 3 commits to the remote production repository.
              </ConfirmationDescription>
            </ConfirmationContent>
            <ConfirmationRequest>
              <ConfirmationActions>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setApprovalState("approval-rejected")}
                >
                  Deny
                </Button>
                <Button
                  size="sm"
                  onClick={() => setApprovalState("approval-accepted")}
                >
                  Approve
                </Button>
              </ConfirmationActions>
            </ConfirmationRequest>
            <ConfirmationAccepted>
              <CheckCircle2 aria-hidden="true" />
              <span>Approved for execution</span>
            </ConfirmationAccepted>
            <ConfirmationRejected>
              <span>Execution denied</span>
            </ConfirmationRejected>
          </Confirmation>
        </div>
      ),
      codeSnippet: BASIC_CODE,
    },
    {
      id: "destructive",
      title: "Destructive Action Guardrail",
      description:
        "Highlighted alert for high-risk deletions or irreversible operations.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--lg">
          <Confirmation variant="destructive">
            <ConfirmationMedia>
              <AlertTriangle aria-hidden="true" />
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
      codeSnippet: DESTRUCTIVE_CODE,
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
      name: "state",
      type: '"approval-requested" | "approval-accepted" | "approval-rejected"',
      default: "—",
      description:
        "Controls visibility of Request / Accepted / Rejected slots.",
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
      description: "Container card for human-in-the-loop approval gate.",
    },
    {
      name: ".dl-confirmation__media",
      description: "Left icon container enforcing crisp 16px SVG sizing.",
    },
    {
      name: ".dl-confirmation__actions",
      description: "Responsive right-aligned approve/deny action bar.",
    },
  ];

  return (
    <ComponentView
      title="Confirmation"
      description="Human-in-the-loop action approval card for sensitive or destructive agent operations."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
