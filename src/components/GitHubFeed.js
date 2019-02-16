import React from "react";
import Feed from "./Feed";
import { useApi, useDocumentTitle } from "../hooks";

const title = "GitHub";

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
  useDocumentTitle(title);

  const { loading, items, refresh } = useApi(loadApi);

  return (
    <Feed title={title} items={items} onRefresh={refresh} loading={loading} />
  );
}
