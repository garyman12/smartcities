import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
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
    <Route exact path="/signup" component={Signup} />
  </Switch>
);

export default App;
