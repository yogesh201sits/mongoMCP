import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { createMongo } from "../context";

export function registerDatabaseTools(
  server: McpServer
) {
  server.registerTool(
    "list_collections",
    {
      title: "List Collections",
      description: "List all collections in a MongoDB database.",
      inputSchema: {
        uri: z.string(),
        database: z.string(),
      },
    },
    async ({ uri, database }) => {
      const mongo = await createMongo(uri);

      const collections = await mongo
        .database(database)
        .listCollections();

      await mongo.disconnect();

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(collections, null, 2),
          },
        ],
      };
    }
  );
}