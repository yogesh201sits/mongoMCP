#!/usr/bin/env bun

import { Command } from "commander";
import { databaseCommands } from "./commands/database";
import { collectionCommands } from "./commands/collection";
import { indexCommands } from "./commands/index";


const program = new Command();

program
  .name("mongodb-kit")
  .description("MongoDB toolkit CLI")
  .version("0.1.0")
  .requiredOption(
    "--uri <uri>",
    "MongoDB connection URI"
  );

//register commands
databaseCommands(program);
collectionCommands(program);
indexCommands(program);

// Parse CLI arguments
program.parse();