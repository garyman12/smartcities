import React, { Component } from "react";
import "../css/postDetails.css";
import Titleboard from "./titleboard";
import Grid from "@material-ui/core/Grid";

import axios from "axios";

class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jwtToken: sessionStorage.getItem('jwtToken')
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
    axios.post("/postDetails", this.state).then(res => {
      res = res.data;
      console.log(res);
    });
  }

  showSettings(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="dashboard">
        <Titleboard />
        <div id="content">
          <Grid container justify="center">
            <h1 id="content-title">yeet</h1>
            <img id="content-img"></img>
            <p id="content-desc"></p>
          </Grid>
        </div>
      </div>
    );
  }
}

export default PostDetails;
