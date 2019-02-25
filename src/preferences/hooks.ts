import createPersistedState from "use-persisted-state";
import { FEED_ID_TO_TITLE } from "./constants";

export const useLeftHandedMode = createPersistedState("left-handed-mode");

export const useDisplayedFeeds: {
  [index: string]: <T>(
    initialState: T
  ) => [T, (newState: T | ((prevState: T) => T)) => void];
} = {};
Object.keys(FEED_ID_TO_TITLE).forEach(id => {
  useDisplayedFeeds[id] = createPersistedState(`${id}-displayed`);
});
