import { Command } from "commander";
import { createMongo } from "../context";

export function collectionCommands(program: Command) {
  const collection = program.command("collection");

  collection
    .command("find <database> <collection>")
    .description("Find all documents")
    .action(async (database, collectionName) => {
      const { uri } = program.opts();

      const mongo = await createMongo(uri);

      const documents = await mongo
        .database(database)
        .collection(collectionName)
        .find();

      console.log(JSON.stringify(documents, null, 2));

      await mongo.disconnect();
    });
}