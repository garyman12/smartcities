import React, { Component } from "react";
import "../css/dashboard.css";
import "../css/card.css";
import Titleboard from "./titleboard";
import PostCard from "./card";
import Grid from "@material-ui/core/Grid";

import axios from "axios";

class Dashboard extends Component {
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
    axios.post("/dashboard", this.state).then(res => {
      res = res.data;
      console.log(res);
    });
  }

  showSettings(event) {
    event.preventDefault();
  }

  render() {

    axios.post("/getInfobyJWT", this.state).then(res => {
      res = res.data;
      console.log(res);
      if(res.success == false){
        this.props.history.push('/login');
      }
    });
    return (
      <div className="dashboard">
        <Titleboard />
        <div id="content">
          <Grid container justify="center">
            <PostCard id="card1" />
          </Grid>
        </div>
      </div>
    );
  }
}

export default Dashboard;
