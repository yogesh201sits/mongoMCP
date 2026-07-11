import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { registerDatabaseTools } from "./tools/database";
import { registerCollectionTools } from "./tools/collection";

export function createServer() {
  const server = new McpServer({
    name: "mongodb-kit",
    version: "0.1.0",
  });

  registerDatabaseTools(server);
  registerCollectionTools(server);

  return server;

}