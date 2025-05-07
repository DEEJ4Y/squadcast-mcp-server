"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("../../utils/axios");
const store_1 = require("../../utils/store");
const text_1 = __importDefault(require("../../utils/contentModifiers/text"));
const createEscalationPolicy = async (body) => {
    try {
        const response = await axios_1.apiInstance.post(`/v3/escalation-policies`, body, {
            headers: {
                Authorization: `Bearer ${await store_1.store.accessToken.get()}`,
            },
        });
        if (response.status !== 201) {
            throw new Error(`Failed to create escalation policy. Status: ${response.status}, Message: ${response.data?.message || "No additional details available."}`);
        }
        return (0, text_1.default)(`Escalation policies created successfully. Escalation Policy:\n\n${JSON.stringify(response.data.data, null, 2)}`);
    }
    catch (error) {
        console.error(error);
        return (0, text_1.default)(error instanceof Error ? error.message : "Something went wrong.");
    }
};
exports.default = createEscalationPolicy;
