import React, { Component } from "react";
import { Route } from "react-router-dom";
import HackerNewsList from "./HackerNewsList";
import StackOverflowList from "./StackOverflowList";

const HN_API = "https://api.hnpwa.com/v0/news/1.json";
const SO_API =
  "https://api.stackexchange.com/2.2/questions?order=desc&sort=hot&site=stackoverflow";

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
