import { useEffect, useRef, useReducer } from "react";

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

export function useApi(path) {
  let abortControllerRef = useRef(null);

  useEffect(() => {
    refresh();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
  }, [abortControllerRef]);

  const [state, dispatch] = useReducer(reducer, {
    status: STATUSES.refreshing,
    items: [],
    page: 1
  });

  async function refresh() {
    dispatch({
      type: actions.refresh
    });
    const newPage = 1;
    try {
      const newItems = await load(newPage);
      dispatch({ type: actions.refreshed, items: newItems, page: newPage });
    } catch (err) {
      if (err.name !== "AbortError") {
        dispatch({ type: actions.idle });
        console.error(err);
      }
    }
  }

  async function loadMore() {
    dispatch({ type: actions.loadMore });
    const newPage = state.page + 1;
    try {
      const newItems = await load(newPage);
      dispatch({
        type: actions.loadedMore,
        page: newPage,
        items: newItems
      });
    } catch (err) {
      if (err.name !== "AbortError") {
        dispatch({ type: actions.idle });
        console.error(err);
      }
    }
  }

  async function load(page) {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const res = await fetch(
      `https://informatif-api.herokuapp.com/api/v1/${path}?page=${page}`,
      {
        signal: abortControllerRef.current.signal
      }
    );
    return res.json();
  }

  return {
    items: state.items,
    status: state.status,
    refresh,
    loadMore
  };
}
