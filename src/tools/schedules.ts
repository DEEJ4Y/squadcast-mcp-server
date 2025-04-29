import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import whoIsOnCall from "../services/schedules/whoIsOnCall";
import listSchedules from "../services/schedules/graphql/listSchedules";
import z from "zod";
import createSchedule from "../services/schedules/graphql/createSchedule";

const initSchedulesTools = (server: McpServer) => {
  server.tool(
    "whoIsOnCall",
    "Get the user(s) who is currently on call.",
    {},
    whoIsOnCall
  );

  server.tool(
    "listSchedules",
    "Get a list of schedules.",
    {
      query: z.string().describe(`The GraphQL query to execute.
        
Example: List Schedules

Below filters are available for get schedules
- teamID: String
- scheduleIDs: [Int!]
- participants: [String!]
- escalationPolicies: [String!]
- myOncall: Boolean
- noEscalationPolicies: Boolean
- search: String
- limit: Int
- offset: Int

query{
  schedules(filters:{
    teamID:"62442e4182c4725938208e11",
    scheduleIDs:[],
    participants:[],
    escalationPolicies:[],
    myOncall:false,
    noEscalationPolicies:false,
    search:"migrated",
    limit:1,
    offset:0
  }){
    ID,
    orgID,
    teamID,
    name,
    description,
    timeZone,
    paused,
    owner{
      type,
      ID
    },
    rotations{
      ID,
      name,
      color,
      startDate,
      period,
      participantGroups{
        participants{
          type,
          ID
        }
      }
      changeParticipantsUnit,
      changeParticipantsFrequency,
      endDate,
      endsAfterIterations
    },
    escalationPolicies{
      ID,
      name
    }
  }
}`),
    },
    listSchedules
  );

  server.tool(
    "createSchedule",
    "Create a schedule given a name, time zone, and rotations. ",
    {
      query: z.string().describe(`The GraphQL query to execute.
  
Example: Create Schedule with Rotation and Groups of Participants
- 2 groups with 2 participant each
Rotation Details:
  -  Name: Weekly Rotation
  -  Start Date: April 29, 2025 (12:00 PM IST - adjusted to midnight UTC in the system)
  -  Rotation Period: Weekly
  -  Change Frequency: Every 1 week

\`\`\`graphql
mutation {
  createSchedule(input:{
    teamID:"6683d1b3f9e02b2ea79a7ceb",
    name:"Test Oncall Schedule with Shifts",
    timeZone:"Asia/Kolkata",
    rotations:[{
      name:"Weekly Rotation",
      startDate:"2025-04-29T06:30:00Z", 
      period:weekly,
      changeParticipantsFrequency:1,
      changeParticipantsUnit:rotation,
      shiftTimeSlot: {
        startHour: 12,
        startMin: 0,
        duration: 10080
      },
      participantGroups:[{
        participants:[{
          type:"user",
          ID:"63eb5ca221a210b06ef1f827"
        },{
          type:"user",
          ID:"63c8e3ec03379e17fd2c48ae"
        }]
      },
      {
        participants:[{
          type:"user",
          ID:"633ec763162db20d7b789cb6"
        },{
          type:"user",
          ID:"64abf3eff2bfa4a34745a630"
        }]
      }]
    }],
    owner:{
      type:user,
      ID:"64abf3eff2bfa4a34745a630"
    }
  }){
    ID,
    name,
    rotations{
      ID,
      name,
      startDate,
      period,
      shiftTimeSlot{
        startHour,
        startMin,
        duration
      },
      changeParticipantsUnit,
      changeParticipantsFrequency
    },
    timeZone
  }
}
\`\`\`

The key elements that made this work:

1. The \`shiftTimeSlot\` object is crucial for defining when shifts start and their duration:
   - \`startHour\`: 12 (noon)
   - \`startMin\`: 0
   - \`duration\`: 10080 (minutes, equivalent to 7 days)

2. For weekly rotation:
   - \`period\`: weekly
   - \`changeParticipantsFrequency\`: 1
   - \`changeParticipantsUnit\`: rotation

3. For participant groups:
   - Each group can have multiple participants
   - Each participant needs \`type\` and \`ID\` fields

4. The \`owner\` field is required with \`type\` and \`ID\` fields

5. Enums like \`weekly\`, \`rotation\`, and \`user\` are used without quotes

`),
    },
    createSchedule
  );
};

export default initSchedulesTools;
