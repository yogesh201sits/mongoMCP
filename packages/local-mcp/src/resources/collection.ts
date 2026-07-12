import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createMongo } from "../context";

export function registerCollectionResources(server: McpServer) {
  server.registerResource(
    "collection-sample",
    new ResourceTemplate("mongodb://{database}/{collection}/sample", {
      list: undefined,
    }),
    {
      title: "MongoDB Collection Sample",
      description: "Returns the first 10 documents from a MongoDB collection.",
    },
    async (uri, { database, collection }) => {
      const mongo = await createMongo(process.env.MONGODB_URI!);

      const documents = await mongo
        .database(database as string)
        .collection(collection as string)
        .find({}, { limit: 10 });

      await mongo.disconnect();

      return {
        contents: [
          {
            uri: uri.href,
            text: JSON.stringify(documents, null, 2),
          },
        ],
      };
    }
  );
}