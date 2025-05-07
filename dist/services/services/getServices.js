"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const text_1 = __importDefault(require("../../utils/contentModifiers/text"));
const store_1 = require("../../utils/store");
const axios_1 = require("../../utils/axios");
const getServices = async () => {
    try {
        const response = await axios_1.apiInstance.get(`/v3/services?owner_id=${await store_1.store.team.get()}`, {
            headers: {
                Authorization: `Bearer ${await store_1.store.accessToken.get()}`,
            },
        });
        if (response.status !== 200) {
            throw new Error("Failed to get services.");
        }
        return (0, text_1.default)(`Services found successfully. Services:\n\n${JSON.stringify(response.data.data, null, 2)}`);
    }
    catch (error) {
        console.error(error);
        return (0, text_1.default)(error instanceof Error ? error.message : "Something went wrong.");
    }
};
exports.default = getServices;
