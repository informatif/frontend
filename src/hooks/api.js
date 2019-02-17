import { useEffect, useState, useRef } from "react";
import { unstable_batchedUpdates } from "react-dom";

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

  const [action, setAction] = useState(API_ACTIONS.refreshing);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  async function refresh() {
    setAction(API_ACTIONS.refreshing);
    const newPage = 1;
    try {
      const newItems = await load(newPage);
      unstable_batchedUpdates(() => {
        setItems(newItems);
        setPage(newPage);
        setAction(API_ACTIONS.idle);
      });
    } catch (err) {
      if (err.name !== "AbortError") {
        setAction(API_ACTIONS.idle);
        console.error(err);
      }
    }
  }

  async function loadMore() {
    setAction(API_ACTIONS.loading);
    const newPage = page + 1;
    try {
      const newItems = await load(newPage);
      unstable_batchedUpdates(() => {
        setItems(oldItems => {
          // De-duplicate the arrays
          const consolidatedItems = oldItems;
          for (let item of newItems) {
            if (!oldItems.find(el => el.id === item.id)) {
              consolidatedItems.push(item);
            }
          }
          return consolidatedItems;
        });
        setPage(newPage);
        setAction(API_ACTIONS.idle);
      });
    } catch (err) {
      if (err.name !== "AbortError") {
        setAction(API_ACTIONS.idle);
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
    items,
    action,
    refresh,
    loadMore
  };
}

export const API_ACTIONS = {
  refreshing: "refreshing",
  loading: "loading",
  idle: "idle"
};
