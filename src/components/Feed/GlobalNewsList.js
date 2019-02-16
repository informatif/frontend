import React from "react";
import List from "./List";
import LoadingSpinner from "../LoadingSpinner";
import { useApi } from "./hooks";

async function loadApi(page, abortController) {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?language=en&page=${page}`,
    {
      signal: abortController.signal,
      headers: {
        Authorization: "Bearer e1e3caafb22c41cea70dfe4fb67f2d9e"
      }
    }
  );
  const items = (await res.json()).articles;
  return items.map(({ title, comments_count, source, url }) => ({
    link: url,
    title,
    responseCount: comments_count,
    id: `${source.name} - ${title}`,
    author: source.name
  }));
}

export default function GlobalNewsList() {
  const { loading, items, refresh, loadMore } = useApi(loadApi);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <List
      title="Global News"
      items={items}
      onRefresh={refresh}
      onLoadMore={loadMore}
    />
  );
}
