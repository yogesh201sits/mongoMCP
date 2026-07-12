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

    server.registerPrompt(
        "aggregation-builder",
        {
            title: "Aggregation Builder",
            description: "Generate a MongoDB aggregation pipeline from a natural language request.",
            argsSchema: {
                database: z.string().describe("Database name"),
                collection: z.string().describe("Collection name"),
                request: z.string().describe("Natural language aggregation request"),
            },
        },
        async ({ database, collection, request }) => ({
            messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: `
                        You are an expert MongoDB engineer.

                        Database: ${database}
                        Collection: ${collection}

                        Before generating the pipeline, inspect the following resources:

                        - mongodb://${database}/${collection}/schema
                        - mongodb://${database}/${collection}/sample

                        User request:
                        ${request}

                        Generate:

                        1. A MongoDB aggregation pipeline.
                        2. Explain what each stage does.
                        3. Suggest any performance improvements if applicable.

                        Return only valid MongoDB aggregation syntax.
                                `.trim(),
                    },
                },
            ],
        })
    );

    server.registerPrompt(
        "explain-pipeline",
        {
            title: "Explain Aggregation Pipeline",
            description:
                "Explains what a MongoDB aggregation pipeline does stage by stage.",
            argsSchema: {
                pipeline: z
                    .string()
                    .describe("MongoDB aggregation pipeline as JSON"),
            },
        },
        async ({ pipeline }) => ({
            messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: `
You are a MongoDB aggregation expert.

Explain the following aggregation pipeline.

Pipeline:

${pipeline}

For each stage:

1. Explain what the stage does.
2. Explain why it is used.
3. Describe the intermediate result after the stage executes.

Finally provide:

- A plain English summary.
- Any potential performance concerns.
- Suggestions for optimization if applicable.
          `.trim(),
                    },
                },
            ],
        })
    );
}