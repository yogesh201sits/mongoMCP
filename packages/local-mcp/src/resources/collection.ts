import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createMongo } from "../context";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";
import { inferSchema } from "../utils/infer-schema";

const envPath = fileURLToPath(new URL("../../.env", import.meta.url));
dotenv.config({ path: envPath });

function getMongoUri(): string {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        throw new Error("Missing MONGODB_URI environment variable");
    }

    return mongoUri;
}

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
            const mongo = await createMongo(getMongoUri());

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
    server.registerResource(
        "collection-indexes",
        new ResourceTemplate("mongodb://{database}/{collection}/indexes", {
            list: undefined,
        }),
        {
            title: "MongoDB Collection Indexes",
            description: "Lists all indexes for a MongoDB collection.",
        },
        async (uri, { database, collection }) => {
            const mongo = await createMongo(getMongoUri());

            const indexes = await mongo
                .database(database as string)
                .collection(collection as string)
                .listIndexes();

            await mongo.disconnect();

            return {
                contents: [
                    {
                        uri: uri.href,
                        text: JSON.stringify(indexes, null, 2),
                    },
                ],
            };
        }
    );
    server.registerResource(
        "collection-schema",
        new ResourceTemplate("mongodb://{database}/{collection}/schema", {
            list: undefined,
        }),
        {
            title: "MongoDB Collection Schema",
            description: "Infers the schema from the first 20 documents.",
        },
        async (uri, { database, collection }) => {
            const mongo = await createMongo(getMongoUri());

            const documents = await mongo
                .database(database as string)
                .collection(collection as string)
                .find({}, { limit: 20 });

            await mongo.disconnect();

            return {
                contents: [
                    {
                        uri: uri.href,
                        text: JSON.stringify(inferSchema(documents), null, 2),
                    },
                ],
            };
        }
    );
}