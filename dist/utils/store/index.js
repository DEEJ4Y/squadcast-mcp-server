"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const keyv_1 = __importDefault(require("keyv"));
const accessToken_1 = __importDefault(require("./accessToken"));
const team_1 = __importDefault(require("./team"));
const keyValueStore = new keyv_1.default();
exports.default = keyValueStore;
const store = {
    accessToken: accessToken_1.default,
    team: team_1.default,
};
exports.store = store;
