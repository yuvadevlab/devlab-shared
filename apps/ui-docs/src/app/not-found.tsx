import React from "react";
import Link from "next/link";
import { Button, Stack } from "@yuva-devlab/ui";

/**
 * 404 Not Found page for DevLab UI Documentation.
 */
export default function NotFound() {
  return (
    <Stack align="center" gap={4} className="dl-p-12 dl-text-center">
      <h1 className="dl-text-3xl dl-font-bold">404 - Page Not Found</h1>
      <p className="dl-text-muted-foreground">
        The requested component documentation or guide does not exist.
      </p>
      <Button asChild variant="default">
        <Link href="/">Back to Catalog</Link>
      </Button>
    </Stack>
  );
}
