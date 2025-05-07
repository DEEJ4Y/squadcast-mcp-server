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
        owner_id: zod_1.z
            .string()
            .describe("Unique identifier of the user creating the escalation policy."),
        name: zod_1.z.string().describe("Name of the escalation policy."),
        description: zod_1.z
            .string()
            .describe("Detailed description of the escalation policy's purpose."),
        entity_owner: zod_1.z
            .object({
            id: zod_1.z
                .string()
                .describe("Unique identifier of the entity owner should be a team."),
            type: zod_1.z.enum(["team"]).describe("Type of the entity owner: 'team'."),
        })
            .describe("Entity that owns the escalation policy."),
        repetition: zod_1.z
            .number()
            .int()
            .nonnegative()
            .describe("Number of times the entire escalation policy should repeat if unacknowledged. Maximum is 3."),
        repeat_after: zod_1.z
            .number()
            .int()
            .nonnegative()
            .describe("Time in minutes after which the escalation policy should repeat."),
        is_using_new_fields: zod_1.z
            .boolean()
            .describe("Flag indicating if the new fields are being used."),
        rules: zod_1.z
            .array(zod_1.z.object({
            entities: zod_1.z
                .array(zod_1.z.object({
                type: zod_1.z
                    .enum(["schedulev2", "user", "squad"])
                    .describe("Type of the entity to notify. If 'schedulev2', it will be assigned to whoever is on call in that schedule."),
                pid: zod_1.z
                    .number()
                    .int()
                    .describe("Unique identifier of the entity."),
            }))
                .describe("List of entities to notify at this escalation level."),
            via: zod_1.z
                .array(zod_1.z.enum(["email", "sms", "push", "phone"]))
                .describe("Notification channels to use."),
            escalationTime: zod_1.z
                .number()
                .int()
                .nonnegative()
                .describe("Time in minutes after incident creation to escalate to this rule."),
            showDropDown: zod_1.z
                .boolean()
                .describe("UI flag to show the entity selection dropdown."),
            showViaDropDown: zod_1.z
                .boolean()
                .describe("UI flag to show the notification channel selection dropdown."),
            searchString: zod_1.z
                .string()
                .describe("Search string used in the UI for entity selection."),
            viaSearchString: zod_1.z
                .string()
                .describe("Search string used in the UI for notification channel selection."),
            memberError: zod_1.z
                .boolean()
                .describe("Flag indicating if there's an error with the selected members."),
            isViaPersonal: zod_1.z
                .boolean()
                .describe("Flag indicating if personal notification preferences should be used."),
            viaError: zod_1.z
                .boolean()
                .describe("Flag indicating if there's an error with the selected notification channels."),
            roundrobin_enabled: zod_1.z
                .boolean()
                .describe("Flag indicating if round-robin notification is enabled."),
            roundrobin_next_index: zod_1.z
                .number()
                .int()
                .nonnegative()
                .describe("Index of the next member to notify in round-robin."),
            escalate_within_roundrobin: zod_1.z
                .boolean()
                .describe("Flag indicating if escalation should occur within the round-robin sequence."),
            repetition: zod_1.z
                .number()
                .int()
                .nonnegative()
                .describe("Number of times this rule should repeat if unacknowledged."),
            repeat_after: zod_1.z
                .number()
                .int()
                .nonnegative()
                .describe("Time in minutes after which this rule should repeat."),
            repeatAfterRR: zod_1.z
                .number()
                .int()
                .nonnegative()
                .describe("Time in minutes after which to repeat within round-robin."),
            repetitionError: zod_1.z
                .string()
                .describe("Error message related to repetition configuration."),
            timeValidationMessage: zod_1.z
                .string()
                .optional()
                .describe("Validation message related to time configuration."),
        }))
            .describe("List of escalation rules defining the notification sequence. Use listSchedules & getTeamUsers to get the list of schedules & users that can be used here."),
        incident_reminder_rules: zod_1.z
            .array(zod_1.z.object({
            till: zod_1.z
                .number()
                .int()
                .nonnegative()
                .describe("Time in minutes until which reminders should be sent."),
            time_interval: zod_1.z
                .number()
                .int()
                .positive()
                .describe("Interval in minutes between reminders."),
            via: zod_1.z
                .array(zod_1.z.enum(["email", "sms", "push", "phone"]))
                .describe("Notification channels to use for reminders."),
        }))
            .describe("Rules defining how and when incident reminders should be sent."),
        enable_incident_reminders: zod_1.z
            .boolean()
            .describe("Flag indicating if incident reminders are enabled."),
        enable_incident_retrigger: zod_1.z
            .boolean()
            .describe("Flag indicating if incident retriggering is enabled."),
        retrigger_after: zod_1.z
            .number()
            .int()
            .positive()
            .describe("Time in minutes after which an incident should be retriggered if unacknowledged."),
    }, createEscalationPolicy_1.default);
};
exports.default = initEscalationPolicyTools;
