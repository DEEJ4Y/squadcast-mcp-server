import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import listEscalationPolicies from "../services/escalation_policy/listEscalationPolicies";
import createEscalationPolicy from "../services/escalation_policy/createEscalationPolicy";
import { time } from "console";

const initEscalationPolicyTools = (server: McpServer) => {
  server.tool("listEscalationPolicies", "List all escalation policies of the current team.", {}, listEscalationPolicies);
  
  server.tool(
    "createEscalationPolicy", 
    "Create a new escalation policy.", 
    {
        description: z.string().optional().describe("Optional description of the escalation policy"),
        name: z.string().describe("Name of the escalation policy"),
        owner_id: z.string().describe("Owner ID representing the team ID. Choose the current teamID."),
        repetition: z.number().optional().describe("Optional number of repetitions for escalation. Should be greater than 0 and less than 3."),
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
            ).describe("Array of entities to escalate to. Cannot be empty."),
            via: z.array(z.enum(["Email", "SMS", "Push", "Phone"])).describe("Array of notification channels. Can be 'Email', 'SMS', 'Push', 'Phone'.")
          })
        ).describe("Array of escalation rules. Cannot be empty."),
        enable_incident_reminders: z.boolean().optional().default(false).describe("Flag to enable incident reminders"),
        incident_reminder_rules: z.array(
          z.object({
            time_interval: z.number().describe("Time interval in minutes for reminders. Must be greater than 1 hr and less than 24 hrs"),
            till: z.number().describe("Time in minutes until reminders are sent"),
            via: z.array(z.enum(["email", "sms", "push", "phone"])).describe("Array of notification channels. Can be 'Email', 'SMS', 'Push', 'Phone'. Cannot be empty.")
          })
        ).describe("Rules for incident reminders. Cannot be empty if enable_incident_reminders is true."),
        enable_incident_retrigger: z.boolean().optional().default(false).describe("Flag to enable incident retriggering. Must be true if incident_retrigger_after is set"),
        retrigger_after: z.number().optional().default(0).describe("Time in hours after which to retrigger the incident. If enable_incident_retrigger is true, this must be between 1-48 hours"),
        entity_owner: z.object({
          id: z.string().describe("Users's ObjectId"),
          type: z.string().describe("Type of the owner, e.g., 'user'")
        }).describe("Entity that owns this escalation policy")
    }, 
    createEscalationPolicy
  );
};

export default initEscalationPolicyTools;
