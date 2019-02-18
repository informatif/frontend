import { useEffect, useReducer, useCallback } from "react";

export const STATUSES = {
  refreshing: "refreshing",
  loadingMore: "loadingMore",
  idle: "idle"
};

const actions = {
  refresh: "refresh",
  loadMore: "loadMore",
  refreshed: "refreshed",
  loadedMore: "loadedMore",
  idle: "idle"
};

const abortErrorName = "AbortError";

let abortController = null;

export function useApi(path) {
  const [state, dispatch] = useReducer(reducer, {
    status: STATUSES.refreshing,
    items: [],
    page: 1
  });
  const refresh = useCallback(async () => {
    dispatch({
      type: actions.refresh
    });
    const newPage = 1;
    try {
      const newItems = await load(path, newPage);
      dispatch({ type: actions.refreshed, items: newItems, page: newPage });
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
      const newItems = await load(path, newPage);
      dispatch({
        type: actions.loadedMore,
        page: newPage,
        items: newItems
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

function reducer(state, action) {
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
      return {
        ...state,
        status: STATUSES.idle,
        items: action.items,
        page: action.page
      };
    case actions.loadedMore:
      // De-duplicate the arrays
      const reconciledItems = state.items;
      for (let item of action.items) {
        if (!state.items.find(el => el.id === item.id)) {
          reconciledItems.push(item);
        }
      }
      return {
        ...state,
        status: STATUSES.idle,
        items: reconciledItems,
        page: action.page
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

async function load(path, page) {
  if (abortController) {
    abortController.abort();
  }
  abortController = new AbortController();
  const res = await fetch(
    `https://informatif-api.herokuapp.com/api/v1/${path}?page=${page}`,
    {
      signal: abortController.signal
    }
  );
  return res.json();
}
