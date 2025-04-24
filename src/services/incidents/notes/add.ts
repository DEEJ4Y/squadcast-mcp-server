import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { apiInstance } from "../../../utils/axios";
import { store } from "../../../utils/store";
import getTextContent from "../../../utils/contentModifiers/text";

const addIncidentNote = async (data: {
  incidentId: string;
  note: string;
}): Promise<CallToolResult> => {
  try {
    const response = await apiInstance.post(
      `/v3/incidents/${data.incidentId}/warroom`,
      {
        message: data.note,
      },
      {
        headers: {
          Authorization: `Bearer ${await store.accessToken.get()}`,
        },
      }
    );

    if (response.status !== 201) {
      throw new Error(
        "Failed to add note to incident." +
          JSON.stringify(response.data, null, 2)
      );
    }

    return getTextContent(`Added note to incident.`);
  } catch (error) {
    console.error(error);
    return getTextContent(
      error instanceof Error ? error.message : "Something went wrong."
    );
  }
};

export default addIncidentNote;
