import React, { Component } from "react";
import List from "./List";
import LoadingSpinner from "./LoadingSpinner";

export default class GlobalNewsList extends Component {
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
        // The NewsAPI paging API returns duplicates between pages,
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
    return items.map(({ title, comments_count, source, url }) => ({
      link: url,
      title,
      responseCount: comments_count,
      id: `${source.name} - ${title}`,
      author: source.name
    }));
  };

  load = async page => {
    this.abortController = new AbortController();
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?language=en&page=${page}`,
      {
        signal: this.abortController.signal,
        headers: {
          Authorization: "Bearer e1e3caafb22c41cea70dfe4fb67f2d9e"
        }
      }
    );
    return (await res.json()).articles;
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
        title="Worldwide News"
        handleRefresh={this.handleRefresh}
        handleLoadMore={this.handleLoadMore}
      />
    );
  }
}
