import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createMongo } from "../context";
import "dotenv/config";

export function registerDatabaseResources(server: McpServer) {
  server.registerResource(
    "database",
    new ResourceTemplate("mongodb://{database}", {
      list: undefined,
    }),
    {
      title: "MongoDB Database",
      description: "Lists all collections in a MongoDB database.",
    },
    async (uri, { database }) => {
      const mongo = await createMongo(process.env.MONGODB_URI!);

      const collections = await mongo
        .database(database as string)
        .listCollections();

      await mongo.disconnect();

      return {
        contents: [
          {
            uri: uri.href,
            text: JSON.stringify(
              {
                database,
                collections,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );
}