import React from "react";
import "./App.css";
import StackOverflowList from "./components/StackOverflowList";

const App = () => (
  <div className="app">
    <header className="header">
      <h1 className="title">Informatif</h1>
      <nav>
        <ul className="nav">
          <li>
            <a href="#" className="nav__link">
              Stack Overflow
            </a>
          </li>
        </ul>
      </nav>
    </header>
    <StackOverflowList />
  </div>
);

export default App;
