"use client";

import React from "react";
import { ThemeProvider } from "./theme-provider";
import { SearchProvider } from "./search-provider";

export interface DocProvidersProps {
  children: React.ReactNode;
}

/**
 * Unified client context providers for DevLab UI Documentation.
 * Encapsulates theme toggling and Cmd+K command search state.
 */
export function DocProviders({
  children,
}: DocProvidersProps): React.JSX.Element {
  return (
    <ThemeProvider>
      <SearchProvider>{children}</SearchProvider>
    </ThemeProvider>
  );
}
