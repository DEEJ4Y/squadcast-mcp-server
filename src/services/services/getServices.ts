import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import getTextContent from "../../utils/contentModifiers/text";
import { store } from "../../utils/store";
import { apiInstance } from "../../utils/axios";

const getServices = async (): Promise<CallToolResult> => {
  try {
    const response = await apiInstance.get(`/v3/services?owner_id=${await store.team.get()}`, {
      headers: {
        Authorization: `Bearer ${await store.accessToken.get()}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to get services.");
    }

    return getTextContent(
      `Services found successfully. Services:\n\n${JSON.stringify(response.data.data, null, 2)}`
    );
  } catch (error) {
    console.error(error);
    return getTextContent(
      error instanceof Error ? error.message : "Something went wrong."
    );
  }
};

export default getServices;
