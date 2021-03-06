import React, { Component } from "react";
import Titleboard from "./titleboard";
import axios from "axios";
import "../css/postDetails.css";
import Grid from "@material-ui/core/Grid";
import Maps from "./maps";

class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jwtToken: sessionStorage.getItem("jwtToken"),
      id: this.props.match.params.id,
      info: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillMount() {
    window.sessionStorage.removeItem("redirect");
    axios.post("/getRequestInfo", { reqID: this.state.id }).then(info => {
      info = info.data.data;
      this.setState({ ...this.state, info });
      this.setState(this.state);
    });
  }

  showSettings(event) {
    event.preventDefault();
  }

  onSubmit(e) {
    e.preventDefault();
    axios
      .post("/markComplete", {
        jwtToken: this.state.jwtToken,
        id: this.state.id
      })
      .then(res => {
        this.props.history.push("/");
      });
  }

  render() {
    return (
      <div className="postdetails">
        <Titleboard />
        <Grid container className="detail-grid" justify="center">
          <h1 id="content-title" className="spacing">
            {this.state.info.title}
          </h1>
        </Grid>
        <Grid container className="detail-grid" justify="center">
          <img
            id="content-img"
            src={this.state.info.image}
            className="spacing"
            alt="idk"
          />
        </Grid>
        <Grid container className="detail-grid" justify="center">
          <p id="content-desc" className="spacing">
            {this.state.info.body}
          </p>
        </Grid>
        <Grid container className="detail-grid" justify="center">
          <Maps
            info={{
              title: this.state.info.title,
              lat: this.state.info.latitude,
              lng: this.state.info.longitude
            }}
            className="spacing"
          />
        </Grid>
        <form onSubmit={this.onSubmit}>
          <Grid container className="detail-grid" justify="center">
            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn" />
                <button type="submit" className="login100-form-btn">
                  Claim
                </button>
              </div>
            </div>
          </Grid>
        </form>
      </div>
    );
  }
}

export default PostDetails;
