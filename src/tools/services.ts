import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import getServices from "../services/services/getServices";

const initServiceTools = (server: McpServer) => {
  server.tool(
    "getServices",
    "Get a list of services.",
    {},
    getServices
  );
};

export default initServiceTools;
