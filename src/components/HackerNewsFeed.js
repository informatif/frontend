import React from "react";
import Feed from "./Feed";
import { useApi } from "../hooks/api";

export default function HackerNewsFeed() {
  const { status, items, refresh, loadMore } = useApi("hn");

  return (
    <Feed
      title="Hacker News"
      status={status}
      items={items}
      onRefresh={refresh}
      onLoadMore={loadMore}
    />
  );
}
