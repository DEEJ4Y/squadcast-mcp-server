"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const listStatusPages_1 = __importDefault(require("../services/statuspages/listStatusPages"));
const zod_1 = __importDefault(require("zod"));
const listStatusPageComponents_1 = __importDefault(require("../services/statuspages/components/listStatusPageComponents"));
const listIssueStates_1 = __importDefault(require("../services/statuspages/issues/listIssueStates"));
const listStatusPageStatuses_1 = __importDefault(require("../services/statuspages/listStatusPageStatuses"));
const createIssue_1 = __importDefault(require("../services/statuspages/issues/createIssue"));
const initStatusPagesTools = (server) => {
    server.tool("listStatusPages", "Get a list of status pages.", {
        paginationPage: zod_1.default
            .number()
            .default(1)
            .describe("The pagination page number."),
    }, listStatusPages_1.default);
    server.tool("listStatusPageStatuses", "Get a list of status page statuses given a status page ID.", {
        statusPageId: zod_1.default.number().describe("The ID of the status page."),
    }, listStatusPageStatuses_1.default);
    server.tool("listStatusPageComponents", "Get a list of status page components given a status page ID.", {
        statusPageId: zod_1.default.string().describe("The ID of the status page."),
    }, listStatusPageComponents_1.default);
    server.tool("listStatusPageIssueStates", "Get a list of status page issue states given a status page ID.", {
        statusPageId: zod_1.default.string().describe("The ID of the status page."),
    }, listIssueStates_1.default);
    server.tool("createStatusPageIssue", "Create a status page issue given a status page ID, title, status ID, components, and issues.", {
        statusPageId: zod_1.default.number().describe("The ID of the status page."),
        title: zod_1.default.string().describe("The title of the issue."),
        statusID: zod_1.default
            .number()
            .describe("The ID of the status page status. Statuses can be found using the listStatusPageStatuses tool."),
        components: zod_1.default
            .object({
            id: zod_1.default.number().describe("The ID of the component."),
            statusID: zod_1.default
                .number()
                .describe("The ID of the status page status. Statuses can be found using the listStatusPageStatuses tool."),
        })
            .array()
            .describe("The affected components because of the issue. Components can be found using the listStatusPageComponents tool."),
        issues: zod_1.default
            .array(zod_1.default.object({
            stateID: zod_1.default
                .number()
                .describe("The ID of the status page issue state. Issue states can be found using the listStatusPageIssueStates tool."),
            stateMessages: zod_1.default
                .array(zod_1.default.object({
                text: zod_1.default.string().describe("The issue message."),
                timestamp: zod_1.default
                    .string()
                    .describe("The time when the message is to be added in ISO format."),
            }))
                .describe("The messages to be added as part of the issue."),
        }))
            .describe("The list of issues to be created as part of this request. The stateID is a status page issue state. The stateMessages array is a list of messages to be added as part of the issue. The text field is the issue message and the timestamp is the time when the message is to be added."),
    }, createIssue_1.default);
};
exports.default = initStatusPagesTools;
