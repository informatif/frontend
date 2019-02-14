import React from "react";
import StackOverflowList from "./components/StackOverflowList";
import "./App.css";

const App = () => (
  <div className="app">
    <header className="header">
      <h1 className="header__title title">Informatif</h1>
      <nav>
        <ul className="nav">
          <li>
            <a href="/" className="nav__link">
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
