import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { apiInstance } from "../../utils/axios";
import { store } from "../../utils/store";
import getTextContent from "../../utils/contentModifiers/text";

const resolveIncidents = async (data: {
  incidentIds: string[];
}): Promise<CallToolResult> => {
  try {
    const response = await apiInstance.post(
      `/v3/incidents/resolve`,
      {
        incident_ids: data.incidentIds,
      },
      {
        headers: {
          Authorization: `Bearer ${await store.accessToken.get()}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to resolve incidents.");
    }

    return getTextContent(`All incidents resolved successfully.`);
  } catch (error) {
    console.error(error);
    return getTextContent(
      error instanceof Error ? error.message : "Something went wrong."
    );
  }
};

export default resolveIncidents;
