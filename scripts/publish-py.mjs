import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { execSync } from "node:child_process";

const pyprojectPath = resolve("packages/auth-py/pyproject.toml");
const pyproject = readFileSync(pyprojectPath, "utf8");
const match = pyproject.match(/^version\s*=\s*"([^"]+)"/m);

if (!match) {
  console.error("[publish-py] Could not extract version from pyproject.toml");
  process.exit(1);
}

const currentVersion = match[1];
console.log(
  `[publish-py] Checking PyPI release status for devlab-auth v${currentVersion}...`,
);

let publishedVersions = [];
try {
  const res = await fetch("https://pypi.org/pypi/devlab-auth/json", {
    headers: { "User-Agent": "devlab-shared-ci" },
  });
  if (res.ok) {
    const data = await res.json();
    publishedVersions = Object.keys(data.releases || {});
  }
} catch (err) {
  console.warn(
    "[publish-py] Warning: Could not reach PyPI API, will attempt publish:",
    err.message,
  );
}

if (publishedVersions.includes(currentVersion)) {
  console.log(
    `[publish-py] devlab-auth v${currentVersion} is already published on PyPI. Skipping.`,
  );
  process.exit(0);
}

console.log(
  `[publish-py] devlab-auth v${currentVersion} is not yet published. Building and publishing...`,
);
const authPyDir = resolve("packages/auth-py");

try {
  execSync("uv build", { cwd: authPyDir, stdio: "inherit" });
  execSync("uv publish", {
    cwd: authPyDir,
    stdio: "inherit",
    env: {
      ...process.env,
      UV_PUBLISH_TOKEN:
        process.env.UV_PUBLISH_TOKEN || process.env.PYPI_API_TOKEN,
    },
  });
  console.log(
    `[publish-py] Successfully published devlab-auth v${currentVersion} to PyPI!`,
  );
} catch (error) {
  console.error("[publish-py] Failed to publish to PyPI:", error.message);
  process.exit(1);
}
