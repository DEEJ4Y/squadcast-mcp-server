import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import { apiInstance } from "../../utils/axios";
import getTextContent from "../../utils/contentModifiers/text";
import { store } from "../../utils/store";
import logger from "../../utils/logger";

const getTeamUsers = async (): Promise<CallToolResult> => {
  try {
    const usersResponse = await apiInstance.get(`/v3/users`, {
      headers: {
        Authorization: `Bearer ${await store.accessToken.get()}`,
      },
    });

    if (usersResponse.status !== 200) {
      throw new Error("Failed to get users.");
    }

    const response = await apiInstance.get(
      `/v3/teams/${await store.team.get()}/members`,
      {
        headers: {
          Authorization: `Bearer ${await store.accessToken.get()}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to get team members.");
    }

    const teamUserIds: Record<string, boolean> = {};
    response.data.data.forEach((userIdMapping: { user_id: string }) => {
      teamUserIds[userIdMapping.user_id] = true;
    });

    const users = usersResponse.data.data.filter(
      (user: any) => teamUserIds[user.id]
    );

    return getTextContent(
      `Team members found successfully. Members:\n\n${JSON.stringify(
        users.map((user: any) => ({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          username_for_display: user.username_for_display,
          email: user.email,
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

export default getTeamUsers;
