import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod"

export function registerCollectionPrompts(server: McpServer) {
    server.registerPrompt(
        "mongodb-query-helper",
        {
            title: "MongoDB Query Helper",
            description: "Generate MongoDB queries from natural language.",
            argsSchema: {
                database: z.string(),
                collection: z.string(),
                request: z.string(),
            },
        },
        async ({ database, collection, request }) => ({
            messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: `
                        You are a MongoDB expert.

                        Database: ${database}
                        Collection: ${collection}

                        Before generating a query, inspect the collection schema using:

                        mongodb://${database}/${collection}/schema

                        User request:
                        ${request}

                        Generate the appropriate MongoDB query and briefly explain it.
                                `.trim(),
                    },
                },
            ],
        })
    );
}