import React, { Component } from "react";
import "../css/titleboard.css";
import { slide as Menu } from "react-burger-menu";

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
    axios.post("/titleboard", this.state).then(res => {
      res = res.data;
    });
  }

  showSettings(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="titleboard">
        <div className="titlebar">
          <Menu>
            <a id="home" className="menu-item" href="/">
              Home
            </a>
            <a id="about" className="menu-item" href="/createRequest">
              Submit
            </a>
            <a id="contact" className="menu-item" href="/profile">
              Profile
            </a>
            <a id="logout" className="menu-item" href="/login">
              Logout
            </a>
          </Menu>
          <a className="submit-btn" href="/createRequest">
            +
          </a>
          <h1>Munici-Pal</h1>
        </div>
        <div className="invis" />
      </div>
    );
  }
}

export default Titleboard;
