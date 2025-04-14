import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import initOAuthTools from "./oauth";
import initTeamsTools from "./teams";
import initSchedulesTools from "./schedules";
import initIncidentsTools from "./incidents";
import initStatusPagesTools from "./statusPages";

const initTools = (server: McpServer) => {
  initOAuthTools(server);
  initTeamsTools(server);
  initSchedulesTools(server);
  initIncidentsTools(server);
  initStatusPagesTools(server);
};

export default initTools;
