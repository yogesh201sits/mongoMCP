import { Command } from "commander";


export function databaseCommands(
  program: Command
) {

  const db =
    program.command("db");


  db
  .command("list")
  .description(
    "List databases"
  )
  .action(async()=>{

    console.log(
      "Listing databases..."
    );

  });

}