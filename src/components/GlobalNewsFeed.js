import React from "react";
import Feed from "./Feed";
import { useApi } from "../hooks/api";

export default function GlobalNewsFeed() {
  const { action, items, refresh, loadMore } = useApi("global");

  return (
    <Feed
      title="Global News"
      action={action}
      items={items}
      onRefresh={refresh}
      onLoadMore={loadMore}
    />
  );
}
