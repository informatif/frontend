import React from "react";
import {
  BrowserRouter,
  NavLink,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import { FaStackOverflow, FaHackerNews } from "react-icons/fa";
import NoMatch from "./components/NoMatch";
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
                to="/hn"
                className="nav__link"
                activeClassName="nav__link--selected"
                title="Hacker News"
              >
                <FaHackerNews />
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
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
      <Switch>
        <Redirect exact from="/" to="/hn" />
        <Route exact path="/hn" component={Feed} />
        <Route exact path="/so" component={Feed} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
