import React from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Toaster, Container } from "@yuva-devlab/ui";

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
      <div className="dl-doc-shell__body">
        <Sidebar />
        <main id="main-content" className="dl-doc-shell__main">
          <Container size="xl">{children}</Container>
        </main>
      </div>
      <Toaster />
    </>
  );
}
