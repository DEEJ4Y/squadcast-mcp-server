import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import getTextContent from "../../utils/contentModifiers/text";
import { store } from "../../utils/store";
import logger from "../../utils/logger";

const selectTeam = async (data: {
  teamId: string;
}): Promise<CallToolResult> => {
  try {
    await store.team.set(data.teamId);

    return getTextContent(
      `Team selected successfully. Team ID: ${data.teamId}`
    );
  } catch (error) {
    logger.error(error);
    return getTextContent(
      error instanceof Error ? error.message : "Something went wrong."
    );
  }
};

export default selectTeam;
