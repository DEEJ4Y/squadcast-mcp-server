import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import getTextContent from "../../utils/contentModifiers/text";
import { store } from "../../utils/store";
import { apiInstance } from "../../utils/axios";
import logger from "../../utils/logger";

const whoIsOnCall = async (): Promise<CallToolResult> => {
  try {
    const response = await apiInstance.get("/v4/schedules/who-is-oncall", {
      headers: {
        Authorization: `Bearer ${await store.accessToken.get()}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to get who is on call.");
    }

    return getTextContent(
      `Who is on call:\n\n${JSON.stringify(response.data.data, null, 2)}`
    );
  } catch (error) {
    logger.error(error);
    return getTextContent(
      error instanceof Error ? error.message : "Something went wrong."
    );
  }
};

export default whoIsOnCall;
