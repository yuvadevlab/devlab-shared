/**
 * Canonical fixed deployment URLs for the DevLab UI documentation and Storybook portals.
 */
export const UI_DOCS_URLS = {
  /** Production Vercel URL for @yuva-devlab/ui-docs */
  DOCS_PROD: "https://devlab-ui-docs-yuvadevlab.vercel.app",
  /** Production Vercel URL for @yuva-devlab/ui-storybook */
  STORYBOOK_PROD: "https://devlab-ui-storybook-yuvadevlab.vercel.app",
  /** Local Storybook development server URL */
  STORYBOOK_DEV: "http://localhost:6005",
} as const;

/**
 * Resolves the canonical public base URL for @yuva-devlab/ui-docs.
 *
 * @returns Fully qualified URL string without trailing slash.
 */
export function resolveDocsBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || UI_DOCS_URLS.DOCS_PROD).replace(
    /\/+$/,
    "",
  );
}

/**
 * Resolves the public Storybook URL based on environment overrides.
 *
 * @returns Fully qualified Storybook URL string without trailing slash.
 */
export function resolveStorybookUrl(): string {
  if (process.env.NEXT_PUBLIC_STORYBOOK_URL) {
    return process.env.NEXT_PUBLIC_STORYBOOK_URL.replace(/\/+$/, "");
  }
  return process.env.NODE_ENV === "development"
    ? UI_DOCS_URLS.STORYBOOK_DEV
    : UI_DOCS_URLS.STORYBOOK_PROD;
}
