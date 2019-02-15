import React from "react";
import { Route } from "react-router-dom";
import HackerNewsList from "./HackerNewsList";
import StackOverflowList from "./StackOverflowList";

export default function Feed() {
  return (
    <>
      <Route exact path="/hn" component={HackerNewsList} />
      <Route exact path="/so" component={StackOverflowList} />
    </>
  );
}
