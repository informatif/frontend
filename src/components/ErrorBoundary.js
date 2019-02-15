import React, { Component } from "react";
import { FaRegSadTear } from "react-icons/fa";
import Center from "./Center";

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
        <Center vertical>
          <FaRegSadTear size="3rem" />
          <h2>Sorry, we couldn't load that for you.</h2>
        </Center>
      );
    }
    return this.props.children;
  }
}
