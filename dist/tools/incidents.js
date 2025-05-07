"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const listIncidents_1 = __importDefault(require("../services/incidents/listIncidents"));
const zod_1 = __importDefault(require("zod"));
const acknowledge_1 = __importDefault(require("../services/incidents/acknowledge"));
const resolve_1 = __importDefault(require("../services/incidents/resolve"));
const update_1 = __importDefault(require("../services/incidents/priority/update"));
const add_1 = __importDefault(require("../services/incidents/notes/add"));
const initIncidentsTools = (server) => {
    server.tool("listIncidents", `List all incidents (with filters). Use the 'getTime' tool to get the current time.`, {
        startTime: zod_1.default
            .string()
            .describe("Filter by the start time of the incident in ISO format. Should be within the last 14 days."),
        endTime: zod_1.default
            .string()
            .describe("Filter by the end time of the incident in ISO format. Should be within the last 14 days."),
        status: zod_1.default
            .array(zod_1.default.string())
            .describe("The status of the incident. Array of: 'triggered', 'acknowledged', 'resolved', 'suppressed'. Empty array for all incidents."),
    }, listIncidents_1.default);
    server.tool("acknowledgeIncidents", "Acknowledge incidents given an array of incident IDs.", {
        incidentIds: zod_1.default
            .array(zod_1.default.string())
            .describe("An array of incident IDs to acknowledge."),
    }, acknowledge_1.default);
    server.tool("resolveIncidents", "Resolve incidents given an array of incident IDs.", {
        incidentIds: zod_1.default
            .array(zod_1.default.string())
            .describe("An array of incident IDs to resolve."),
    }, resolve_1.default);
    // Priority
    server.tool("updateIncidentPriorities", "Update the priority of incidents given an array of incident IDs and a priority.", {
        incidentIds: zod_1.default
            .array(zod_1.default.string())
            .describe("An array of incident IDs to update."),
        priority: zod_1.default
            .string()
            .describe("The priority of the incident. Should be one of: 'UNSET', 'P1', 'P2', 'P3', 'P4', 'P5'."),
    }, update_1.default);
    // Notes
    server.tool("addIncidentNote", "Add a note to an incident given an incident ID and a note.", {
        incidentId: zod_1.default
            .string()
            .describe("The ID of the incident to add a note to."),
        note: zod_1.default.string().describe("The note to add to the incident."),
    }, add_1.default);
};
exports.default = initIncidentsTools;
