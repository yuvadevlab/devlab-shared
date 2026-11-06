import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Terminal, AlertTriangle, ShieldCheck } from "lucide-react";
import {
  Confirmation,
  ConfirmationMedia,
  ConfirmationContent,
  ConfirmationTitle,
  ConfirmationDescription,
  ConfirmationActions,
} from "./confirmation";
import { Button } from "@/components/button";

const meta: Meta<typeof Confirmation> = {
  title: "AI Elements/Confirmation",
  component: Confirmation,
};

export default meta;
type Story = StoryObj<typeof Confirmation>;

export const Default: Story = {
  render: () => (
    <div className="dl-story-w-lg">
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
};

export const Destructive: Story = {
  render: () => (
    <div className="dl-story-w-lg">
      <Confirmation variant="destructive">
        <ConfirmationMedia>
          <AlertTriangle className="size-4" />
        </ConfirmationMedia>
        <ConfirmationContent>
          <ConfirmationTitle>Delete cloud database replica?</ConfirmationTitle>
          <ConfirmationDescription>
            This action cannot be undone. All replica telemetry will be lost.
          </ConfirmationDescription>
        </ConfirmationContent>
        <ConfirmationActions>
          <Button variant="outline" size="sm">
            Cancel
          </Button>
          <Button variant="destructive" size="sm">
            Delete
          </Button>
        </ConfirmationActions>
      </Confirmation>
    </div>
  ),
};

export const PolicyApproval: Story = {
  render: () => (
    <div className="dl-story-w-lg">
      <Confirmation size="sm">
        <ConfirmationMedia>
          <ShieldCheck className="size-4 text-primary" />
        </ConfirmationMedia>
        <ConfirmationContent>
          <ConfirmationTitle>Grant IAM Role: SUPER_ADMIN</ConfirmationTitle>
          <ConfirmationDescription>
            Requested for yuva@devlab.io (Tenant Admin).
          </ConfirmationDescription>
        </ConfirmationContent>
        <ConfirmationActions>
          <Button variant="ghost" size="sm">
            Decline
          </Button>
          <Button size="sm">Grant Access</Button>
        </ConfirmationActions>
      </Confirmation>
    </div>
  ),
};
