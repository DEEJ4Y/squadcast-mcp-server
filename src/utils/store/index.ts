import Keyv from "keyv";
import accessTokenStore from "./accessToken";
import teamStore from "./team";

const keyValueStore = new Keyv();

export default keyValueStore;

const store = {
  accessToken: accessTokenStore,
  team: teamStore,
};

export { store };
