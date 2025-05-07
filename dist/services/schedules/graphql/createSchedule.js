"use strict";
// import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
// import { store } from "../../../utils/store";
// import { apiInstance } from "../../../utils/axios";
// import getTextContent from "../../../utils/contentModifiers/text";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("../../../utils/store");
const axios_1 = require("../../../utils/axios");
const text_1 = __importDefault(require("../../../utils/contentModifiers/text"));
const createSchedule = async (data) => {
    try {
        const response = await axios_1.apiInstance.post("/v3/graphql", {
            query: data.query,
        }, {
            headers: {
                Authorization: `Bearer ${await store_1.store.accessToken.get()}`,
            },
        });
        return (0, text_1.default)(`Response:\n\n${JSON.stringify(response.data, null, 2)}`);
    }
    catch (error) {
        console.error(error);
        return (0, text_1.default)(error instanceof Error ? error.message : "Something went wrong.");
    }
};
exports.default = createSchedule;
