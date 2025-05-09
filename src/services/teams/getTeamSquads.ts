import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { apiInstance } from "../../utils/axios";
import getTextContent from "../../utils/contentModifiers/text";
import { store } from "../../utils/store";

export const getTeamSquads = async (): Promise<CallToolResult> => {
  try {
    const response = await apiInstance.get(
      `/v3/squads?owner_id=${await store.team.get()}`,
      {
        headers: {
          Authorization: `Bearer ${await store.accessToken.get()}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(
        `Failed to get squads.Status: ${response.status}, Message: ${
          response.data?.message || "No additional details available."
        }`
      );
    }

    return getTextContent(
      `Squads found successfully. Squads:\n\n${JSON.stringify(
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
