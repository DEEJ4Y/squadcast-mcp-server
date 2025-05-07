"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("../../utils/axios");
const text_1 = __importDefault(require("../../utils/contentModifiers/text"));
const store_1 = require("../../utils/store");
const config_1 = __importDefault(require("../../utils/config"));
const isAuthenticated = async () => {
    try {
        const accessToken = await store_1.store.accessToken.get();
        if (accessToken) {
            return (0, text_1.default)("User is authenticated.");
        }
        const config = await (0, config_1.default)();
        if (!config.SQUADCAST_REFRESH_TOKEN ||
            config.SQUADCAST_REFRESH_TOKEN === "") {
            throw new Error("SQUADCAST_REFRESH_TOKEN environment variable is not set." +
                `value: ${config.SQUADCAST_REFRESH_TOKEN}`);
        }
        // Log user in
        const response = await axios_1.authInstance.get("/oauth/access-token", {
            headers: {
                "X-Refresh-Token": config.SQUADCAST_REFRESH_TOKEN,
            },
        });
        if (response.status !== 200) {
            throw new Error("Failed to generate access token.");
        }
        await store_1.store.accessToken.set(response.data.data.access_token);
        return (0, text_1.default)("Access token generated successfully. User is now authenticated.");
    }
    catch (error) {
        console.error(error);
        return (0, text_1.default)(error instanceof Error ? error.message : "Something went wrong.");
    }
};
exports.default = isAuthenticated;
