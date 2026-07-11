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
}