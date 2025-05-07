"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getTime_1 = __importDefault(require("../services/utils/getTime"));
const initUtilsTools = (server) => {
    server.tool("getTime", "Get the current time in ISO format.", {}, getTime_1.default);
};
exports.default = initUtilsTools;
