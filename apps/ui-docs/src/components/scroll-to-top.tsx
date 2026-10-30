"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Automatically scrolls the main scrollable container and window to the top
 * on initial page load and on every route/pathname transition.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const isFirstMount = useRef(true);

  useEffect(() => {
    const scrollToTopNow = () => {
      // 1. Scroll window and document elements
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }

      // 2. Scroll the main content container
      const mainEl =
        document.getElementById("main-content") ||
        document.querySelector("main");
      if (mainEl) {
        mainEl.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        mainEl.scrollTop = 0;
      }
    };

    // Immediate scroll
    scrollToTopNow();

    // Secondary scroll via requestAnimationFrame to ensure Next.js DOM hydrate completes
    const rafId = requestAnimationFrame(() => {
      scrollToTopNow();
    });

    isFirstMount.current = false;

    return () => cancelAnimationFrame(rafId);
  }, [pathname]);

  return null;
}
