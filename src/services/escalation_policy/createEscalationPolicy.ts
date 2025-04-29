import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { apiInstance } from "../../utils/axios";
import { store } from "../../utils/store";
import getTextContent from "../../utils/contentModifiers/text";

interface Entity {
  id: string;
  type: string;
}

type NotificationChannels = "Email" | "SMS" | "Push" | "Phone";

interface Rule {
  escalationTime?: number;
  isViaPersonal?: boolean;
  entities: Entity[];
  via: NotificationChannels[];
  roundrobin_enabled?: boolean;
}

interface EntityOwner {
  id: string;
  type: string;
}

interface IncidentReminderRules {
    via: "email" | "sms" | "push" | "phone";
    time_interval: number;
    till: number;
}

interface EscalationPolicyBody {
  description?: string;
  name: string;
  owner_id: string;
  repetition?: number;
  repeat_after?: number;
  rules: Rule[];
  enable_incident_reminders?: boolean;
  incident_reminder_rules?: IncidentReminderRules[];
  enable_incident_retrigger?: boolean;
  retrigger_after?: number;
  entity_owner: EntityOwner;
}

const createEscalationPolicy = async (body: EscalationPolicyBody): Promise<CallToolResult> => {
  try {
    const requestBody = {
      description: body.description || "",
      name: body.name,
      owner_id: body.owner_id,
      repetition: body.repetition || 0,
      repeat_after: body.repeat_after || 0,
      rules: body.rules.map(rule => ({
        escalationTime: rule.escalationTime || 0,
        isViaPersonal: rule.isViaPersonal || false,
        entities: rule.entities.map(entity => ({
          id: entity.id,
          type: entity.type
        })),
        via: rule.via
      })),
      enable_incident_reminders: body.enable_incident_reminders || false,
      incident_reminder_rules: body.incident_reminder_rules || [],
      enable_incident_retrigger: body.enable_incident_retrigger || false,
      retrigger_after: body.retrigger_after || 0,
      entity_owner: {
        id: body.entity_owner.id,
        type: body.entity_owner.type
      }
    };

    const response = await apiInstance.post(
      `/v3/escalation-policies`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${await store.accessToken.get()}`,
        },
      }
    );

    if (response.status !== 201) {
      throw new Error("Failed to create escalation policy.");
    }

    return getTextContent(
      `Escalation policies created successfully. Escalation Policy:\n\n${JSON.stringify(
        response.data.data,
        null,
        2
      )}`
    );
  } catch (error) {
    console.error(error);
    return getTextContent(
      error instanceof Error ? error.message : "Something went wrong."
    );
  }
};

export default createEscalationPolicy;
