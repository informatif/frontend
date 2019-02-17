import React from "react";
import Feed from "./Feed";
import { useApi } from "../hooks/api";

const title = "GitHub";

async function loadApi(_, signal) {
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
  const { action, items, refresh } = useApi(loadApi);

  return (
    <Feed title={title} action={action} items={items} onRefresh={refresh} />
  );
}
