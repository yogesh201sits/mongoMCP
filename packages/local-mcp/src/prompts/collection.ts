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

    server.registerPrompt(
        "schema-summary",
        {
            title: "Schema Summary",
            description:
                "Summarizes a MongoDB collection schema and provides insights.",
            argsSchema: {
                database: z.string().describe("Database name"),
                collection: z.string().describe("Collection name"),
            },
        },
        async ({ database, collection }) => ({
            messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: `
                        You are an experienced MongoDB database architect.

                        Database: ${database}
                        Collection: ${collection}

                        Before answering, inspect the following resource:

                        - mongodb://${database}/${collection}/schema

                        Provide:

                        1. A brief summary of the collection's purpose.
                        2. An explanation of each field and its inferred type.
                        3. Any nested objects or arrays that may require special attention.
                        4. Fields that appear to be optional or nullable.
                        5. Suggestions to improve the schema design, if applicable.
                        6. Any potential indexing opportunities based on the schema.

                        Present the response in a clear, developer-friendly format.
                `.trim(),
                    },
                },
            ],
        })
    );
    server.registerPrompt(
        "query-optimizer",
        {
            title: "Query Optimizer",
            description: "Analyze and optimize a MongoDB query.",
            argsSchema: {
                database: z.string().describe("Database name"),
                collection: z.string().describe("Collection name"),
                query: z.string().describe("MongoDB query to optimize"),
            },
        },
        async ({ database, collection, query }) => ({
            messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: `
            You are a MongoDB performance expert.

            Database: ${database}
            Collection: ${collection}

            Before answering, inspect the following resources:

            - mongodb://${database}/${collection}/schema
            - mongodb://${database}/${collection}/indexes

            Analyze the following MongoDB query:

            ${query}

            Provide:

            1. An explanation of what the query does.
            2. Potential performance issues.
            3. Whether existing indexes are sufficient.
            4. Recommended indexes, if any.
            5. Suggestions to improve filtering, sorting, and projection.
            6. Any other best practices to improve performance.

            Present the optimized query if improvements can be made.
        `.trim(),
                    },
                },
            ],
        })
    );
    server.registerPrompt(
        "index-advisor",
        {
            title: "Index Advisor",
            description: "Recommend MongoDB indexes based on a collection and workload.",
            argsSchema: {
                database: z.string().describe("Database name"),
                collection: z.string().describe("Collection name"),
                workload: z
                    .string()
                    .describe("Description of the application's query workload"),
            },
        },
        async ({ database, collection, workload }) => ({
            messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: `
                            You are an expert MongoDB database administrator specializing in query optimization and indexing.

                            Database: ${database}
                            Collection: ${collection}

                            Before answering, inspect the following resources:

                            - mongodb://${database}/${collection}/schema
                            - mongodb://${database}/${collection}/sample
                            - mongodb://${database}/${collection}/indexes

                            Application workload:

                            ${workload}

                            Based on the schema, sample documents, existing indexes, and workload, provide:

                            1. An evaluation of the current indexing strategy.
                            2. Recommended single-field indexes.
                            3. Recommended compound indexes.
                            4. Whether unique indexes are appropriate.
                            5. Whether partial indexes would be beneficial.
                            6. Whether TTL indexes would be beneficial.
                            7. Any redundant or unused indexes that could be removed.
                            8. The expected performance impact of each recommendation.
                            9. Example MongoDB commands to create the recommended indexes.

                            Explain the reasoning behind every recommendation.
        `.trim(),
                    },
                },
            ],
        })
    );
}