"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const accessTokenStore = {
    get: async () => await _1.default.get("accessToken"),
    set: async (accessToken) => await _1.default.set("accessToken", accessToken),
};
exports.default = accessTokenStore;
