"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getTeams_1 = __importDefault(require("../services/teams/getTeams"));
const zod_1 = __importDefault(require("zod"));
const selectTeam_1 = __importDefault(require("../services/teams/selectTeam"));
const getTeamUsers_1 = __importDefault(require("../services/teams/getTeamUsers"));
const initTeamsTools = (server) => {
    server.tool("getTeams", "List all teams of the current user.", {}, getTeams_1.default);
    server.tool("selectTeam", "Select a team to work on.", {
        teamId: zod_1.default.string().describe("The ID of the team to select."),
    }, selectTeam_1.default);
    server.tool("getTeamUsers", "Get a list of users in the selected team.", {}, getTeamUsers_1.default);
};
exports.default = initTeamsTools;
