import React, { Component } from "react";
import List from "./List";
import LoadingSpinner from "./LoadingSpinner";

export default class StackOverflowList extends Component {
  state = {
    items: [],
    loading: false,
    currentPage: 1
  };

  handleRefresh = async () => {
    this.setState({
      loading: true
    });

    const newCurrentPage = 1;
    try {
      const newItems = await this.load(newCurrentPage);
      this.setState({
        loading: false,
        currentPage: newCurrentPage,
        items: this.formatApiItems(newItems)
      });
    } catch (_) {
      // The component was unmounted. Do nothing.
    }
  };

  handleLoadMore = async () => {
    const newCurrentPage = this.state.currentPage + 1;
    try {
      const newItems = this.formatApiItems(await this.load(newCurrentPage));
      this.setState(({ items }) => {
        return {
          currentPage: newCurrentPage,
          items: [...items, ...newItems]
        };
      });
    } catch (_) {
      // The component was unmounted. Do nothing.
    }
  };

  formatApiItems = items => {
    return items.map(
      ({ link, title, score, answer_count, question_id, owner }) => ({
        link,
        title,
        points: score,
        responseCount: answer_count,
        id: question_id,
        author: owner.display_name
      })
    );
  };

  load = async page => {
    this.abortController = new AbortController();
    const res = await fetch(
      `https://api.stackexchange.com/2.2/questions?page=${page}&order=desc&sort=hot&site=stackoverflow`,
      {
        signal: this.abortController.signal
      }
    );
    return (await res.json()).items;
  };

  componentDidMount() {
    this.handleRefresh();
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  render() {
    if (this.state.loading) {
      return <LoadingSpinner />;
    }

    return (
      <List
        items={this.state.items}
        title="Stack Overflow"
        handleRefresh={this.handleRefresh}
        handleLoadMore={this.handleLoadMore}
      />
    );
  }
}
