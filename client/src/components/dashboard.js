import React, { Component } from "react";
import "../css/dashboard.css";
import { slide as Menu } from 'react-burger-menu';

import axios from "axios";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
    window.sessionStorage.removeItem("redirect");
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    axios.post("/dashboard", this.state).then(res => {
      res = res.data;
      console.log(res);
    });
  }

  showSettings (event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <Menu>
          <a id="home" className="menu-item" href="/">Home</a>
          <a id="about" className="menu-item" href="/about">About</a>
          <a id="contact" className="menu-item" href="/contact">Contact</a>
          <a onClick={ this.showSettings } className="menu-item--small" href="https://google.com">Settings</a>
        </Menu>
        <h1>h</h1>
      </div>
    );
  }
}

export default Dashboard;
