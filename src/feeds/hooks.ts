import { useCallback, useEffect, useReducer } from "react";
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

let abortController: AbortController | null = null;

export function useApi(path: string) {
  const [state, dispatch] = useReducer(reducer, {
    status: Status.refreshing,
    items: [],
    page: 1
  });
  const refresh = useCallback(async () => {
    dispatch({ type: ActionType.refresh });
    const newPage = 1;
    try {
      const newItems = await load({ path, page: newPage, bypassCache: true });
      dispatch({
        type: ActionType.refreshed,
        payload: { items: newItems, page: newPage }
      });
    } catch (err) {
      if (err.name !== abortErrorName) {
        dispatch({ type: ActionType.idle });
        console.error(err);
      }
    }
  }, [dispatch, path]);
  const loadMore = useCallback(async () => {
    dispatch({ type: ActionType.loadMore });
    const newPage = state.page + 1;
    try {
      const newItems = await load({ path, page: newPage });
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
  }, [dispatch, path, state.page]);

  useEffect(() => {
    refresh();

    return () => {
      if (abortController) {
        abortController.abort();
        abortController = null;
      }
    };
  }, [refresh]);

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
      // De-duplicate the arrays
      const reconciledItems = [...state.items];
      for (let item of action.payload.items) {
        if (!state.items.find(el => el.id === item.id)) {
          reconciledItems.push(item);
        }
      }
      return {
        ...state,
        status: Status.idling,
        items: reconciledItems,
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
  bypassCache = false
}: {
  path: string;
  page: number;
  bypassCache?: boolean;
}) {
  if (abortController) {
    abortController.abort();
  }
  abortController = new AbortController();

  const options: RequestInit = {
    signal: abortController.signal,
    cache: bypassCache ? "reload" : "default"
  };
  const res = await fetch(
    `https://informatif-api.herokuapp.com/api/v1/${path}?page=${page}`,
    options
  );
  return res.json();
}
