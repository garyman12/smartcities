import React, { Component } from "react";
import "../css/postDetails.css";
import Titleboard from "./titleboard";
import Grid from "@material-ui/core/Grid";
import Maps from "./maps";

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
      <div className="postdetails">
        <Titleboard />
        <div id="content">
          <Grid container justify="center">
            <h1 id="content-title" className="spacing">yeet</h1>
          </Grid>
          <Grid container justify="center">
            <img id="content-img" className="spacing" alt="idk"/>
          </Grid>
          <Grid container justify="center">
            <p id="content-desc" className="spacing">sample</p>
          </Grid>
          <Grid container justify="center">
            <Maps className="spacing"/>
          </Grid>

        </div>
      </div>
    );
  }
}

export default PostDetails;
