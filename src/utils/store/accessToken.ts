import keyValueStore from ".";

const accessTokenStore = {
  get: async () => await keyValueStore.get("accessToken"),
  set: async (accessToken: string) =>
    await keyValueStore.set("accessToken", accessToken),
};

export default accessTokenStore;
