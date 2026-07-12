import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createMongo } from "../context";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

const envPath = fileURLToPath(new URL("../../.env", import.meta.url));
dotenv.config({ path: envPath });

function getMongoUri(): string {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("Missing MONGODB_URI environment variable");
  }

  return mongoUri;
}

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
      const mongo = await createMongo(getMongoUri());

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