import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { execSync } from "node:child_process";

const PYTHON_PACKAGES = [
  { dir: "packages/auth-py", pypiName: "devlab-auth" },
  { dir: "packages/agent-py", pypiName: "devlab-agent" },
];

for (const { dir, pypiName } of PYTHON_PACKAGES) {
  const pkgDir = resolve(dir);
  const pyprojectPath = resolve(pkgDir, "pyproject.toml");
  const pyproject = readFileSync(pyprojectPath, "utf8");
  const match = pyproject.match(/^version\s*=\s*"([^"]+)"/m);

  if (!match) {
    console.error(
      `[publish-py] Could not extract version from ${dir}/pyproject.toml`,
    );
    process.exit(1);
  }

  const currentVersion = match[1];
  console.log(
    `[publish-py] Checking PyPI release status for ${pypiName} v${currentVersion}...`,
  );

  let publishedVersions = [];
  try {
    const res = await fetch(`https://pypi.org/pypi/${pypiName}/json`, {
      headers: { "User-Agent": "devlab-shared-ci" },
    });
    if (res.ok) {
      const data = await res.json();
      publishedVersions = Object.keys(data.releases || {});
    }
  } catch (err) {
    console.warn(
      `[publish-py] Warning: Could not reach PyPI API for ${pypiName}, will attempt publish:`,
      err.message,
    );
  }

  if (publishedVersions.includes(currentVersion)) {
    console.log(
      `[publish-py] ${pypiName} v${currentVersion} is already published on PyPI. Skipping.`,
    );
    continue;
  }

  console.log(
    `[publish-py] ${pypiName} v${currentVersion} is not yet published. Building and publishing...`,
  );

  try {
    execSync("uv build", { cwd: pkgDir, stdio: "inherit" });
    execSync("uv publish", {
      cwd: pkgDir,
      stdio: "inherit",
      env: {
        ...process.env,
        UV_PUBLISH_TOKEN:
          process.env.UV_PUBLISH_TOKEN || process.env.PYPI_API_TOKEN,
      },
    });
    console.log(
      `[publish-py] Successfully published ${pypiName} v${currentVersion} to PyPI!`,
    );
  } catch (error) {
    console.error(
      `[publish-py] Failed to publish ${pypiName} to PyPI:`,
      error.message,
    );
    process.exit(1);
  }
}
