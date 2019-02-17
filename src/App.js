import React, { lazy, Suspense } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Title from "./components/Title";
import Center from "./components/Center";
import Footer from "./components/Footer";
import Margin from "./components/Margin";
import Spinner from "./components/Spinner";

const HackerNewsFeed = lazy(() => import("./components/HackerNewsFeed"));
const GitHubFeed = lazy(() => import("./components/GitHubFeed"));
const StackOverflowFeed = lazy(() => import("./components/StackOverflowFeed"));
const RedditFeed = lazy(() => import("./components/RedditFeed"));
const GlobalNewsFeed = lazy(() => import("./components/GlobalNewsFeed"));
const NoMatch = lazy(() => import("./components/NoMatch"));

const App = () => (
  <BrowserRouter>
    <Center>
      <Title colored>
        <h1>Informatif</h1>
      </Title>
    </Center>
    <Suspense
      fallback={
        <Center>
          <Spinner />
        </Center>
      }
    >
      <Switch>
        <Redirect exact from="/" to="/hn" />
        <Route exact path="/hn" component={HackerNewsFeed} />
        <Route exact path="/gh" component={GitHubFeed} />
        <Route exact path="/so" component={StackOverflowFeed} />
        <Route exact path="/reddit" component={RedditFeed} />
        <Route exact path="/global" component={GlobalNewsFeed} />
        <Route component={NoMatch} />
      </Switch>
    </Suspense>
    <Margin margin="48px" />
    <Footer />
  </BrowserRouter>
);

export default App;
