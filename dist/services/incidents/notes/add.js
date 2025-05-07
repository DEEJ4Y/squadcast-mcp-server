"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("../../../utils/axios");
const store_1 = require("../../../utils/store");
const text_1 = __importDefault(require("../../../utils/contentModifiers/text"));
const addIncidentNote = async (data) => {
    try {
        const response = await axios_1.apiInstance.post(`/v3/incidents/${data.incidentId}/warroom`, {
            message: data.note,
        }, {
            headers: {
                Authorization: `Bearer ${await store_1.store.accessToken.get()}`,
            },
        });
        if (response.status !== 201) {
            throw new Error("Failed to add note to incident." +
                JSON.stringify(response.data, null, 2));
        }
        return (0, text_1.default)(`Added note to incident.`);
    }
    catch (error) {
        console.error(error);
        return (0, text_1.default)(error instanceof Error ? error.message : "Something went wrong.");
    }
};
exports.default = addIncidentNote;
