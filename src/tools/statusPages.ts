import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import listStatusPages from "../services/statuspages/listStatusPages";
import z from "zod";
import listStatusPageComponents from "../services/statuspages/components/listStatusPageComponents";
import listStatusPageIssueStates from "../services/statuspages/issues/listIssueStates";
import listStatusPageStatuses from "../services/statuspages/listStatusPageStatuses";
import createStatusPageIssue from "../services/statuspages/issues/createIssue";

const initStatusPagesTools = (server: McpServer) => {
  server.tool(
    "listStatusPages",
    "Get a list of status pages.",
    {
      paginationPage: z
        .number()
        .default(1)
        .describe("The pagination page number."),
    },
    listStatusPages
  );

  server.tool(
    "listStatusPageStatuses",
    "Get a list of status page statuses given a status page ID.",
    {
      statusPageId: z.number().describe("The ID of the status page."),
    },
    listStatusPageStatuses
  );

  server.tool(
    "listStatusPageComponents",
    "Get a list of status page components given a status page ID.",
    {
      statusPageId: z.string().describe("The ID of the status page."),
    },
    listStatusPageComponents
  );

  server.tool(
    "listStatusPageIssueStates",
    "Get a list of status page issue states given a status page ID.",
    {
      statusPageId: z.string().describe("The ID of the status page."),
    },
    listStatusPageIssueStates
  );

  server.tool(
    "createStatusPageIssue",
    "Create a status page issue given a status page ID, title, status ID, components, and issues.",
    {
      statusPageId: z.number().describe("The ID of the status page."),
      title: z.string().describe("The title of the issue."),
      statusID: z
        .number()
        .describe(
          "The ID of the status page status. Statuses can be found using the listStatusPageStatuses tool."
        ),
      components: z
        .object({
          id: z.number().describe("The ID of the component."),
          statusID: z
            .number()
            .describe(
              "The ID of the status page status. Statuses can be found using the listStatusPageStatuses tool."
            ),
        })
        .array()
        .describe(
          "The affected components because of the issue. Components can be found using the listStatusPageComponents tool."
        ),
      issues: z
        .array(
          z.object({
            stateID: z
              .number()
              .describe(
                "The ID of the status page issue state. Issue states can be found using the listStatusPageIssueStates tool."
              ),
            stateMessages: z
              .array(
                z.object({
                  text: z.string().describe("The issue message."),
                  timestamp: z
                    .string()
                    .describe(
                      "The time when the message is to be added in ISO format."
                    ),
                })
              )
              .describe("The messages to be added as part of the issue."),
          })
        )
        .describe(
          "The list of issues to be created as part of this request. The stateID is a status page issue state. The stateMessages array is a list of messages to be added as part of the issue. The text field is the issue message and the timestamp is the time when the message is to be added."
        ),
    },
    createStatusPageIssue
  );
};

export default initStatusPagesTools;
