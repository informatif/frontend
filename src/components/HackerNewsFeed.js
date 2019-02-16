import React from "react";
import Feed from "./Feed";
import { useApi, useDocumentTitle } from "../hooks";

const title = "Hacker News";

async function loadApi(page, signal) {
  const res = await fetch(`https://api.hnpwa.com/v0/news/${page}.json`, {
    signal
  });
  const items = await res.json();
  return items.map(({ title, points, comments_count, id, user }) => ({
    id,
    link: `https://news.ycombinator.com/item?id=${id}`,
    title,
    author: user,
    points,
    responseCount: comments_count
  }));
}

export default function HackerNewsFeed() {
  useDocumentTitle(title);

  const { loading, items, refresh, loadMore } = useApi(loadApi);

  return (
    <Feed
      title={title}
      items={items}
      onRefresh={refresh}
      onLoadMore={loadMore}
      loading={loading}
    />
  );
}
