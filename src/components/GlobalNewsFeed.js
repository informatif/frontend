import React from "react";
import Feed from "./Feed";
import { useApi, useDocumentTitle } from "../hooks";

const title = "Global News";

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
    id: `${source.name} - ${title}`,
    link: url,
    title,
    author: source.name,
    responseCount: comments_count
  }));
}

export default function GlobalNewsFeed() {
  useDocumentTitle(title);

  const { loading, items, refresh, refreshing, loadMore } = useApi(loadApi);

  return (
    <Feed
      title={title}
      items={items}
      onRefresh={refresh}
      refreshing={refreshing}
      onLoadMore={loadMore}
      loading={loading}
    />
  );
}
