import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import { apiInstance } from "../../utils/axios";
import getTextContent from "../../utils/contentModifiers/text";
import { store } from "../../utils/store";
import logger from "../../utils/logger";

const getTeams = async (): Promise<CallToolResult> => {
  try {
    const response = await apiInstance.get("/v3/teams", {
      headers: {
        Authorization: `Bearer ${await store.accessToken.get()}`,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to get teams.");
    }

    return getTextContent(
      `Teams found successfully. Teams:\n\n${JSON.stringify(
        response.data.data.map((team: any) => ({
          id: team.id,
          name: team.name,
          description: team.description,
          default: team.default,
        })),
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

export default getTeams;
