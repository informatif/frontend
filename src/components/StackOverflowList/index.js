import React, { Component } from "react";
import "./index.css";

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
      items
    });
  }

  render() {
    return (
      <ul className="list">
        {this.state.items.map(
          ({ link, title, score, answer_count, question_id, owner }) => (
            <li className="list__item" key={question_id}>
              <span className="item__score">
                {score > 0 ? `+${score}` : score}
              </span>
              <div className="item__content">
                <a href={link} className="item__title">
                  {title}
                </a>
                <span className="item__author">{owner.display_name}</span>
              </div>
              <span className="item__answers">{answer_count} answers</span>
            </li>
          )
        )}
      </ul>
    );
  }
}
