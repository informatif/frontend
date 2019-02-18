import React from "react";
import Feed from "./Feed";
import { useApi } from "../hooks/api";

export default function GlobalNewsFeed() {
  const { status, items, refresh, loadMore } = useApi("global");

  return (
    <Feed
      title="Global News"
      status={status}
      items={items}
      onRefresh={refresh}
      onLoadMore={loadMore}
    />
  );
}
