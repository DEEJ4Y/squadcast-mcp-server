import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

import getTextContent from "../../utils/contentModifiers/text";

const getTime = async (): Promise<CallToolResult> => {
  try {
    const currentTime = new Date().toISOString();
    return getTextContent(`Current time in ISO format: ${currentTime}`);
  } catch (error) {
    console.error(error);
    return getTextContent(
      error instanceof Error ? error.message : "Something went wrong."
    );
  }
};

export default getTime;
