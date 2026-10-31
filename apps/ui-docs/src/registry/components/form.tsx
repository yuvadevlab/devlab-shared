"use client";

import React, { useState } from "react";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  Input,
  Button,
  Label,
  Stack,
} from "@yuva-devlab/ui";
import { useForm } from "react-hook-form";
import { ComponentView, ComponentVariant } from "@/components/component-view";

interface FormData {
  clusterId: string;
}

/**
 * Documentation page for Form component showcasing react-hook-form validation integration.
 */
export default function FormDocPage() {
  const form = useForm<FormData>({
    defaultValues: { clusterId: "yuva_architect" },
  });
  const [submittedValue, setSubmittedValue] = useState("");

  const onSubmit = (data: FormData) => {
    setSubmittedValue(data.clusterId);
  };

  const variants: ComponentVariant[] = [
    {
      id: "validation",
      title: "Validated Form Field",
      description:
        "Field integrated with react-hook-form, featuring labels, descriptions, and error messages.",
      preview: (
        <Stack gap={4} className="dl-demo-frame dl-demo-frame--sm">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <Form {...(form as any)}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Stack gap={4}>
                <FormField
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  control={form.control as any}
                  name="clusterId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Agent Cluster Identifier</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter cluster..." {...field} />
                      </FormControl>
                      <FormDescription>
                        Unique identity for the workspace container.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <Button type="submit" size="sm">
                    Save Configuration
                  </Button>
                </div>
              </Stack>
            </form>
          </Form>

          {submittedValue && (
            <p className="dl-demo-code">
              Saved cluster identifier: {submittedValue}
            </p>
          )}
        </Stack>
      ),
      codeSnippet: `const form = useForm({ defaultValues: { clusterId: "alpha" } });

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <Stack gap="4">
      <FormField
        control={form.control}
        name="clusterId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cluster Identifier</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription>Unique workspace ID.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Save</Button>
    </Stack>
  </form>
</Form>`,
    },
    {
      id: "simple",
      title: "Direct Uncontrolled Layout",
      description:
        "Lightweight grouped form controls without external schema validation bindings.",
      preview: (
        <Stack gap={3} className="dl-demo-frame dl-demo-frame--sm">
          <Stack gap={1}>
            <Label>Endpoint URL</Label>
            <Input defaultValue="https://api.devlab.io/v1/traces" />
            <p className="dl-demo-caption">
              Direct OTLP telemetry push receiver.
            </p>
          </Stack>
          <div>
            <Button size="sm" variant="secondary">
              Test Connection
            </Button>
          </div>
        </Stack>
      ),
      codeSnippet: `<Stack gap="3">
  <Stack gap="1">
    <Label>Endpoint URL</Label>
    <Input defaultValue="https://api.devlab.io/v1/traces" />
  </Stack>
  <Button size="sm" variant="secondary">Test Connection</Button>
</Stack>`,
    },
  ];

  const propsList = [
    {
      name: "FormField",
      type: "React.Component",
      default: "—",
      description:
        "Connects a form control to the react-hook-form state controller.",
    },
    {
      name: "FormItem",
      type: "React.Component",
      default: "—",
      description: "Wrapper providing layout spacing, labels, and error slot.",
    },
    {
      name: "FormMessage",
      type: "React.Component",
      default: "—",
      description: "Displays validation error messages with aria-invalid flag.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-form-item",
      description: "Vertical stacked field wrapper.",
    },
    {
      name: ".dl-form-message",
      description: "Red text element indicating validation errors.",
    },
  ];

  return (
    <ComponentView
      title="Form"
      description="Building forms with React Hook Form and Radix UI primitives, inspired by Ant Design's Form component."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
