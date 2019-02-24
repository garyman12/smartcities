import React, { Component } from "react";
import Titleboard from "./titleboard";
import axios from "axios";
import "../css/profile.css";
import "../css/dashboard.css";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import "../css/postDetails.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PostCard from "./card";

const styles = theme => ({
  card: {
    display: "flex",
    marginTop: "2vh"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  playIcon: {
    height: 38,
    width: 38
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 128
  }
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jwtToken: sessionStorage.getItem("jwtToken"),
      completed: [],
      requested: [],
      user: {}
    };
  }

  componentWillMount() {
    window.sessionStorage.removeItem("redirect");
    axios.post("/getInfobyJWT", { jwtToken: this.state.jwtToken }).then(res => {
      res = res.data;

      this.setState({
        ...this.state,
        user: {
          nameFirst: res.data.nameFirst,
          nameLast: res.data.nameLast,
          reward: res.data.reward
        }
      });
      this.setState({ ...this.state, completed: res.completedTasks });
      this.setState({ ...this.state, requested: res.requestedTasks });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <Titleboard />
        <div className="profile-content">
          <Grid container justify="center">
            <Card id="profile-title" className={classes.card}>
              <AccountCircle className={classes.icon} />
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography component="h5" variant="h5">
                    {this.state.user.nameFirst + " " + this.state.user.nameLast}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Balance: {this.state.user.reward}
                  </Typography>
                </CardContent>
              </div>
            </Card>
          </Grid>
          <div id="completed">
            <Typography variant="h2" gutterBottom>
              Completed:
            </Typography>
            <Grid container justify="center">
              {this.state.completed.map(complete => (
                <>
                  <PostCard key={complete.ID} info={complete} id="card1" />
                </>
              ))}
            </Grid>
          </div>
          <div id="posted">
            <Typography variant="h2" gutterBottom>
              Posted:
            </Typography>
            <Grid container justify="center">
              {this.state.requested.map(request => (
                <>
                  <PostCard key={request.ID} info={request} id="card1" />
                </>
              ))}
            </Grid>
          </div>
        </div>
      </>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Profile);
