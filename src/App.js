import React, { lazy, Suspense } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import NoMatch from "./components/NoMatch";
import Title from "./components/Title";
import Center from "./components/Center";
import AppNav from "./components/AppNav";
import Margin from "./components/Margin";
import LoadingSpinner from "./components/LoadingSpinner";

const HackerNewsFeed = lazy(() => import("./components/HackerNewsFeed"));
const StackOverflowFeed = lazy(() => import("./components/StackOverflowFeed"));
const GlobalNewsFeed = lazy(() => import("./components/GlobalNewsFeed"));

const App = () => (
  <BrowserRouter>
    <>
      <Center>
        <Title colored>
          <h1>Informatif</h1>
        </Title>
      </Center>
      <Suspense fallback={<LoadingSpinner />}>
        <Switch>
          <Redirect exact from="/" to="/hn" />
          <Route exact path="/hn" component={HackerNewsFeed} />
          <Route exact path="/so" component={StackOverflowFeed} />
          <Route exact path="/global" component={GlobalNewsFeed} />
          <Route component={NoMatch} />
        </Switch>
      </Suspense>
      <Margin margin="48px" />
      <AppNav />
    </>
  </BrowserRouter>
);

export default App;
