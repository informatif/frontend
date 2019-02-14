import React from "react";
import { FaStackOverflow, FaHackerNews } from "react-icons/fa";
import HackerNewsList from "./components/HackerNewsList";
import StackOverflowList from "./components/StackOverflowList";
import "./App.css";

const App = () => (
  <div className="app">
    <header className="header">
      <h1 className="header__title title">Informatif</h1>
      <nav>
        <ul className="nav">
          Sites:
          <li>
            <a href="/" className="nav__link">
              <FaStackOverflow />
            </a>
          </li>
          <li>
            <a href="/" className="nav__link">
              <FaHackerNews />
            </a>
          </li>
        </ul>
      </nav>
    </header>
    <StackOverflowList />
  </div>
);

export default App;
