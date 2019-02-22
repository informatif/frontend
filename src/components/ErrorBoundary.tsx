import React, { Component } from "react";
import { FaRegSadTear } from "react-icons/fa";
import Column from "./Column";

export default class ErrorBoundary extends Component {
  state = {
    hasError: false
  };

  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Column crossAxisAlignment="center">
          <FaRegSadTear size="3rem" />
          <h2>Sorry, we couldn't load that for you.</h2>
        </Column>
      );
    }
    return this.props.children;
  }
}
