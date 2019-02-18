import React from "react";
import Feed from "./Feed";
import { useApi } from "../hooks/api";

export default function StackOverflowFeed() {
  const { status, items, refresh, loadMore } = useApi("so");

  return (
    <Feed
      title="Stack Overflow"
      status={status}
      items={items}
      onRefresh={refresh}
      onLoadMore={loadMore}
    />
  );
}
