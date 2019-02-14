import React, { Component } from "react";
import List from "./List";

export default class HackerNewsList extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  async componentDidMount() {
    const res = await fetch("https://api.hnpwa.com/v0/news/1.json");
    const items = await res.json();
    this.setState({
      items: items.map(({ url, title, points, comments_count, id, user }) => ({
        link: url,
        title,
        points,
        responseCount: comments_count,
        id,
        author: user,
        responseLink: `https://news.ycombinator.com/item?id=${id}`
      }))
    });
  }

  render() {
    return <List items={this.state.items} />;
  }
}
