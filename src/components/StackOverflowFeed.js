import React from "react";
import Feed from "./Feed";
import { useApi } from "../hooks/api";

export default function StackOverflowFeed() {
  const { action, items, refresh, loadMore } = useApi("so");

  return (
    <Feed
      title="Stack Overflow"
      action={action}
      items={items}
      onRefresh={refresh}
      onLoadMore={loadMore}
    />
  );
}
