import React from "react";
import { FEED_ID_TO_TITLE } from "../preferences/constants";
import Feed from "./Feed";
import { useApi } from "./hooks";

export default function RedditFeed() {
  const { status, items } = useApi("reddit");

  return <Feed title={FEED_ID_TO_TITLE.reddit} status={status} items={items} />;
}
