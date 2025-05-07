"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("../../utils/axios");
const store_1 = require("../../utils/store");
const text_1 = __importDefault(require("../../utils/contentModifiers/text"));
const listIncidents = async (data) => {
    try {
        const response = await axios_1.apiInstance.get(`/v3/incidents/export/?start_time=${data.startTime}&end_time=${data.endTime}&owner_id=${await store_1.store.team.get()}&type=json${data.status.length > 0
            ? data.status.map((status) => `&status=${status}`).join("")
            : ""}`, {
            headers: {
                Authorization: `Bearer ${await store_1.store.accessToken.get()}`,
                "Content-Type": "application/json",
            },
        });
        if (response.status !== 200) {
            (0, text_1.default)("No Incidents found with the provided filters.");
        }
        return (0, text_1.default)(`Incidents found successfully. Incidents:\n\n${JSON.stringify(response.data.incidents, null, 2)}`);
    }
    catch (error) {
        console.error(error);
        return (0, text_1.default)(error instanceof Error ? error.message : "Something went wrong.");
    }
};
exports.default = listIncidents;
