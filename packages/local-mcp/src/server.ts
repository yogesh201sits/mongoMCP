import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export function createServer() {
  return new McpServer({
    name: "mongodb-kit",
    version: "0.1.0",
  });
}