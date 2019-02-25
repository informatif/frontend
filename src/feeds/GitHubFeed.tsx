import React from "react";
import Feed from "./Feed";
import { useApi } from "./hooks";

export default function GitHubFeed() {
  const { status, items, refresh } = useApi("gh");

  return (
    <Feed title="GitHub" status={status} items={items} onRefresh={refresh} />
  );
}
