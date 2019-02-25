import React from "react";
import Feed from "./Feed";
import { useApi } from "./hooks";

export default function RedditFeed() {
  const { status, items, refresh } = useApi("reddit");

  return (
    <Feed title="Reddit" status={status} items={items} onRefresh={refresh} />
  );
}
