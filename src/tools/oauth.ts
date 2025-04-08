import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import isAuthenticated from "../services/auth/isAuthenticated";

const initOAuthTools = (server: McpServer) => {
  server.tool(
    "isAuthenticated",
    "Check if the user is authenticated.",
    {},
    isAuthenticated
  );
};

export default initOAuthTools;
