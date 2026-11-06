import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

/** Executes shell command synchronously and returns stdout */
function exec(cmd) {
  try {
    return execSync(cmd, {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    }).trim();
  } catch (err) {
    if (err.stdout) return err.stdout.toString().trim();
    throw err;
  }
}

/** Formats UTC date string (e.g. "Nov 6, 2026") */
function formatDate(d) {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Parses changesets from .changeset directory */
function getChangesets() {
  const dir = path.resolve(".changeset");
  const releases = [];
  if (!fs.existsSync(dir)) return releases;
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && f !== "README.md");
  for (const f of files) {
    const content = fs.readFileSync(path.join(dir, f), "utf8");
    const m = content.match(/^---\n([\s\S]*?)\n---/);
    if (!m) continue;
    m[1]
      .split("\n")
      .filter((l) => l.trim())
      .forEach((l) => {
        const [pkg, bump] = l
          .split(":")
          .map((s) => s.trim().replace(/["']/g, ""));
        if (pkg && bump) releases.push({ pkg, bump, file: f });
      });
  }
  return releases;
}

/** Groups commits by Conventional Commit category */
function groupCommits(commits) {
  const groups = {
    features: [],
    fixes: [],
    refactors: [],
    docs: [],
    chores: [],
    other: [],
  };
  for (const c of commits) {
    const s = c.subject.trim();
    if (/^feat(\(.*?\))?:/i.test(s)) groups.features.push(c);
    else if (/^fix(\(.*?\))?:/i.test(s)) groups.fixes.push(c);
    else if (/^refactor(\(.*?\))?:/i.test(s)) groups.refactors.push(c);
    else if (/^docs(\(.*?\))?:/i.test(s)) groups.docs.push(c);
    else if (/^(chore|ci|test|perf|style|build)(\(.*?\))?:/i.test(s))
      groups.chores.push(c);
    else groups.other.push(c);
  }
  return groups;
}

async function main() {
  const isDryRun = process.argv.includes("--dry-run");
  try {
    exec("git fetch origin main dev");
  } catch {}

  let count = 0;
  try {
    count =
      parseInt(exec("git rev-list --count origin/main..origin/dev"), 10) || 0;
  } catch {
    count = parseInt(exec("git rev-list --count origin/main..HEAD"), 10) || 0;
  }

  console.log(`📊 Commits in dev ahead of main: ${count}`);
  if (count === 0) {
    console.log("✅ 'dev' is up to date with 'main'. No PR needed.");
    return;
  }

  let raw = "";
  try {
    raw = exec('git log origin/main..origin/dev --pretty=format:"%h%x09%s"');
  } catch {
    raw = exec('git log origin/main..HEAD --pretty=format:"%h%x09%s"');
  }

  const commits = raw
    ? raw
        .split("\n")
        .filter(Boolean)
        .map((l) => {
          const [h, ...s] = l.split("\t");
          return { hash: h, subject: s.join("\t") };
        })
    : [];

  const groups = groupCommits(commits);
  const releases = getChangesets();
  const highestBump = releases.some((r) => r.bump === "major")
    ? "major"
    : releases.some((r) => r.bump === "minor")
      ? "minor"
      : "patch";
  const prefix =
    groups.features.length > 0 || highestBump !== "patch" ? "feat" : "chore";
  const prTitle = `${prefix}: promote dev to main (${formatDate(new Date())})`;

  const list = (items) =>
    items.map((c) => `- \`${c.hash}\` ${c.subject}`).join("\n");
  const sections = [
    "## 🚀 Promotion from `dev` to `main`\n",
    "Automated pull request promoting merged changes from `dev` into `main` for release staging.\n",
  ];

  if (releases.length > 0) {
    sections.push("### 📦 Pending Package Releases\n");
    sections.push("| Package | Release Type | Changeset |");
    sections.push("| :--- | :--- | :--- |");
    for (const r of releases) {
      const b =
        r.bump === "major"
          ? "🔴 **major**"
          : r.bump === "minor"
            ? "🟡 **minor**"
            : "🟢 **patch**";
      sections.push(`| \`${r.pkg}\` | ${b} | \`.changeset/${r.file}\` |`);
    }
    sections.push("");
  }

  sections.push(`### 📝 Included Commits (${commits.length})\n`);
  if (groups.features.length)
    sections.push("#### 🚀 Features\n" + list(groups.features) + "\n");
  if (groups.fixes.length)
    sections.push("#### 🐛 Bug Fixes\n" + list(groups.fixes) + "\n");
  if (groups.refactors.length)
    sections.push("#### ♻️ Refactoring\n" + list(groups.refactors) + "\n");
  if (groups.docs.length)
    sections.push("#### 📝 Documentation\n" + list(groups.docs) + "\n");
  if (groups.chores.length)
    sections.push(
      "#### ⚙️ Maintenance & Chores\n" + list(groups.chores) + "\n",
    );
  if (groups.other.length)
    sections.push("#### 📦 Other Commits\n" + list(groups.other) + "\n");

  sections.push("### 🛡️ Quality Gate & Release Flow");
  sections.push(
    "- ✅ Validates W3C Cascade Layers, design tokens, and the 250-line rule.",
  );
  sections.push(
    "- 📦 Merging into `main` triggers automated versioning and package publishing.",
  );
  sections.push("- 🔄 Release commits will be reverse-synced back to `dev`.\n");
  sections.push(`*Last automated update: ${new Date().toISOString()}*`);

  const prBody = sections.join("\n");
  if (isDryRun) {
    console.log(
      `\n📋 PR Title: ${prTitle}\n\n[DRY RUN] Generated Body:\n${prBody}`,
    );
    return;
  }

  const tmpPath = path.resolve(".pr-body-dev-to-main.md");
  fs.writeFileSync(tmpPath, prBody, "utf8");

  let existing = null;
  try {
    const out = exec(
      "gh pr list --base main --head dev --state open --json number,title,url",
    );
    const arr = JSON.parse(out || "[]");
    if (arr.length > 0) existing = arr[0];
  } catch {}

  try {
    if (existing) {
      console.log(
        `🔄 Updating existing PR #${existing.number} (${existing.url})...`,
      );
      exec(
        `gh pr edit ${existing.number} --title "${prTitle}" --body-file "${tmpPath}"`,
      );
      console.log(`✅ Successfully updated PR #${existing.number}`);
    } else {
      console.log("📝 Creating new PR from dev to main...");
      const res = exec(
        `gh pr create --base main --head dev --title "${prTitle}" --body-file "${tmpPath}"`,
      );
      console.log(`✅ Created PR: ${res}`);
    }
  } finally {
    try {
      fs.unlinkSync(tmpPath);
    } catch {}
  }
}

main().catch((err) => {
  console.error("❌ Error executing promote-dev-to-main:", err);
  process.exit(1);
});
