import React from "react";
import { FEED_ID_TO_TITLE } from "../preferences/constants";
import Feed from "./Feed";
import { useApi } from "./hooks";

export default function StackOverflowFeed() {
  const { status, items, refresh, loadMore } = useApi("so");

  return (
    <Feed
      title={FEED_ID_TO_TITLE.so}
      status={status}
      items={items}
      onRefresh={refresh}
      onLoadMore={loadMore}
    />
  );
}
