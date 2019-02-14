import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { FaStackOverflow, FaHackerNews } from "react-icons/fa";
import HackerNewsList from "./components/HackerNewsList";
import StackOverflowList from "./components/StackOverflowList";
import "./App.css";

const App = () => (
  <BrowserRouter>
    <div className="app">
      <header className="header">
        <h1 className="header__title title">Informatif</h1>
        <nav>
          <ul className="nav">
            Sites:
            <li>
              <Link to="/" className="nav__link" title="Hacker News">
                <FaHackerNews />
              </Link>
            </li>
            <li>
              <Link to="/so" className="nav__link" title="Stack Overflow">
                <FaStackOverflow />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Route path="/so" component={StackOverflowList} />
      <Route path="/" component={HackerNewsList} />
    </div>
  </BrowserRouter>
);

export default App;
