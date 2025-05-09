"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTeamSquads_1 = require("../services/teams/getTeamSquads");
const initSquadsTools = (server) => {
    server.tool("listSquads", "List all squads in the selected team.", {}, getTeamSquads_1.getTeamSquads);
};
exports.default = initSquadsTools;
