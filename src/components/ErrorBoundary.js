import React, { Component } from "react";
import "./ErrorBoundary.css";
import { FaRegSadTear } from "react-icons/fa";

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
        <div className="center center--vertical">
          <FaRegSadTear size="3rem" />
          <h2>Sorry, we couldn't fetch that for you.</h2>
        </div>
      );
    }
    return this.props.children;
  }
}
