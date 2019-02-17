import React from "react";
import Feed from "./Feed";
import { useApi } from "../hooks/api";

export default function HackerNewsFeed() {
  const { action, items, refresh, loadMore } = useApi("hn");

  return (
    <Feed
      title="Hacker News"
      action={action}
      items={items}
      onRefresh={refresh}
      onLoadMore={loadMore}
    />
  );
}
