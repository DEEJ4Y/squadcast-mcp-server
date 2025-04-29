import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import listIncidents from "../services/incidents/listIncidents";
import z from "zod";
import acknowledgeIncidents from "../services/incidents/acknowledge";
import resolveIncidents from "../services/incidents/resolve";
import updateIncidentPriorities from "../services/incidents/priority/update";
import addIncidentNote from "../services/incidents/notes/add";

const initIncidentsTools = (server: McpServer) => {
  server.tool(
    "listIncidents",
    `List all incidents (with filters). Use the 'getTime' tool to get the current time.`,
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

  // Priority
  server.tool(
    "updateIncidentPriorities",
    "Update the priority of incidents given an array of incident IDs and a priority.",
    {
      incidentIds: z
        .array(z.string())
        .describe("An array of incident IDs to update."),
      priority: z
        .string()
        .describe(
          "The priority of the incident. Should be one of: 'UNSET', 'P1', 'P2', 'P3', 'P4', 'P5'."
        ),
    },
    updateIncidentPriorities
  );

  // Notes
  server.tool(
    "addIncidentNote",
    "Add a note to an incident given an incident ID and a note.",
    {
      incidentId: z
        .string()
        .describe("The ID of the incident to add a note to."),
      note: z.string().describe("The note to add to the incident."),
    },
    addIncidentNote
  );
};

export default initIncidentsTools;
