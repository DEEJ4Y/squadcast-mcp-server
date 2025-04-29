import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import listEscalationPolicies from "../services/escalation_policy/listEscalationPolicies";
import createEscalationPolicy from "../services/escalation_policy/createEscalationPolicy";

const initEscalationPolicyTools = (server: McpServer) => {
  server.tool("listEscalationPolicies", "List all escalation policies of the current team.", {}, listEscalationPolicies);
  
  server.tool(
    "createEscalationPolicy", 
    "Create a new escalation policy.", 
    {
        description: z.string().optional().describe("Optional description of the escalation policy"),
        name: z.string().describe("Name of the escalation policy"),
        owner_id: z.string().describe("Owner ID representing the team ID. Choose the current teamID."),
        repetition: z.number().optional().describe("Optional number of repetitions for escalation"),
        repeat_after: z.number().optional().describe("Optional time in minutes after which to repeat the escalation"),
        rules: z.array(
          z.object({
            escalationTime: z.number().optional().describe("Optional time in minutes before escalation"),
            isViaPersonal: z.boolean().optional().describe("Optional flag to indicate if notification is sent via personal contact"),
            entities: z.array(
              z.object({
                id: z.string().describe("User's ObjectId"),
                type: z.string().describe("Type of entity, e.g., 'user'")
              })
            ).describe("Array of entities to escalate to"),
            via: z.array(z.enum(["Email", "SMS", "Push", "Phone"])).describe("Array of notification channels. Can be 'Email', 'SMS', 'Push', 'Phone'")
          })
        ).describe("Array of escalation rules"),
        enable_incident_reminders: z.boolean().optional().default(false).describe("Flag to enable incident reminders"),
        incident_reminder_rules: z.array(z.any()).optional().default([]).describe("Rules for incident reminders"),
        enable_incident_retrigger: z.boolean().optional().default(false).describe("Flag to enable incident retriggering"),
        retrigger_after: z.number().optional().default(0).describe("Time in minutes after which to retrigger the incident"),
        entity_owner: z.object({
          id: z.string().describe("Owner's ObjectId"),
          type: z.string().describe("Type of the owner, either 'user' or 'team'")
        }).describe("Entity that owns this escalation policy")
    }, 
    createEscalationPolicy
  );
};

export default initEscalationPolicyTools;
