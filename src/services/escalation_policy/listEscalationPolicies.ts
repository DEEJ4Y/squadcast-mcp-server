import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { apiInstance } from "../../utils/axios";
import { store } from "../../utils/store";
import getTextContent from "../../utils/contentModifiers/text";

const listEscalationPolicies = async (): Promise<CallToolResult> => {
  try {
    const response = await apiInstance.get(
      `/v3/escalation-policy?owner_id=${await store.team.get()}`,
      {
        headers: {
          Authorization: `Bearer ${await store.accessToken.get()}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(
        `Failed to list escalation policies. Status: ${
          response.status
        }, Message: ${
          response.data?.message || "No additional details available."
        }`
      );
    }

    return getTextContent(
      `Escalation policies found successfully. Escalation Policies:\n\n${JSON.stringify(
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

export default listEscalationPolicies;
