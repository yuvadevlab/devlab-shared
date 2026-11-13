/**
 * @file packages/cli/src/commands/token.command.ts
 * @description JWT inspection, claims decoding, and Portal JWKS key diagnostic.
 * @author yuva.devlab@gmail.com
 */

import chalk from "chalk";
import { Command } from "commander";
import {
  printBanner,
  printSection,
  printKeyValue,
  formatBadge,
  BadgeStatus,
} from "../utils/terminal.util";
import { DEFAULT_JWKS_PATH } from "../constants/services.constants";

const DEFAULT_PORTAL_JWKS_URL = `http://localhost:4000${DEFAULT_JWKS_PATH}`;

interface DecodedHeader {
  alg?: string;
  typ?: string;
  kid?: string;
}

interface DecodedPayload {
  sub?: string;
  email?: string;
  name?: string;
  role?: string;
  tenant_id?: string;
  exp?: number;
  iat?: number;
  iss?: string;
  aud?: string;
  [key: string]: unknown;
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return Buffer.from(base64, "base64").toString("utf8");
}

/**
 * Registers the 'token' command suite.
 */
export function registerTokenCommand(program: Command): void {
  const tokenCmd = program
    .command("token")
    .description("Inspect, decode, and diagnose JWT tokens and OIDC JWKS keys");

  tokenCmd
    .command("inspect <jwt>")
    .description(
      "Decode base64 claims and evaluate token validity without verification",
    )
    .action((jwt: string) => {
      printBanner("JWT Payload & Claim Inspection");

      const parts = jwt.trim().split(".");
      if (parts.length !== 3) {
        console.error(
          chalk.red(
            "  ✗ Error: Invalid JWT format. Expected 3 dot-separated segments.",
          ),
        );
        process.exit(1);
      }

      const [headerPart, payloadPart] = parts as [string, string, string];

      let header: DecodedHeader = {};
      let payload: DecodedPayload = {};

      try {
        header = JSON.parse(base64UrlDecode(headerPart)) as DecodedHeader;
        payload = JSON.parse(base64UrlDecode(payloadPart)) as DecodedPayload;
      } catch (err) {
        console.error(
          chalk.red(
            `  ✗ Error: Failed to parse JSON claims: ${(err as Error).message}`,
          ),
        );
        process.exit(1);
      }

      printSection("Token Metadata");
      printKeyValue("Algorithm", header.alg || "Unknown");
      printKeyValue("Key ID (kid)", header.kid || "None");
      printKeyValue("Type", header.typ || "JWT");

      printSection("Subject Claims");
      printKeyValue("Subject (sub)", payload.sub || "None");
      printKeyValue("Email", payload.email || "None");
      printKeyValue("Role", payload.role || "None");
      printKeyValue("Tenant ID", payload.tenant_id || "None");

      printSection("Temporal Validity");
      if (payload.exp) {
        const expDate = new Date(payload.exp * 1000);
        const now = Date.now();
        const diffSec = Math.round((expDate.getTime() - now) / 1000);
        const isExpired = diffSec <= 0;

        const badge = isExpired
          ? formatBadge(BadgeStatus.ERROR, "EXPIRED")
          : formatBadge(BadgeStatus.SUCCESS, "ACTIVE");

        printKeyValue("Status", badge);
        printKeyValue("Expires At", expDate.toISOString());
        printKeyValue(
          "Remaining",
          isExpired
            ? chalk.red(`Expired ${Math.abs(diffSec)} seconds ago`)
            : chalk.green(`${diffSec} seconds remaining`),
        );
      } else {
        printKeyValue(
          "Status",
          formatBadge(BadgeStatus.WARNING, "NO EXPIRATION"),
        );
      }

      if (payload.iat) {
        printKeyValue("Issued At", new Date(payload.iat * 1000).toISOString());
      }
      console.log("");
    });

  tokenCmd
    .command("jwks")
    .description(
      "Fetch and inspect public signing keys from DevLab Portal API (:4000)",
    )
    .option("-u, --url <url>", "JWKS URL", DEFAULT_PORTAL_JWKS_URL)
    .action(async (options: { url: string }) => {
      printBanner("DevLab Portal JWKS Discovery");
      console.log(chalk.gray(`  Fetching: ${options.url}\n`));

      try {
        const res = await fetch(options.url);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        const json = (await res.json()) as {
          keys?: Array<Record<string, unknown>>;
        };
        const keys = json.keys || [];

        printSection(`Retrieved ${keys.length} Public Key(s)`);
        keys.forEach((key, index) => {
          console.log(`  ${chalk.cyan.bold(`Key #${index + 1}`)}`);
          printKeyValue("  kid", String(key.kid));
          printKeyValue("  kty", String(key.kty));
          printKeyValue("  alg", String(key.alg));
          printKeyValue("  use", String(key.use));
          console.log("");
        });
      } catch (err) {
        console.error(
          chalk.red(`  ✗ Failed to fetch JWKS: ${(err as Error).message}`),
        );
        console.log(
          chalk.gray(
            "    Make sure DevLab Portal API is running on http://localhost:4000",
          ),
        );
      }
    });
}
