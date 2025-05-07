"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const whoIsOnCall_1 = __importDefault(require("../services/schedules/whoIsOnCall"));
const initSchedulesTools = (server) => {
    server.tool("whoIsOnCall", "Get the user(s) who is currently on call.", {}, whoIsOnCall_1.default);
};
exports.default = initSchedulesTools;
