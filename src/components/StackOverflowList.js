import React, { Component } from "react";
import List from "./List";

export default class StackOverflowList extends Component {
  state = {
    items: []
  };

  handleRefresh = async () => {
    this.abortController = new AbortController();
    try {
      const res = await fetch(
        "https://api.stackexchange.com/2.2/questions?order=desc&sort=hot&site=stackoverflow",
        { signal: this.abortController.signal }
      );
      const { items } = await res.json();
      this.setState({
        items: items.map(
          ({ link, title, score, answer_count, question_id, owner }) => ({
            link,
            title,
            points: score,
            responseCount: answer_count,
            id: question_id,
            author: owner.display_name
          })
        )
      });
    } catch (_) {
      // Do nothing
    }
  };

  componentDidMount() {
    this.handleRefresh();
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  render() {
    return (
      <List
        items={this.state.items}
        title="Stack Overflow"
        handleRefresh={this.handleRefresh}
      />
    );
  }
}
