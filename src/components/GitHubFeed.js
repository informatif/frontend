import React from "react";
import Feed from "./Feed";
import { useApi } from "../hooks/api";

export default function GitHubFeed() {
  const { action, items, refresh } = useApi("gh");

  return (
    <Feed title="GitHub" action={action} items={items} onRefresh={refresh} />
  );
}
