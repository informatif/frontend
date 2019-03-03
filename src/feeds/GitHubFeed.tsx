import React from "react";
import { FEED_ID_TO_TITLE } from "../preferences/constants";
import Feed from "./Feed";
import { useApi } from "./hooks";

export default function GitHubFeed() {
  const { status, items } = useApi("gh");

  return <Feed title={FEED_ID_TO_TITLE.gh} status={status} items={items} />;
}
