"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("../../utils/axios");
const text_1 = __importDefault(require("../../utils/contentModifiers/text"));
const store_1 = require("../../utils/store");
const getTeamUsers = async () => {
    try {
        const usersResponse = await axios_1.apiInstance.get(`/v3/users`, {
            headers: {
                Authorization: `Bearer ${await store_1.store.accessToken.get()}`,
            },
        });
        if (usersResponse.status !== 200) {
            throw new Error("Failed to get users.");
        }
        const response = await axios_1.apiInstance.get(`/v3/teams/${await store_1.store.team.get()}/members`, {
            headers: {
                Authorization: `Bearer ${await store_1.store.accessToken.get()}`,
            },
        });
        if (response.status !== 200) {
            throw new Error("Failed to get team members.");
        }
        const teamUserIds = {};
        response.data.data.forEach((userIdMapping) => {
            teamUserIds[userIdMapping.user_id] = true;
        });
        const users = usersResponse.data.data.filter((user) => teamUserIds[user.id]);
        return (0, text_1.default)(`Team members found successfully. Members:\n\n${JSON.stringify(users.map((user) => ({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            username_for_display: user.username_for_display,
            email: user.email,
        })), null, 2)}`);
    }
    catch (error) {
        console.error(error);
        return (0, text_1.default)(error instanceof Error ? error.message : "Something went wrong.");
    }
};
exports.default = getTeamUsers;
