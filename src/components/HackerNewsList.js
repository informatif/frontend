import React, { Component } from "react";
import List from "./List";

export default class HackerNewsList extends Component {
  state = {
    items: []
  };

  handleRefresh = async () => {
    this.abortController = new AbortController();
    try {
      const res = await fetch("https://api.hnpwa.com/v0/news/1.json", {
        signal: this.abortController.signal
      });
      const items = await res.json();
      this.setState({
        items: items.map(({ title, points, comments_count, id, user }) => ({
          link: `https://news.ycombinator.com/item?id=${id}`,
          title,
          points,
          responseCount: comments_count,
          id,
          author: user
        }))
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
        title="Hacker News"
        handleRefresh={this.handleRefresh}
      />
    );
  }
}
