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
import "../css/dashboard.css";

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
      activeStep: 0
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
    console.log("Submitted");
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  getSteps() {
    return ["Set Title", "Enter a description", "Upload a photo"];
  }

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
            rows={4}
            rowsMax={Infinity}
          />
        );
      case 2:
        return `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`;
      default:
        return "Unknown step";
    }
  }

  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    axios.post("/getInfobyJWT", this.state).then(res => {
      res = res.data;
      console.log(res);
      if(res.success == false){
        this.props.history.push('/login');
      }
    });
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
                      <Typography>{this.getStepContent(index)}</Typography>
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

export default withStyles(styles)(CreateRequest);