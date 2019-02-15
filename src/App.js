import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import NoMatch from "./components/NoMatch";
import Feed from "./components/Feed";
import Title from "./components/Title";
import Center from "./components/Center";
import AppNav from "./components/AppNav";
import Margin from "./components/Margin";

const App = () => (
  <BrowserRouter>
    <>
      <Center>
        <Title colored>
          <h1>Informatif</h1>
        </Title>
      </Center>
      <Switch>
        <Redirect exact from="/" to="/hn" />
        <Route exact path="/hn" component={Feed} />
        <Route exact path="/so" component={Feed} />
        <Route exact path="/global" component={Feed} />
        <Route component={NoMatch} />
      </Switch>
      <Margin margin="48px" />
      <AppNav />
    </>
  </BrowserRouter>
);

export default App;
