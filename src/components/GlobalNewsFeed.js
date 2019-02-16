import React from "react";
import Feed from "./Feed";
import { useApi } from "../hooks";

async function loadApi(page, signal) {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?language=en&page=${page}`,
    {
      signal,
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

export default function GlobalNewsFeed() {
  const { loading, items, refresh, loadMore } = useApi(loadApi);

  return (
    <Feed
      title="Global News"
      items={items}
      onRefresh={refresh}
      onLoadMore={loadMore}
      loading={loading}
    />
  );
}
