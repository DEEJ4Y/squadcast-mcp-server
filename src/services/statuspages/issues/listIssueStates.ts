import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { apiInstance } from "../../../utils/axios";
import getTextContent from "../../../utils/contentModifiers/text";
import { store } from "../../../utils/store";
import logger from "../../../utils/logger";

const listStatusPageIssueStates = async (data: {
  statusPageId: string;
}): Promise<CallToolResult> => {
  try {
    const response = await apiInstance.get(
      `/v4/statuspages/${data.statusPageId}/states`,
      {
        headers: {
          Authorization: `Bearer ${await store.accessToken.get()}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to get status page issue states.");
    }

    return getTextContent(
      `Status page issue states found successfully. Status page issue states:\n\n${JSON.stringify(
        response.data.data,
        null,
        2
      )}`
    );
  } catch (error) {
    logger.error(error);
    return getTextContent(
      error instanceof Error ? error.message : "Something went wrong."
    );
  }
};

export default listStatusPageIssueStates;
