import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { apiInstance } from "../../utils/axios";
import { store } from "../../utils/store";
import getTextContent from "../../utils/contentModifiers/text";

const listIncidents = async (data: {
  startTime: string;
  endTime: string;
  status: string[];
}): Promise<CallToolResult> => {
  try {
    const response = await apiInstance.get(
      `/v3/incidents/export/?start_time=${data.startTime}&end_time=${
        data.endTime
      }&owner_id=${await store.team.get()}&type=json${
        data.status.length > 0
          ? data.status.map((status) => `&status=${status}`).join("")
          : ""
      }`,
      {
        headers: {
          Authorization: `Bearer ${await store.accessToken.get()}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      getTextContent("No Incidents found with the provided filters.");
    }

    return getTextContent(
      `Incidents found successfully. Incidents:\n\n${JSON.stringify(
        response.data.incidents,
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

export default listIncidents;
