"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("../../utils/axios");
const text_1 = __importDefault(require("../../utils/contentModifiers/text"));
const store_1 = require("../../utils/store");
const getTeams = async () => {
    try {
        const response = await axios_1.apiInstance.get("/v3/teams", {
            headers: {
                Authorization: `Bearer ${await store_1.store.accessToken.get()}`,
            },
        });
        if (response.status !== 200) {
            throw new Error("Failed to get teams.");
        }
        return (0, text_1.default)(`Teams found successfully. Teams:\n\n${JSON.stringify(response.data.data.map((team) => ({
            id: team.id,
            name: team.name,
            description: team.description,
            default: team.default,
        })), null, 2)}`);
    }
    catch (error) {
        console.error(error);
        return (0, text_1.default)(error instanceof Error ? error.message : "Something went wrong.");
    }
};
exports.default = getTeams;
