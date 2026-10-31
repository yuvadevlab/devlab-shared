import React from "react";
import Link from "next/link";
import { Button } from "@yuva-devlab/ui";

/**
 * 404 Not Found page for DevLab UI Documentation.
 */
export default function NotFound() {
  return (
    <div className="dl-center dl-flex-col dl-p-12 dl-text-center">
      <h1 className="dl-text-3xl dl-font-bold dl-mb-2">404 - Page Not Found</h1>
      <p className="dl-text-muted-foreground dl-mb-6">
        The requested component documentation or guide does not exist.
      </p>
      <Button asChild variant="default">
        <Link href="/">Back to Catalog</Link>
      </Button>
    </div>
  );
}
