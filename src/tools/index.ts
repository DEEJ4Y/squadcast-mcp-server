import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import initOAuthTools from "./oauth";
import initTeamsTools from "./teams";
import initSchedulesTools from "./schedules";
import initIncidentsTools from "./incidents";

const initTools = (server: McpServer) => {
  initOAuthTools(server);
  initTeamsTools(server);
  initSchedulesTools(server);
  initIncidentsTools(server);
};

export default initTools;
