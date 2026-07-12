import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { createMongo } from "../context";

export function registerCollectionTools(server: McpServer) {
  server.registerTool(
    "find_documents",
    {
      title: "Find Documents",
      description: "Find documents in a MongoDB collection.",
      inputSchema: {
        uri: z.string(),
        database: z.string(),
        collection: z.string(),
        filter: z.record(z.string(), z.any()).optional(),
      },
    },
    async ({ uri, database, collection, filter }) => {
      const mongo = await createMongo(uri);

      const documents = await mongo
        .database(database)
        .collection(collection)
        .find(filter ?? {});

      await mongo.disconnect();

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(documents, null, 2),
          },
        ],
      };
    }
  );
  server.registerTool(
    "insert_document",
    {
      title: "Insert Document",
      description: "Insert a document into a MongoDB collection.",
      inputSchema: {
        uri: z.string(),
        database: z.string(),
        collection: z.string(),
        document: z.record(z.string(), z.any()),
      },
    },
    async ({ uri, database, collection, document }) => {
      const mongo = await createMongo(uri);

      const result = await mongo
        .database(database)
        .collection(collection)
        .insert(document);

      await mongo.disconnect();

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }
  );
  server.registerTool(
    "update_documents",
    {
      title: "Update Documents",
      description: "Update documents in a MongoDB collection.",
      inputSchema: {
        uri: z.string(),
        database: z.string(),
        collection: z.string(),
        filter: z.record(z.string(), z.any()),
        update: z.record(z.string(), z.any()),
      },
    },
    async ({ uri, database, collection, filter, update }) => {
      const mongo = await createMongo(uri);

      const result = await mongo
        .database(database)
        .collection(collection)
        .update(filter, update);

      await mongo.disconnect();

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }
  );
  server.registerTool(
    "delete_documents",
    {
      title: "Delete Documents",
      description: "Delete documents from a MongoDB collection.",
      inputSchema: {
        uri: z.string(),
        database: z.string(),
        collection: z.string(),
        filter: z.record(z.string(), z.any()),
      },
    },
    async ({ uri, database, collection, filter }) => {
      const mongo = await createMongo(uri);

      const result = await mongo
        .database(database)
        .collection(collection)
        .delete(filter);

      await mongo.disconnect();

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }
  );
  server.registerTool(
    "aggregate_documents",
    {
      title: "Aggregate Documents",
      description: "Run an aggregation pipeline.",
      inputSchema: {
        uri: z.string(),
        database: z.string(),
        collection: z.string(),
        pipeline: z.array(z.record(z.string(), z.any())),
      },
    },
    async ({ uri, database, collection, pipeline }) => {
      const mongo = await createMongo(uri);

      const result = await mongo
        .database(database)
        .collection(collection)
        .aggregate(pipeline);

      await mongo.disconnect();

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }
  );

}