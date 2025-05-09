"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oauth_1 = __importDefault(require("./oauth"));
const teams_1 = __importDefault(require("./teams"));
const schedules_1 = __importDefault(require("./schedules"));
const incidents_1 = __importDefault(require("./incidents"));
const statusPages_1 = __importDefault(require("./statusPages"));
const utils_1 = __importDefault(require("./utils"));
const escalationPolicy_1 = __importDefault(require("./escalationPolicy"));
const services_1 = __importDefault(require("./services"));
const squads_1 = __importDefault(require("./squads"));
const initTools = (server) => {
    (0, oauth_1.default)(server);
    (0, teams_1.default)(server);
    (0, schedules_1.default)(server);
    (0, incidents_1.default)(server);
    (0, statusPages_1.default)(server);
    (0, utils_1.default)(server);
    (0, escalationPolicy_1.default)(server);
    (0, services_1.default)(server);
    (0, squads_1.default)(server);
};
exports.default = initTools;
