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
        const requestBody = {
            description: body.description || "",
            name: body.name,
            owner_id: body.owner_id,
            repetition: body.repetition || 0,
            repeat_after: body.repeat_after || 0,
            rules: body.rules.map((rule) => ({
                escalationTime: rule.escalationTime || 0,
                isViaPersonal: rule.isViaPersonal || false,
                entities: rule.entities.map((entity) => ({
                    id: entity.id,
                    type: entity.type,
                })),
                via: rule.via,
                roundrobin_enabled: rule.roundrobin_enabled || false,
            })),
            enable_incident_reminders: body.enable_incident_reminders || false,
            incident_reminder_rules: body.incident_reminder_rules || [],
            enable_incident_retrigger: body.enable_incident_retrigger || false,
            retrigger_after: body.retrigger_after || 0,
            entity_owner: {
                id: body.entity_owner.id,
                type: body.entity_owner.type,
            },
        };
        const response = await axios_1.apiInstance.post(`/v3/escalation-policies`, requestBody, {
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
