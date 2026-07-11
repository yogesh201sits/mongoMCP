import { Command } from "commander";
import { createMongo } from "../context";

export function databaseCommands(program: Command) {
  const db = program.command("db");

  db
    .command("collections <database>")
    .description("List collections")
    .action(async (database) => {
      const { uri } = program.opts();

      const mongo = await createMongo(uri);

      const collections = await mongo
        .database(database)
        .listCollections();

      console.log(collections);

      await mongo.disconnect();
    });
}