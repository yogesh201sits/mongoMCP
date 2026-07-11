import { Command } from "commander";
import { createMongo } from "../context";
import { readFile } from "node:fs/promises";

export function indexCommands(program: Command) {
  const index = program.command("index");

  index
    .command("list <database> <collection>")
    .description("List indexes")
    .action(async (database, collectionName) => {
      const { uri } = program.opts();

      const mongo = await createMongo(uri);

      const indexes = await mongo
        .database(database)
        .collection(collectionName)
        .listIndexes();

      console.log(JSON.stringify(indexes, null, 2));

      await mongo.disconnect();
    });


index
  .command("create <database> <collection>")
  .description("Create an index")
  .requiredOption("--key <path>", "Path to index key JSON")
  .action(async (database, collectionName, options) => {
    const { uri } = program.opts();

    const mongo = await createMongo(uri);

    const keyContent = await readFile(options.key, "utf-8");
    const key = JSON.parse(keyContent);
    

    const result = await mongo
     .database(database)
     .collection(collectionName)
     .createIndex(key);

    console.log(JSON.stringify(result, null, 2));

    await mongo.disconnect();
  });
}

