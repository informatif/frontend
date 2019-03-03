import React from "react";
import { FEED_ID_TO_TITLE } from "../preferences/constants";
import Feed from "./Feed";
import { useApi } from "./hooks";

export default function GlobalNewsFeed() {
  const { status, items, loadMore } = useApi("global");

  return (
    <Feed
      title={FEED_ID_TO_TITLE.global}
      status={status}
      items={items}
      onLoadMore={loadMore}
    />
  );
}
