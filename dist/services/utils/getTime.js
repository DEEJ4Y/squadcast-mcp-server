"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const text_1 = __importDefault(require("../../utils/contentModifiers/text"));
const getTime = async () => {
    try {
        const currentTime = new Date().toISOString();
        return (0, text_1.default)(`Current time in ISO format: ${currentTime}`);
    }
    catch (error) {
        console.error(error);
        return (0, text_1.default)(error instanceof Error ? error.message : "Something went wrong.");
    }
};
exports.default = getTime;
