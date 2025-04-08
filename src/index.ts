import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import initTools from "./tools";
import getConfig from "./utils/config";

// Create server instance
const server = new McpServer({
  name: "squadcast-mcp-server",
  version: "0.1.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

initTools(server);

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("Squadcast MCP Server running on stdio");

  console.log("Config:", await getConfig());
}

try {
  main();
} catch (error) {
  console.error("Fatal error in main():", error);
  process.exit(1);
}
