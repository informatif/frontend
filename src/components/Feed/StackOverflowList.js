import React, { useState, useEffect } from "react";
import List from "./List";
import LoadingSpinner from "../LoadingSpinner";

export default function StackOverflowList() {
  let abortController = null;

  useEffect(() => {
    handleRefresh();

    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, []);

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  async function handleRefresh() {
    setLoading(true);
    const newPage = page + 1;
    try {
      const newItems = formatApiItems(await load(newPage));
      setPage(newPage);
      setItems(newItems);
      setLoading(false);
    } catch (_) {
      // The component was unmounted
    }
  }

  async function handleLoadMore() {
    const newPage = page + 1;
    let newItems;
    try {
      newItems = formatApiItems(await load(newPage));
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
    const res = await fetch(
      `https://api.stackexchange.com/2.2/questions?page=${page}&order=desc&sort=hot&site=stackoverflow`,
      {
        signal: abortController.signal
      }
    );
    return (await res.json()).articles;
  }

  function formatApiItems(items = []) {
    return items.map(
      ({ link, title, score, answer_count, question_id, owner }) => ({
        link,
        title,
        points: score,
        responseCount: answer_count,
        id: question_id,
        author: owner.display_name
      })
    );
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <List
      title="Stack Overflow"
      items={items}
      handleRefresh={handleRefresh}
      handleLoadMore={handleLoadMore}
    />
  );
}
