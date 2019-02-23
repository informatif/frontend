declare module "use-persisted-state" {
  export default function createPersistedState(
    key: string
  ): <T>(initialState: T) => [T, (newState: T | ((prevState: T) => T)) => void];
}
