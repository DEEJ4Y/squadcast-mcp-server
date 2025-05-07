"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiInstance = exports.authInstance = void 0;
const axios_1 = __importDefault(require("axios"));
exports.authInstance = axios_1.default.create({
    baseURL: "https://auth.squadcast.tech",
});
exports.apiInstance = axios_1.default.create({
    baseURL: "https://api.squadcast.tech",
    validateStatus(status) {
        return status <= 500;
    },
});
