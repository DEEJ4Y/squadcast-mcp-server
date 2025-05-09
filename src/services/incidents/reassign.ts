import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { apiInstance } from "../../utils/axios";
import { store } from "../../utils/store";
import { get } from "axios";
import getTextContent from "../../utils/contentModifiers/text";

interface ReassignIncidentParams {
  incidentID: string;
  assigneeID: string;
  assigneeType: "user" | "squad" | "escalationpolicy";
}

const reassignIncident = async (
  params: ReassignIncidentParams
): Promise<CallToolResult> => {
  try {
    const response = await apiInstance.post(
      `/v3/incidents/${params.incidentID}/reassign`,
      {
        reassignTo: {
          id: params.assigneeID,
          type: params.assigneeType.toLowerCase(),
        },
      },
      {
        headers: {
          Authorization: `Bearer ${await store.accessToken.get()}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status !== 200) {
      throw new Error(
        `Failed to reassign incident. Status: ${response.status}, Message: ${
          response.data?.message || "No additional details available."
        }`
      );
    }
    return getTextContent(
      `Incident ${params.incidentID} reassigned successfully to ${params.assigneeType} with ID: ${params.assigneeID}.`
    );
  } catch (error) {
    console.error("Error reassigning incident:", error);
    throw error;
  }
};

export { reassignIncident };
