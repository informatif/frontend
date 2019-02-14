import React, { Component } from "react";

export default class StackOverflowList extends Component {
  async componentDidMount() {
    const data = await fetch(
      "https://api.stackexchange.com/2.2/questions?order=desc&sort=hot&site=stackoverflow"
    );
    const json = await data.json();
    console.log(json);
  }

  render() {
    return <div>Hey</div>;
  }
}
