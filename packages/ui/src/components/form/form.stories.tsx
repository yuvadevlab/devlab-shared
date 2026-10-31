import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/input/input";
import { Button } from "@/components/button/button";
import { Stack } from "@/components/layout/stack";

const meta: Meta<typeof Form> = {
  title: "Components/Form",
  component: Form,
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        workspaceName: "",
      },
    });

    return (
      <div className="dl-story-w-sm dl-card dl-p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(() => {})}>
            <Stack gap={4}>
              <FormItem>
                <FormLabel>Workspace Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. production-east" />
                </FormControl>
                <FormDescription>
                  Unique identifier across your enterprise cluster.
                </FormDescription>
                <FormMessage />
              </FormItem>
              <Button type="submit">Create Workspace</Button>
            </Stack>
          </form>
        </Form>
      </div>
    );
  },
};
