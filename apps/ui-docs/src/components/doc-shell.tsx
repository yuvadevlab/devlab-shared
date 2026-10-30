import React from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { ScrollToTop } from "./scroll-to-top";
import { Toaster } from "@yuva-devlab/ui";

export interface DocShellProps {
  children: React.ReactNode;
}

/**
 * Master layout shell for the DevLab UI Documentation portal.
 * Houses the top navigation header, sticky vertical sidebar,
 * auto scroll-to-top controller, main viewport, and notification toaster.
 */
export function DocShell({ children }: DocShellProps): React.JSX.Element {
  return (
    <>
      <ScrollToTop />
      <Header />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <Sidebar />
        <main
          id="main-content"
          className="min-w-0 flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-10"
        >
          <div className="mx-auto max-w-5xl">{children}</div>
        </main>
      </div>
      <Toaster />
    </>
  );
}
