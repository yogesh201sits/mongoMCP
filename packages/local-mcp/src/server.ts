import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { registerDatabaseTools } from "./tools/database";
import { registerCollectionTools } from "./tools/collection";
import { registerIndexTools } from "./tools";
import {registerDatabaseResources} from "./resources/database"

export function createServer() {
  const server = new McpServer({
    name: "mongodb-kit",
    version: "0.1.0",
  });

  registerDatabaseTools(server);
  registerCollectionTools(server);
  registerIndexTools(server)

  registerDatabaseResources(server);

  return server;

}