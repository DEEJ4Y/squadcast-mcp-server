import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { apiInstance } from "../../utils/axios";
import { store } from "../../utils/store";
import getTextContent from "../../utils/contentModifiers/text";
import logger from "../../utils/logger";

const acknowledgeIncidents = async (data: {
  incidentIds: string[];
}): Promise<CallToolResult> => {
  try {
    const response = await apiInstance.post(
      `/v3/incidents/acknowledge`,
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
      throw new Error("Failed to acknowledge incidents.");
    }

    return getTextContent(`All incidents acknowledged successfully.`);
  } catch (error) {
    logger.error(error);
    return getTextContent(
      error instanceof Error ? error.message : "Something went wrong."
    );
  }
};

export default acknowledgeIncidents;
