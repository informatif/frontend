import React from "react";
import { FEED_ID_TO_TITLE } from "../preferences/constants";
import Feed from "./Feed";
import { useApi } from "./hooks";

export default function HackerNewsFeed() {
  const { status, items, loadMore } = useApi("hn");

  return (
    <Feed
      title={FEED_ID_TO_TITLE.hn}
      status={status}
      items={items}
      onLoadMore={loadMore}
    />
  );
}
