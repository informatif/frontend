import React from "react";
import Feed from "./Feed";
import { useApi } from "../hooks";

async function loadApi(page, signal) {
  const res = await fetch(`https://github-trending-api.now.sh/repositories`, {
    signal
  });
  const items = await res.json();
  return items.map(({ url, author, name, stars }) => ({
    id: url,
    link: url,
    author,
    title: name,
    points: stars
  }));
}

export default function GitHubFeed() {
  const { loading, items, refresh } = useApi(loadApi);
  return (
    <Feed title="GitHub" items={items} onRefresh={refresh} loading={loading} />
  );
}
