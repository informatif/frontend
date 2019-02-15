import React from "react";
import { BrowserRouter, NavLink } from "react-router-dom";
import { FaStackOverflow, FaHackerNews } from "react-icons/fa";
import Feed from "./components/Feed";
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
              <NavLink
                exact
                to="/"
                className="nav__link"
                activeClassName="nav__link--selected"
                title="Hacker News"
              >
                <FaHackerNews />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/so"
                className="nav__link"
                activeClassName="nav__link--selected"
                title="Stack Overflow"
              >
                <FaStackOverflow />
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Feed />
    </div>
  </BrowserRouter>
);

export default App;
