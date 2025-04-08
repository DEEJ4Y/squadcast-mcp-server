import keyValueStore from ".";

const teamStore = {
  get: async () => await keyValueStore.get("team"),
  set: async (teamId: string) => await keyValueStore.set("team", teamId),
};

export default teamStore;
