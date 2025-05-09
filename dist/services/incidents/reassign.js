"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reassignIncident = void 0;
const axios_1 = require("../../utils/axios");
const store_1 = require("../../utils/store");
const text_1 = __importDefault(require("../../utils/contentModifiers/text"));
const reassignIncident = async (params) => {
    try {
        const response = await axios_1.apiInstance.post(`/v3/incidents/${params.incidentID}/reassign`, {
            reassignTo: {
                id: params.assigneeID,
                type: params.assigneeType.toLowerCase(),
            },
        }, {
            headers: {
                Authorization: `Bearer ${await store_1.store.accessToken.get()}`,
                "Content-Type": "application/json",
            },
        });
        if (response.status !== 200) {
            throw new Error(`Failed to reassign incident. Status: ${response.status}, Message: ${response.data?.message || "No additional details available."}`);
        }
        return (0, text_1.default)(`Incident ${params.incidentID} reassigned successfully to ${params.assigneeType} with ID: ${params.assigneeID}.`);
    }
    catch (error) {
        console.error("Error reassigning incident:", error);
        throw error;
    }
};
exports.reassignIncident = reassignIncident;
