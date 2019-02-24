import createPersistedState from "use-persisted-state";

export const useLeftHandedMode = createPersistedState("left-handed-mode");
export const useDisplayedFeed = (feed: string) =>
  createPersistedState(`${feed}-displayed`);
