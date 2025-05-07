"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isAuthenticated_1 = __importDefault(require("../services/auth/isAuthenticated"));
const initOAuthTools = (server) => {
    server.tool("isAuthenticated", "Check if the user is authenticated.", {}, isAuthenticated_1.default);
};
exports.default = initOAuthTools;
