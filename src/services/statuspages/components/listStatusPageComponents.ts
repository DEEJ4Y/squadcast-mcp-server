import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { apiInstance } from "../../../utils/axios";
import getTextContent from "../../../utils/contentModifiers/text";
import { store } from "../../../utils/store";

const listStatusPageComponents = async (data: {
  statusPageId: string;
}): Promise<CallToolResult> => {
  try {
    const response = await apiInstance.get(
      `/v4/statuspages/${data.statusPageId}/components`,
      {
        headers: {
          Authorization: `Bearer ${await store.accessToken.get()}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to get status page components.");
    }

    return getTextContent(
      `Status page components found successfully. Status page components:\n\n${JSON.stringify(
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

export default listStatusPageComponents;
