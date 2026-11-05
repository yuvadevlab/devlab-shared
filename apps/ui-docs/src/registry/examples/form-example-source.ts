/** Complete source for the validated React Hook Form example. */
export const validatedFormExample = `"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Stack,
} from "@yuva-devlab/ui";

type FormValues = {
  clusterId: string;
};

export default function Example() {
  const form = useForm<FormValues>({
    defaultValues: { clusterId: "yuva_architect" },
  });
  const [submittedValue, setSubmittedValue] = useState("");

  function onSubmit(data: FormValues) {
    setSubmittedValue(data.clusterId);
  }

  return (
    <Stack gap={4} className="dl-demo-frame dl-demo-frame--sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Stack gap={4}>
            <FormField
              control={form.control}
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
  );
}`;
