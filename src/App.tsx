import React, { lazy, Suspense } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import useDarkMode from "use-dark-mode";
import ErrorBoundary from "./ErrorBoundary";
import Footer from "./footer/Footer";
import { DEFAULT_NIGHT_MODE } from "./preferences/constants";
import Center from "./presentation/Center";
import Container from "./presentation/Container";
import Spinner from "./presentation/Spinner";
import Title from "./presentation/Title";

const HackerNewsFeed = lazy(() => import("./feeds/HackerNewsFeed"));
const GitHubFeed = lazy(() => import("./feeds/GitHubFeed"));
const StackOverflowFeed = lazy(() => import("./feeds/StackOverflowFeed"));
const MediumFeed = lazy(() => import("./feeds/MediumFeed"));
const RedditFeed = lazy(() => import("./feeds/RedditFeed"));
const GlobalNewsFeed = lazy(() => import("./feeds/GlobalNewsFeed"));
const Preferences = lazy(() => import("./preferences/Preferences"));
const NotFound = lazy(() => import("./NotFound"));

export default function App() {
  // TODO: Query dark mode directly in components that use it
  useDarkMode(DEFAULT_NIGHT_MODE);

  return (
    <BrowserRouter>
      <Container margin={{ bottom: "56px" }}>
        <Center>
          <Title colored size="1.5rem">
            Informatif
          </Title>
        </Center>
        <Suspense
          fallback={
            <Center>
              <Spinner />
            </Center>
          }
        >
          <ErrorBoundary>
            <Switch>
              <Redirect exact from="/" to="/hn" />
              <Route exact path="/hn" component={HackerNewsFeed} />
              <Route exact path="/gh" component={GitHubFeed} />
              <Route exact path="/so" component={StackOverflowFeed} />
              <Route exact path="/medium" component={MediumFeed} />
              <Route exact path="/reddit" component={RedditFeed} />
              <Route exact path="/global" component={GlobalNewsFeed} />
              <Route exact path="/prefs" component={Preferences} />
              <Route component={NotFound} />
            </Switch>
          </ErrorBoundary>
        </Suspense>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}
