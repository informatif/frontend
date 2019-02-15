import React, { Component } from "react";
import List from "./List";
import LoadingSpinner from "./LoadingSpinner";

export default class HackerNewsList extends Component {
  state = {
    items: [],
    currentPage: 1,
    loading: false
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
        // The HN paging API returns duplicates between pages,
        // so we have to de-duplicate the Arrays.
        let consolidatedItems = items;
        for (let item of newItems) {
          if (!items.find(el => el.id === item.id)) {
            consolidatedItems.push(item);
          }
        }
        return {
          currentPage: newCurrentPage,
          items: consolidatedItems
        };
      });
    } catch (_) {
      // The component was unmounted. Do nothing.
    }
  };

  formatApiItems = items => {
    return items.map(({ title, points, comments_count, id, user }) => ({
      link: `https://news.ycombinator.com/item?id=${id}`,
      title,
      points,
      responseCount: comments_count,
      id,
      author: user
    }));
  };

  load = async page => {
    this.abortController = new AbortController();
    const res = await fetch(`https://api.hnpwa.com/v0/news/${page}.json`, {
      signal: this.abortController.signal
    });
    return await res.json();
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
        title="Hacker News"
        handleRefresh={this.handleRefresh}
        handleLoadMore={this.handleLoadMore}
      />
    );
  }
}
