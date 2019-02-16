import { useEffect, useState } from "react";

export function useApi(loadApi) {
  let abortController = null;

  useEffect(() => {
    refresh();

    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, []);

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  async function refresh() {
    setLoading(true);
    const newPage = 1;
    try {
      const newItems = await load(newPage);
      setPage(newPage);
      setItems(newItems);
      setLoading(false);
    } catch (_) {
      // The component was unmounted
    }
  }

  async function loadMore() {
    const newPage = page + 1;
    let newItems;
    try {
      newItems = await load(newPage);
    } catch (_) {
      // The component was unmounted
      return;
    }
    // The paging API returns duplicates between pages,
    // so we have to de-duplicate the Arrays.
    const consolidatedItems = items;
    for (let item of newItems) {
      if (!items.find(el => el.id === item.id)) {
        consolidatedItems.push(item);
      }
    }
    setPage(newPage);
    setItems(consolidatedItems);
  }

  async function load(page) {
    abortController = new AbortController();
    return await loadApi(page, abortController.signal);
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
