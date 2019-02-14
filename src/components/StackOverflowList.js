import React, { Component } from "react";
import List from "./List";

export default class StackOverflowList extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  async componentDidMount() {
    const res = await fetch(
      "https://api.stackexchange.com/2.2/questions?order=desc&sort=hot&site=stackoverflow"
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
  }

  render() {
    return <List items={this.state.items} />;
  }
}
