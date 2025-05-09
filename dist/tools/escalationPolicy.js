"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const listEscalationPolicies_1 = __importDefault(require("../services/escalation_policy/listEscalationPolicies"));
const createEscalationPolicy_1 = __importDefault(require("../services/escalation_policy/createEscalationPolicy"));
const initEscalationPolicyTools = (server) => {
    server.tool("listEscalationPolicies", "List all escalation policies of the current team.", {}, listEscalationPolicies_1.default);
    server.tool("createEscalationPolicy", "Create a new escalation policy.", {
        description: zod_1.z.string().optional().describe("Optional description of the escalation policy"),
        name: zod_1.z.string().describe("Name of the escalation policy"),
        owner_id: zod_1.z.string().describe("Owner ID representing the team ID. Choose the current teamID."),
        repetition: zod_1.z.number().optional().describe("Optional number of repetitions for escalation. Should be greater than 0 and less than 3."),
        repeat_after: zod_1.z.number().optional().describe("Optional time in minutes after which to repeat the escalation"),
        rules: zod_1.z.array(zod_1.z.object({
            escalationTime: zod_1.z.number().optional().describe("Optional time in minutes before escalation"),
            isViaPersonal: zod_1.z.boolean().optional().describe("Optional flag to indicate if notification is sent via personal contact"),
            entities: zod_1.z.array(zod_1.z.object({
                id: zod_1.z.string().describe("User's ObjectId"),
                type: zod_1.z.string().describe("Type of entity, e.g., 'user'")
            })).describe("Array of entities to escalate to. Cannot be empty."),
            via: zod_1.z.array(zod_1.z.enum(["Email", "SMS", "Push", "Phone"])).describe("Array of notification channels. Can be 'Email', 'SMS', 'Push', 'Phone'.")
        })).describe("Array of escalation rules. Cannot be empty."),
        enable_incident_reminders: zod_1.z.boolean().optional().default(false).describe("Flag to enable incident reminders"),
        incident_reminder_rules: zod_1.z.array(zod_1.z.object({
            time_interval: zod_1.z.number().describe("Time interval in minutes for reminders. Must be greater than 1 hr and less than 24 hrs"),
            till: zod_1.z.number().describe("Time in minutes until reminders are sent"),
            via: zod_1.z.array(zod_1.z.enum(["email", "sms", "push", "phone"])).describe("Array of notification channels. Can be 'Email', 'SMS', 'Push', 'Phone'. Cannot be empty.")
        })).describe("Rules for incident reminders. Cannot be empty if enable_incident_reminders is true."),
        enable_incident_retrigger: zod_1.z.boolean().optional().default(false).describe("Flag to enable incident retriggering. Must be true if incident_retrigger_after is set"),
        retrigger_after: zod_1.z.number().optional().default(0).describe("Time in hours after which to retrigger the incident. If enable_incident_retrigger is true, this must be between 1-48 hours"),
        entity_owner: zod_1.z.object({
            id: zod_1.z.string().describe("Users's ObjectId"),
            type: zod_1.z.string().describe("Type of the owner, e.g., 'user'")
        }).describe("Entity that owns this escalation policy")
    }, createEscalationPolicy_1.default);
};
exports.default = initEscalationPolicyTools;
