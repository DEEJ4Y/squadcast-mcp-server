"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const teamStore = {
    get: async () => await _1.default.get("team"),
    set: async (teamId) => await _1.default.set("team", teamId),
};
exports.default = teamStore;
