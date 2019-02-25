import { useCallback, useEffect, useReducer } from "react";
import { STATUSES } from "../constants/api";
import { Item } from "../constants/Item";

interface State {
  status: string;
  items: Item[];
  page: number;
}

interface Action {
  type: string;
  payload?: {
    items: Item[];
    page: number;
  };
}

const actions = {
  refresh: "refresh",
  loadMore: "loadMore",
  refreshed: "refreshed",
  loadedMore: "loadedMore",
  idle: "idle"
};

const abortErrorName = "AbortError";

let abortController: AbortController | null = null;

export function useApi(path: string) {
  const [state, dispatch] = useReducer(reducer, {
    status: STATUSES.refreshing,
    items: [],
    page: 1
  });
  const refresh = useCallback(async () => {
    dispatch({ type: actions.refresh });
    const newPage = 1;
    try {
      const newItems = await load({ path, page: newPage, bypassCache: true });
      dispatch({
        type: actions.refreshed,
        payload: { items: newItems, page: newPage }
      });
    } catch (err) {
      if (err.name !== abortErrorName) {
        dispatch({ type: actions.idle });
        console.error(err);
      }
    }
  }, [dispatch, path]);
  const loadMore = useCallback(async () => {
    dispatch({ type: actions.loadMore });
    const newPage = state.page + 1;
    try {
      const newItems = await load({ path, page: newPage });
      dispatch({
        type: actions.loadedMore,
        payload: { items: newItems, page: newPage }
      });
    } catch (err) {
      if (err.name !== abortErrorName) {
        dispatch({ type: actions.idle });
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
    case actions.refresh:
      return {
        ...state,
        status: STATUSES.refreshing
      };
    case actions.loadMore:
      return {
        ...state,
        status: STATUSES.loadingMore
      };
    case actions.refreshed:
      if (!action.payload) {
        return {
          ...state,
          status: STATUSES.idle
        };
      }
      return {
        ...state,
        status: STATUSES.idle,
        items: action.payload.items,
        page: action.payload.page
      };
    case actions.loadedMore:
      if (!action.payload) {
        return {
          ...state,
          status: STATUSES.idle
        };
      }
      // De-duplicate the arrays
      const reconciledItems = state.items;
      for (let item of action.payload.items) {
        if (!state.items.find(el => el.id === item.id)) {
          reconciledItems.push(item);
        }
      }
      return {
        ...state,
        status: STATUSES.idle,
        items: reconciledItems,
        page: action.payload.page
      };
    case actions.idle:
      return {
        ...state,
        status: STATUSES.idle
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
