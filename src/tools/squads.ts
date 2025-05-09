// filepath: /Users/omkar.ghag/sq/squadcast-mcp-server/src/tools/squads.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import z from "zod";
import { getTeamSquads } from "../services/teams/getTeamSquads";

const initSquadsTools = (server: McpServer) => {
  server.tool(
    "listSquads",
    "List all squads in the selected team.",
    {},
    getTeamSquads
  );
};

export default initSquadsTools;
