import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Titleboard from "./titleboard";
import axios from "axios";
import { geolocated } from "react-geolocated";
import "../css/dashboard.css";

import firebase from "../firebase";
import FileUploader from "react-firebase-file-uploader";

const styles = theme => ({
  root: {
    width: "90%"
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  }
});

class CreateRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      imgURL: "",
      category: "",
      activeStep: 0,
      jwtToken: sessionStorage.getItem("jwtToken"),
      isUploading: false,
      progress: 0,
      userID: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getSteps = this.getSteps.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
  }

  handleNext = () => {
    this.setState({ ...this.state, activeStep: this.state.activeStep + 1 });
  };

  handleBack = () => {
    this.setState({ ...this.state, activeStep: this.state.activeStep - 1 });
  };

  handleReset = () => {
    this.setState({ ...this.state, activeStep: 0 });
  };
  onSubmit(e) {
    e.preventDefault();
    var send = {
      title: this.state.title,
      description: this.state.description,
      imgURL: this.state.imgURL,
      userID: this.state.userID,
      latitude: this.props.coords.latitude,
      longitude: this.props.coords.longitude,
      category: this.state.category
    };
    console.log(send);
    axios.post("/createRequest", send).then(res => {
      res = res.data;
      console.log(res);
      this.props.history.push('/');
    });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  getSteps() {
    return ["Set Title", "Enter a description", "Upload a photo", "Catergorize this Problem"];
  }

  handleUploadStart = () =>
    this.setState({ ...this.state, isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ ...this.state, progress });
  handleUploadError = error => {
    this.setState({ ...this.state, isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({
      ...this.state,
      avatar: filename,
      progress: 100,
      isUploading: false
    });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ ...this.state, imgURL: url }));
  };

  getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <TextField
            label="Title"
            name="title"
            value={this.state.title}
            onChange={this.onChange}
          />
        );
      case 1:
        return (
          <TextField
            label="Description"
            name="description"
            value={this.state.description}
            onChange={this.onChange}
            multiline={true}
            rows={1}
            rowsMax={Infinity}
          />
        );
      case 2:
        return (
          <div>
            {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
            {this.state.imgURL && <img src={this.state.imgURL} />}
            <FileUploader
              accept="images/*"
              name="avatar"
              randomizeFilename
              storageRef={firebase.storage().ref("images")}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
            />
          </div>
        );
        case 3:
        return (
          <TextField
            label="Category"
            name="category"
            value={this.state.category}
            onChange={this.onChange}
            multiline={true}
            rows={1}
            rowsMax={Infinity}
          />
        );
      default:
        return "Unknown step";
    }
  }

  componentWillMount() {
    axios.post("/getInfobyJWT", this.state).then(res => {
      res = res.data;
      this.setState({ ...this.state, userID: res.ID });
      if (res.success == false) {
        this.props.history.push("/login");
      }
    });
  }

  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    return (
      <div className="App">
        <Titleboard />
        <Paper className="createRequest-content">
          <div className={classes.root}>
            <form onSubmit={this.onSubmit}>
              <Stepper
                activeStep={this.state.activeStep}
                orientation="vertical"
              >
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                      <div>{this.getStepContent(index)}</div>
                      <div className={classes.actionsContainer}>
                        <div>
                          <Button
                            disabled={this.state.activeStep === 0}
                            onClick={this.handleBack}
                            className={classes.button}
                          >
                            Back
                          </Button>
                          <Button
                            variant="contained"
                            disabled={
                              this.state[Object.keys(this.state)[index]] === ""
                            }
                            color="primary"
                            onClick={this.handleNext}
                            className={classes.button}
                          >
                            {this.state.activeStep === steps.length - 1
                              ? "Finish"
                              : "Next"}
                          </Button>
                        </div>
                      </div>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
              {this.state.activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                  <Typography>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Button type="submit" className={classes.button}>
                    Submit
                  </Button>
                </Paper>
              )}
            </form>
          </div>
        </Paper>
      </div>
    );
  }
}

CreateRequest.propTypes = {
  classes: PropTypes.object
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true
  },
  userDecisionTimeout: 5000
})(withStyles(styles)(CreateRequest));
