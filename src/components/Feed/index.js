import React from "react";
import { Route } from "react-router-dom";
import HackerNewsFeed from "./HackerNewsFeed";
import StackOverflowFeed from "./StackOverflowFeed";
import GlobalNewsFeed from "./GlobalNewsFeed";

export default function Feed() {
  return (
    <>
      <Route exact path="/hn" component={HackerNewsFeed} />
      <Route exact path="/so" component={StackOverflowFeed} />
      <Route exact path="/global" component={GlobalNewsFeed} />
    </>
  );
}
