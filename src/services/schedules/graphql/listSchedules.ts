import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { store } from "../../../utils/store";
import { apiInstance } from "../../../utils/axios";
import getTextContent from "../../../utils/contentModifiers/text";
import logger from "../../../utils/logger";

const listSchedules = async (data: {
  query: string;
}): Promise<CallToolResult> => {
  try {
    const response = await apiInstance.post(
      "/v3/graphql",
      {
        query: data.query,
      },
      {
        headers: {
          Authorization: `Bearer ${await store.accessToken.get()}`,
        },
      }
    );

    return getTextContent(
      `Response:\n\n${JSON.stringify(response.data, null, 2)}`
    );
  } catch (error) {
    logger.error(error);
    return getTextContent(
      error instanceof Error ? error.message : "Something went wrong."
    );
  }
};

export default listSchedules;
