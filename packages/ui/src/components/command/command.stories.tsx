import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "./command";
import { Calculator, Calendar, Smile, User } from "lucide-react";

const meta: Meta<typeof Command> = {
  title: "Components/Command",
  component: Command,
};

export default meta;
type Story = StoryObj<typeof Command>;

export const Default: Story = {
  render: () => (
    <div className="dl-story-w-md dl-card dl-overflow-hidden">
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar size={16} />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile size={16} />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator size={16} />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User size={16} />
              <span>Profile</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  ),
};
