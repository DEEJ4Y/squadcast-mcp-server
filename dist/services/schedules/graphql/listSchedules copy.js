"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("../../../utils/store");
const axios_1 = require("../../../utils/axios");
const text_1 = __importDefault(require("../../../utils/contentModifiers/text"));
const listSchedules = async (data = { limit: 10, skip: 0 }) => {
    try {
        const response = await axios_1.apiInstance.post("/v3/graphql", {
            query: `query{
  schedules(filters:{
    teamID:"${await store_1.store.team.get()}",
    scheduleIDs:[],
    participants:[],
    escalationPolicies:[],
    myOncall:false,
    noEscalationPolicies:false,
    search:"migrated",
    limit:${data.limit},
    offset:${data.skip}
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
}`,
        }, {
            headers: {
                Authorization: `Bearer ${await store_1.store.accessToken.get()}`,
            },
        });
        if (response.status !== 200) {
            throw new Error("Failed to get schedules." + JSON.stringify(response.data, null, 2));
        }
        return (0, text_1.default)(`Schedules found successfully. Schedules:\n\n${JSON.stringify(response.data.data, null, 2)}`);
    }
    catch (error) {
        console.error(error);
        return (0, text_1.default)(error instanceof Error ? error.message : "Something went wrong.");
    }
};
exports.default = listSchedules;
