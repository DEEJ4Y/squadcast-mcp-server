import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import getTeams from "../services/teams/getTeams";
import z from "zod";
import selectTeam from "../services/teams/selectTeam";

const initTeamsTools = (server: McpServer) => {
  server.tool("getTeams", "List all teams of the current user.", {}, getTeams);

  server.tool(
    "selectTeam",
    "Select a team to work on.",
    {
      teamId: z.string().describe("The ID of the team to select."),
    },
    selectTeam
  );
};

export default initTeamsTools;
