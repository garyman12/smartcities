import React, { Component } from "react";
import "../css/profile.css";
import Titleboard from "./titleboard";

import axios from "axios";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameFirst: "Nathan",
      nameLast: "Rogers"
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
    axios.get("/profile", this.state).then(res => {
      res = res.data;
      console.log(res);
    });
  }

  showSettings(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <Titleboard />
        <div className="profile">
          <div className="profile-head">
            <h2 className="profile-name">
              {this.state.nameFirst + " " + this.state.nameLast}
            </h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
