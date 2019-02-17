import { useEffect, useState, useRef } from "react";
import { unstable_batchedUpdates } from "react-dom";

export function useApi(loadApi) {
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

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  async function refresh() {
    setLoading(true);
    const newPage = 1;
    try {
      const newItems = await load(newPage);
      unstable_batchedUpdates(() => {
        setItems(newItems);
        setPage(newPage);
        setLoading(false);
      });
    } catch (_) {
      // The component was unmounted
    }
  }

  async function loadMore() {
    setLoading(true);
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
        setLoading(false);
      });
    } catch (_) {
      // The component was unmounted
    }
  }

  async function load(page) {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    return await loadApi(page, abortControllerRef.current.signal);
  }

  return {
    loading,
    items,
    refresh,
    loadMore
  };
}

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = `Informatif — ${title}`;
  }, [title]);
}
