import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import fs from "fs/promises";

import { authInstance } from "../../utils/axios";
import getTextContent from "../../utils/contentModifiers/text";
import { store } from "../../utils/store";
import getConfig from "../../utils/config";

const isAuthenticated = async (): Promise<CallToolResult> => {
  try {
    const accessToken = await store.accessToken.get();

    if (accessToken) {
      return getTextContent("User is authenticated.");
    }

    const config = await getConfig();

    if (
      !config.SQUADCAST_REFRESH_TOKEN ||
      config.SQUADCAST_REFRESH_TOKEN === ""
    ) {
      throw new Error(
        "SQUADCAST_REFRESH_TOKEN environment variable is not set." +
          `value: ${config.SQUADCAST_REFRESH_TOKEN}`
      );
    }

    // Log user in
    const response = await authInstance.get("/oauth/access-token", {
      headers: {
        "X-Refresh-Token": config.SQUADCAST_REFRESH_TOKEN,
      },
    });

    if (response.status !== 200) {
      throw new Error("Failed to generate access token.");
    }

    await store.accessToken.set(response.data.data.access_token);

    return getTextContent(
      "Access token generated successfully. User is now authenticated."
    );
  } catch (error) {
    console.error(error);
    return getTextContent(
      error instanceof Error ? error.message : "Something went wrong."
    );
  }
};

export default isAuthenticated;
