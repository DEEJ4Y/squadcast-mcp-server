import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { apiInstance } from "../../utils/axios";
import { store } from "../../utils/store";
import getTextContent from "../../utils/contentModifiers/text";

const listStatusPages = async (data: {
  paginationPage: number;
}): Promise<CallToolResult> => {
  try {
    const response = await apiInstance.get(
      `/v4/statuspages?teamID=${await store.team.get()}&pageSize=5&pageNumber=${String(
        data.paginationPage
      )}`,
      {
        headers: {
          Authorization: `Bearer ${await store.accessToken.get()}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to get status pages.");
    }

    return getTextContent(
      `Status pages found successfully. Status pages:\n\n${JSON.stringify(
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

export default listStatusPages;
