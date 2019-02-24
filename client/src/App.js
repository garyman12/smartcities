import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard";
import Titleboard from "./components/titleboard";
import CreateRequest from "./components/createRequest";
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
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/" component={Dashboard} />
    <Route exact path="/titleboard" component={Titleboard} />
    <Route exact path="/createRequest" component={CreateRequest} />
  </Switch>
);

export default App;
