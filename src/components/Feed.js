import React, { Component } from "react";
import { Route } from "react-router-dom";
import HackerNewsList from "./HackerNewsList";
import StackOverflowList from "./StackOverflowList";

export default class Feed extends Component {
  state = {
    hackerNews: [],
    stackOverflow: []
  };

  render() {
    return (
      <>
        <Route exact path="/hn" component={HackerNewsList} />
        <Route exact path="/so" component={StackOverflowList} />
      </>
    );
  }
}
