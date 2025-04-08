import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import listIncidents from "../services/incidents/listIncidents";
import z from "zod";
import acknowledgeIncidents from "../services/incidents/acknowledge";
import resolveIncidents from "../services/incidents/resolve";

const initIncidentsTools = (server: McpServer) => {
  server.tool(
    "listIncidents",
    `List all incidents (with filters). Current time: ${new Date().toISOString()}.`,
    {
      startTime: z
        .string()
        .describe(
          "Filter by the start time of the incident in ISO format. Should be within the last 14 days."
        ),
      endTime: z
        .string()
        .describe(
          "Filter by the end time of the incident in ISO format. Should be within the last 14 days."
        ),
      status: z
        .array(z.string())
        .describe(
          "The status of the incident. Array of: 'triggered', 'acknowledged', 'resolved', 'suppressed'. Empty array for all incidents."
        ),
    },
    listIncidents
  );

  server.tool(
    "acknowledgeIncidents",
    "Acknowledge incidents given an array of incident IDs.",
    {
      incidentIds: z
        .array(z.string())
        .describe("An array of incident IDs to acknowledge."),
    },
    acknowledgeIncidents
  );

  server.tool(
    "resolveIncidents",
    "Resolve incidents given an array of incident IDs.",
    {
      incidentIds: z
        .array(z.string())
        .describe("An array of incident IDs to resolve."),
    },
    resolveIncidents
  );
};

export default initIncidentsTools;
