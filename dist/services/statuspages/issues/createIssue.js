"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("../../../utils/axios");
const text_1 = __importDefault(require("../../../utils/contentModifiers/text"));
const store_1 = require("../../../utils/store");
const createStatusPageIssue = async (data) => {
    try {
        const response = await axios_1.apiInstance.post(`/v4/statuspages/${data.statusPageId}/issues`, {
            title: data.title,
            statusID: data.statusID,
            components: data.components,
            issues: data.issues,
        }, {
            headers: {
                Authorization: `Bearer ${await store_1.store.accessToken.get()}`,
            },
        });
        if (response.status !== 200) {
            throw new Error("Failed to create status page issue.");
        }
        return (0, text_1.default)(`Status page issue created successfully. Status page issue:\n\n${JSON.stringify(response.data.data, null, 2)}`);
    }
    catch (error) {
        console.error(error);
        return (0, text_1.default)(error instanceof Error ? error.message : "Something went wrong.");
    }
};
exports.default = createStatusPageIssue;
