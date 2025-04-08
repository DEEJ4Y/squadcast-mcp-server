import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import whoIsOnCall from "../services/schedules/whoIsOnCall";

const initSchedulesTools = (server: McpServer) => {
  server.tool(
    "whoIsOnCall",
    "Get the user(s) who is currently on call.",
    {},
    whoIsOnCall
  );
};

export default initSchedulesTools;
