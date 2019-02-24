import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/login";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Content />
      </BrowserRouter>
    );
  }
}

const Content = () => (
  <Switch>
    <Route exact path="/" component={Login} />
  </Switch>
);

export default App;
