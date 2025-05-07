"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("../../../utils/axios");
const store_1 = require("../../../utils/store");
const text_1 = __importDefault(require("../../../utils/contentModifiers/text"));
const updateIncidentPriorities = async (data) => {
    try {
        const response = await axios_1.apiInstance.put(`/v3/incidents/priority`, {
            incident_ids: data.incidentIds,
            priority: data.priority,
        }, {
            headers: {
                Authorization: `Bearer ${await store_1.store.accessToken.get()}`,
            },
        });
        if (response.status !== 204) {
            throw new Error("Failed to update incident priority.");
        }
        return (0, text_1.default)(`Priority updated for all incidents.`);
    }
    catch (error) {
        console.error(error);
        return (0, text_1.default)(error instanceof Error ? error.message : "Something went wrong.");
    }
};
exports.default = updateIncidentPriorities;
