import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { FaStackOverflow, FaHackerNews, FaNewspaper } from "react-icons/fa";
import NoMatch from "./components/NoMatch";
import Feed from "./components/Feed";
import Title from "./components/Title";
import HeaderLink from "./components/HeaderLink";
import { app, header, nav } from "./App.module.css";

const App = () => (
  <BrowserRouter>
    <div className={app}>
      <header className={header}>
        <Title colored>
          <h1>Informatif</h1>
        </Title>
        <nav>
          <ul className={nav}>
            Sites:
            <li>
              <HeaderLink to="/hn" title="Hacker News">
                <FaHackerNews />
              </HeaderLink>
            </li>
            <li>
              <HeaderLink to="/so" title="Stack Overflow">
                <FaStackOverflow />
              </HeaderLink>
            </li>
            <li>
              <HeaderLink to="/global" title="Global News">
                <FaNewspaper />
              </HeaderLink>
            </li>
          </ul>
        </nav>
      </header>
      <Switch>
        <Redirect exact from="/" to="/hn" />
        <Route exact path="/hn" component={Feed} />
        <Route exact path="/so" component={Feed} />
        <Route exact path="/global" component={Feed} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
