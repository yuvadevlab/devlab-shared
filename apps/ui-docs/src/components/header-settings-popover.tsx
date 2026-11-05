"use client";

import { BookOpen, ExternalLink, Settings2, Sparkles } from "lucide-react";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from "@yuva-devlab/ui";
import type { Brand } from "@/components/theme-provider";
import { BRAND_OPTIONS } from "@/components/header-brand-options";

interface HeaderSettingsPopoverProps {
  brand: Brand;
  fullTheme: boolean;
  onBrandChange: (brand: Brand) => void;
  onFullThemeChange: (enabled: boolean) => void;
}

/**
 * Provides compact-screen access to brand, full-theme, and Storybook settings.
 *
 * @param props - Current theme settings and update callbacks.
 * @returns A settings button with its anchored popover panel.
 */
export function HeaderSettingsPopover({
  brand,
  fullTheme,
  onBrandChange,
  onFullThemeChange,
}: HeaderSettingsPopoverProps): React.JSX.Element {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="dl-docs-header__settings-trigger"
          aria-label="Open documentation settings"
        >
          <Settings2 className="dl-docs-header__icon-sm" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="dl-docs-header__settings-popover">
        <div className="dl-docs-header__settings-title">
          Documentation settings
        </div>
        <label
          htmlFor="mobile-brand-select"
          className="dl-docs-header__settings-label"
        >
          Brand
        </label>
        <Select
          value={brand}
          onValueChange={(value) => onBrandChange(value as Brand)}
        >
          <SelectTrigger
            id="mobile-brand-select"
            className="dl-docs-header__settings-select"
          >
            <SelectValue placeholder="Select Brand" />
          </SelectTrigger>
          <SelectContent>
            {BRAND_OPTIONS.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="dl-docs-header__settings-theme">
          <Switch
            id="full-theme-toggle-mobile"
            checked={fullTheme}
            onCheckedChange={onFullThemeChange}
          />
          <label htmlFor="full-theme-toggle-mobile">
            <Sparkles className="dl-docs-header__sparkles" />
            Preview Full Theme
          </label>
        </div>
        <a
          href="http://localhost:6006"
          target="_blank"
          rel="noopener noreferrer"
          className="dl-docs-header__settings-storybook"
        >
          <BookOpen className="dl-docs-header__icon-sm" />
          Storybook
          <ExternalLink className="dl-docs-header__icon-xs" />
        </a>
      </PopoverContent>
    </Popover>
  );
}
