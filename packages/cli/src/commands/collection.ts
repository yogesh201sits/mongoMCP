import { Command } from "commander";
import { createMongo } from "../context";

export function collectionCommands(program: Command) {
  const collection = program.command("collection");

  collection
    .command("find <database> <collection>")
    .description("Find documents")
    .option("--filter <json>", "MongoDB filter")
    .option("--limit <number>", "Limit results")
    .option("--skip <number>", "Skip documents")
    .option("--sort <json>", "Sort document")
    .action(async (database, collectionName, options) => {
      const { uri } = program.opts();

      const mongo = await createMongo(uri);

      const documents = await mongo
        .database(database)
        .collection(collectionName)
        .find(
          options.filter ? JSON.parse(options.filter) : {},
          {
            limit: options.limit
              ? Number(options.limit)
              : undefined,

            skip: options.skip
              ? Number(options.skip)
              : undefined,

            sort: options.sort
              ? JSON.parse(options.sort)
              : undefined,
          }
        );

      console.log(JSON.stringify(documents, null, 2));

      await mongo.disconnect();
    });
}