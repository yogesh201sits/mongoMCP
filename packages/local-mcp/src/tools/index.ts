import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { z } from "zod";
import { createMongo } from "../context";


export function registerIndexTools(server: McpServer) {
    server.registerTool(
        "list_indexes",
        {
            title: "List Indexes",
            description: "List indexes for a collection.",
            inputSchema: {
                uri: z.string(),
                database: z.string(),
                collection: z.string(),
            },
        },
        async ({ uri, database, collection }) => {
            const mongo = await createMongo(uri);

            const result = await mongo
                .database(database)
                .collection(collection)
                .listIndexes();

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
        "create_index",
        {
            title: "Create Index",
            description: "Create an index on a collection.",
            inputSchema: {
                uri: z.string(),
                database: z.string(),
                collection: z.string(),
                key: z.record(z.string(), z.union([z.literal(1), z.literal(-1)])),
            },
        },
        async ({ uri, database, collection, key }) => {
            const mongo = await createMongo(uri);

            const result = await mongo
                .database(database)
                .collection(collection)
                .createIndex(key);

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
        "drop_index",
        {
            title: "Drop Index",
            description: "Drop an index from a collection.",
            inputSchema: {
                uri: z.string(),
                database: z.string(),
                collection: z.string(),
                name: z.string(),
            },
        },
        async ({ uri, database, collection, name }) => {
            const mongo = await createMongo(uri);

            const result = await mongo
                .database(database)
                .collection(collection)
                .dropIndex(name);

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