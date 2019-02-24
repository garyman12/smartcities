import React, { Component } from "react";
import "../css/titleboard.css";
import { slide as Menu } from 'react-burger-menu';

import axios from "axios";

class Titleboard extends Component {
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
    axios.post("/titleboard", this.state).then(res => {
      res = res.data;
      console.log(res);
    });
  }

  showSettings (event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="titleboard">
        <div className="titlebar">
          <Menu>
            <a id="home" className="menu-item" href="/">Home</a>
            <a id="about" className="menu-item" href="/createRequest">Report_Problem</a>
            <a id="contact" className="menu-item" onClick={ this.showSettings } href="/settings">Settings</a>
            <a id="logout"className="menu-item" href="/login">Logout</a>
          </Menu>
          <h1>Dashboard</h1>
        </div>
        <div className="invis"></div>
      </div>
    );
  }
}

export default Titleboard;
