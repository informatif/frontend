import React from "react";
import Feed from "./Feed";
import { useApi, useDocumentTitle } from "../hooks";

const title = "Stack Overflow";

async function loadApi(page, signal) {
  const res = await fetch(
    `https://api.stackexchange.com/2.2/questions?page=${page}&order=desc&sort=hot&site=stackoverflow`,
    {
      signal
    }
  );
  const items = (await res.json()).items;
  return items.map(
    ({ link, title, score, answer_count, question_id, owner }) => ({
      link,
      title,
      points: score,
      responseCount: answer_count,
      id: question_id,
      author: owner.display_name
    })
  );
}

export default function StackOverflowFeed() {
  useDocumentTitle(title);

  const { loading, items, refresh, refreshing, loadMore } = useApi(loadApi);

  return (
    <Feed
      title={title}
      items={items}
      onRefresh={refresh}
      refreshing={refreshing}
      onLoadMore={loadMore}
      loading={loading}
    />
  );
}
