import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { apiInstance } from "../../../utils/axios";
import getTextContent from "../../../utils/contentModifiers/text";
import { store } from "../../../utils/store";
import logger from "../../../utils/logger";

const createStatusPageIssue = async (data: {
  statusPageId: number;
  title: string;
  statusID: number;
  components: { id: number; statusID: number }[];
  issues: {
    stateID: number;
    stateMessages: { text: string; timestamp: string }[];
  }[];
}): Promise<CallToolResult> => {
  try {
    const response = await apiInstance.post(
      `/v4/statuspages/${data.statusPageId}/issues`,
      {
        title: data.title,
        statusID: data.statusID,
        components: data.components,
        issues: data.issues,
      },
      {
        headers: {
          Authorization: `Bearer ${await store.accessToken.get()}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to create status page issue.");
    }

    return getTextContent(
      `Status page issue created successfully. Status page issue:\n\n${JSON.stringify(
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

export default createStatusPageIssue;
