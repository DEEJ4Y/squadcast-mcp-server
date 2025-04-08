import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

const getTextContent = (content: string): CallToolResult => {
  return {
    content: [
      {
        type: "text",
        text: content,
      },
    ],
  };
};

export default getTextContent;
