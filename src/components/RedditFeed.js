import React from "react";
import Feed from "./Feed";
import { useApi } from "../hooks/api";

export default function RedditFeed() {
  const { action, items, refresh } = useApi("reddit");

  return (
    <Feed title="Reddit" action={action} items={items} onRefresh={refresh} />
  );
}
