/**
 * @file packages/cli/src/index.ts
 * @description Main entrypoint for the Yuva DevLab Developer Platform CLI (devlab).
 * @author yuva.devlab@gmail.com
 */

import { Command } from "commander";
import { registerPortsCommand } from "./commands/ports.command";
import { registerDoctorCommand } from "./commands/doctor.command";
import { registerStatusCommand } from "./commands/status.command";
import { registerInfraCommand } from "./commands/infra.command";
import { registerTokenCommand } from "./commands/token.command";

const program = new Command();

program
  .name("devlab")
  .description(
    "Yuva DevLab Developer Platform CLI — Ecosystem Operations & Tooling",
  )
  .version("1.0.0");

// Register modular commands
registerPortsCommand(program);
registerDoctorCommand(program);
registerStatusCommand(program);
registerInfraCommand(program);
registerTokenCommand(program);

program.parse(process.argv);
