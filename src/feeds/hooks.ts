import { useCallback, useEffect, useReducer, useRef } from "react";
import { Status, Item } from "./constants";

interface State {
  status: Status;
  items: Item[];
  page: number;
}

interface Action {
  type: ActionType;
  payload?: {
    items: Item[];
    page: number;
  };
}

enum ActionType {
  refresh,
  loadMore,
  refreshed,
  loadedMore,
  idle
}

const abortErrorName = "AbortError";

export function useApi(path: string) {
  const abortController = useRef(new AbortController());
  const [state, dispatch] = useReducer(reducer, {
    status: Status.refreshing,
    items: [],
    page: 1
  });
  const refresh = useCallback(async () => {
    dispatch({ type: ActionType.refresh });
    renewAbortController(abortController);
    const loads = [];
    for (let i = 1; i <= state.page; i++) {
      loads.push(
        load({
          path,
          page: i,
          signal: abortController.current.signal,
          bypassCache: true
        })
      );
    }
    try {
      const newItems = dedupe(await Promise.all(loads));
      dispatch({
        type: ActionType.refreshed,
        payload: { items: newItems, page: state.page }
      });
    } catch (err) {
      if (err.name !== abortErrorName) {
        dispatch({ type: ActionType.idle });
        console.error(err);
      }
    }
  }, [dispatch, path, state.page, abortController, renewAbortController]);
  const loadMore = useCallback(async () => {
    dispatch({ type: ActionType.loadMore });
    renewAbortController(abortController);
    const newPage = state.page + 1;
    try {
      const newItems = await load({
        path,
        page: newPage,
        signal: abortController.current.signal
      });
      dispatch({
        type: ActionType.loadedMore,
        payload: { items: newItems, page: newPage }
      });
    } catch (err) {
      if (err.name !== abortErrorName) {
        dispatch({ type: ActionType.idle });
        console.error(err);
      }
    }
  }, [dispatch, path, state.page, abortController, renewAbortController]);

  useEffect(() => {
    refresh();

    return () => {
      renewAbortController(abortController);
    };
  }, [refresh, abortController, renewAbortController]);

  return {
    items: state.items,
    status: state.status,
    refresh,
    loadMore
  };
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.refresh:
      return {
        ...state,
        status: Status.refreshing
      };
    case ActionType.loadMore:
      return {
        ...state,
        status: Status.loadingMore
      };
    case ActionType.refreshed:
      if (!action.payload) {
        return {
          ...state,
          status: Status.idling
        };
      }
      return {
        ...state,
        status: Status.idling,
        items: action.payload.items,
        page: action.payload.page
      };
    case ActionType.loadedMore:
      if (!action.payload) {
        return {
          ...state,
          status: Status.idling
        };
      }
      const items = dedupe([state.items, action.payload.items]);
      return {
        ...state,
        status: Status.idling,
        items,
        page: action.payload.page
      };
    case ActionType.idle:
      return {
        ...state,
        status: Status.idling
      };
    default:
      return state;
  }
}

async function load({
  path,
  page,
  signal,
  bypassCache = false
}: {
  path: string;
  page: number;
  signal: AbortSignal;
  bypassCache?: boolean;
}) {
  const options: RequestInit = {
    signal,
    cache: bypassCache ? "reload" : "default"
  };
  const res = await fetch(
    `https://informatif-api.now.sh/api/v1/${path}?page=${page}`,
    options
  );
  return res.json();
}

function dedupe(arrays: Item[][]) {
  if (arrays.length === 0) return [];
  if (arrays.length === 1) return arrays[0];

  const deduplicated = [];
  const storedIds = new Set();
  for (let arr of arrays) {
    for (let item of arr) {
      if (!storedIds.has(item.id)) {
        // Assume that there cannot be any duplicates within an array
        deduplicated.push(item);
        storedIds.add(item.id);
      }
    }
  }
  return deduplicated;
}

function renewAbortController(
  abortController: React.MutableRefObject<AbortController>
) {
  abortController.current.abort();
  abortController.current = new AbortController();
}
