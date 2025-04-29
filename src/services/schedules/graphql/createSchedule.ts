// import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
// import { store } from "../../../utils/store";
// import { apiInstance } from "../../../utils/axios";
// import getTextContent from "../../../utils/contentModifiers/text";

// const createSchedule = async (data: {
//   name: string;
//   timeZone: string;
//   rotations: {
//     name: string;
//     participantGroups: {
//       participants: {
//         type: string;
//         ID: string;
//       }[];
//     }[];
//     startDate: string;
//     shiftTimeSlot: {
//       startHour: number;
//       startMin: number;
//       duration: number;
//     };
//     period: string;
//     changeParticipantsFrequency: number;
//     changeParticipantsUnit: string;
//   }[];
// }): Promise<CallToolResult> => {
//   try {
//     const response = await apiInstance.post(
//       "/v3/graphql",
//       {
//         query: `mutation {
//           createSchedule(input:{
//             teamID:"${await store.team.get()}",
//             name:"${data.name}",
//             timeZone:"${data.timeZone}",
//             rotations:[${data.rotations
//               .map(
//                 (rotation) =>
//                   `{
//               name:"${rotation.name}",
//               startDate:"${rotation.startDate}",
//               shiftTimeSlot:{
//                 startHour:${rotation.shiftTimeSlot.startHour},
//                 startMin:${rotation.shiftTimeSlot.startMin},
//                 duration:${rotation.shiftTimeSlot.duration}
//               },
//               period:${rotation.period},
//               changeParticipantsFrequency:${
//                 rotation.changeParticipantsFrequency
//               },
//               changeParticipantsUnit:${rotation.changeParticipantsUnit},
//               participantGroups:[${rotation.participantGroups
//                 .map(
//                   (participantGroup) =>
//                     `{
//                 participants:[${participantGroup.participants
//                   .map(
//                     (participant) =>
//                       `{type:"${participant.type}", ID:"${participant.ID}"}`
//                   )
//                   .join(",\n")}]
//               }`
//                 )
//                 .join(",\n")}]
//             }`
//               )
//               .join(",\n")}],
//             owner:{
//               type:team,
//               ID:"${await store.team.get()}"
//             }
//           }){
//             ID,
//             name,
//             rotations{
//               ID,
//               name,
//               startDate,
//               period,
//               changeParticipantsUnit,
//               changeParticipantsFrequency,
//               participantGroups{
//                 participants{
//                   type,
//                   ID
//                 }
//               }
//             },
//             timeZone
//           }
//         }`,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${await store.accessToken.get()}`,
//         },
//       }
//     );

//     console.log(
//       "Request body: ",
//       JSON.stringify(response.config.data, null, 2)
//     );
//     console.log(
//       "Request header: ",
//       JSON.stringify(response.config.headers, null, 2)
//     );
//     console.log("Status: ", response.status);
//     console.log("Response: ", JSON.stringify(response.data, null, 2));

//     if (response.status !== 200) {
//       console.error("Failed to create schedule. Response: ", response.data);
//       throw new Error(
//         "Failed to get schedules. Response: " +
//           JSON.stringify(response.data, null, 2)
//       );
//     }

//     return getTextContent(
//       `Schedules created successfully. Schedule:\n\n${JSON.stringify(
//         response.data.data,
//         null,
//         2
//       )}`
//     );
//   } catch (error) {
//     console.error(error);
//     return getTextContent(
//       error instanceof Error ? error.message : "Something went wrong."
//     );
//   }
// };

// export default createSchedule;

import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { store } from "../../../utils/store";
import { apiInstance } from "../../../utils/axios";
import getTextContent from "../../../utils/contentModifiers/text";

const createSchedule = async (data: {
  query: string;
}): Promise<CallToolResult> => {
  try {
    const response = await apiInstance.post(
      "/v3/graphql",
      {
        query: data.query,
      },
      {
        headers: {
          Authorization: `Bearer ${await store.accessToken.get()}`,
        },
      }
    );

    return getTextContent(
      `Response:\n\n${JSON.stringify(response.data, null, 2)}`
    );
  } catch (error) {
    console.error(error);
    return getTextContent(
      error instanceof Error ? error.message : "Something went wrong."
    );
  }
};

export default createSchedule;
