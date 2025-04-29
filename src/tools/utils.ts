import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import getTime from "../services/utils/getTime";

const initUtilsTools = (server: McpServer) => {
  server.tool("getTime", "Get the current time in ISO format.", {}, getTime);
};

export default initUtilsTools;
