"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getServices_1 = __importDefault(require("../services/services/getServices"));
const initServiceTools = (server) => {
    server.tool("getServices", "Get a list of services.", {}, getServices_1.default);
};
exports.default = initServiceTools;
