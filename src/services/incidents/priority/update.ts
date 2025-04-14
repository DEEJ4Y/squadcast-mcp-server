import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { apiInstance } from "../../../utils/axios";
import { store } from "../../../utils/store";
import getTextContent from "../../../utils/contentModifiers/text";

const updateIncidentPriorities = async (data: {
  incidentIds: string[];
  priority: string;
}): Promise<CallToolResult> => {
  try {
    const response = await apiInstance.put(
      `/v3/incidents/priority`,
      {
        incident_ids: data.incidentIds,
        priority: data.priority,
      },
      {
        headers: {
          Authorization: `Bearer ${await store.accessToken.get()}`,
        },
      }
    );

    if (response.status !== 204) {
      throw new Error("Failed to update incident priority.");
    }

    return getTextContent(`Priority updated for all incidents.`);
  } catch (error) {
    console.error(error);
    return getTextContent(
      error instanceof Error ? error.message : "Something went wrong."
    );
  }
};

export default updateIncidentPriorities;
