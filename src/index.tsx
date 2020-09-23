import React from "react";
import ReactDOM, { unstable_createRoot } from "react-dom";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

if (process.env.NODE_ENV === "development") {
  const a11y = require("react-a11y").default;
  a11y(React, ReactDOM, {
    rules: {
      "aria-role": "warn",
      "aria-unsupported-elements": "warn",
      "click-events-have-key-events": "warn",
      "hidden-uses-tabindex": "warn",
      "img-redundant-alt": "warn",
      "img-uses-alt": "warn",
      "interactive-supports-focus": "warn",
      "label-has-for": "warn",
      "mouse-events-have-key-events": "warn",
      "no-access-key": "warn",
      "no-hash-ref": "warn",
      "no-onchange": "warn",
      "onclick-uses-role": "warn",
      "tabindex-no-positive": "warn",
      "tabindex-uses-button": "warn",
    },
  });
}

unstable_createRoot(document.getElementById("root")).render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
