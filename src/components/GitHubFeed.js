import React from "react";
import Feed from "./Feed";
import { useApi } from "../hooks";

async function loadApi(page, signal) {
  const res = await fetch(`https://github-trending-api.now.sh/repositories`, {
    signal
  });
  const items = await res.json();
  return items.map(({ url, author, name, stars, description }) => ({
    id: url,
    link: url,
    title: name,
    author,
    description,
    points: stars
  }));
}

export default function GitHubFeed() {
  const { loading, items, refresh } = useApi(loadApi);
  return (
    <Feed title="GitHub" items={items} onRefresh={refresh} loading={loading} />
  );
}
