import { Command } from "commander";
import { createMongo } from "../context";
import { readFile } from "node:fs/promises";
import { readJsonFile } from "../utils/file";

export function collectionCommands(program: Command) {
  const collection = program.command("collection");
  
  //find
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

  //read
  collection
    .command("insert <database> <collection>")
    .description("Insert a document")
    .requiredOption("--file <path>", "Path to a JSON file")
    .action(async (database, collectionName, options) => {
      const { uri } = program.opts();

      const mongo = await createMongo(uri);

      const fileContent = await readFile(options.file, "utf-8");
      const document = JSON.parse(fileContent);

      const result = await mongo
        .database(database)
        .collection(collectionName)
        .insert(document);

      console.log(JSON.stringify(result, null, 2));

      await mongo.disconnect();
    });

    //update
  collection
  .command("update <database> <collection>")
  .description("Update documents")
  .requiredOption("--filter <path>", "Path to filter JSON file")
  .requiredOption("--update <path>", "Path to update JSON file")
  .action(async (database, collectionName, options) => {
    const { uri } = program.opts();

    const mongo = await createMongo(uri);

    const filterContent = await readFile(options.filter, "utf-8");
    const filter = JSON.parse(filterContent);

    const updateContent = await readFile(options.update, "utf-8");
    const update = JSON.parse(updateContent);

    const result = await mongo
      .database(database)
      .collection(collectionName)
      .update(filter, update);

    console.log(JSON.stringify(result, null, 2));

    await mongo.disconnect();
  });
  
  //delete
  collection
  .command("delete <database> <collection>")
  .description("Delete documents")
  .requiredOption(
    "--filter <path>",
    "Path to filter JSON file"
  )
  .action(async (database, collectionName, options) => {
    const { uri } = program.opts();

    const mongo = await createMongo(uri);

    const filterContent = await readFile(
      options.filter,
      "utf-8"
    );

    const filter = JSON.parse(filterContent);

    const result = await mongo
      .database(database)
      .collection(collectionName)
      .delete(filter);

    console.log(
      JSON.stringify(result, null, 2)
    );

    await mongo.disconnect();
  });

  //aggregate
  collection
  .command("aggregate <database> <collection>")
  .description("Run an aggregation pipeline")
  .requiredOption(
    "--pipeline <path>",
    "Path to aggregation pipeline JSON"
  )
  .action(async (database, collectionName, options) => {
    const { uri } = program.opts();

    const mongo = await createMongo(uri);

    const pipelineContent = await readFile(
      options.pipeline,
      "utf-8"
    );

    const pipeline = JSON.parse(pipelineContent);

    const result = await mongo
      .database(database)
      .collection(collectionName)
      .aggregate(pipeline);

    console.log(
      JSON.stringify(result, null, 2)
    );

    await mongo.disconnect();
  });

}