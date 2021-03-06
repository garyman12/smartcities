import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "../css/card.css";

const styles = theme => ({
  card: {
    maxWidth: 400,
    margin: "4%"
  },
  media: {
    height: 0,
    width: 400,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  }
});

class PostCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      raised: ""
    };
  }

  handleExpandClick = () => {
    this.setState({ ...this.state, expanded: !this.state.expanded });
  };
  toggleRaised = () => this.setState({ raised: !this.state.raised });

  render() {
    const { classes } = this.props;

    return (
      <div className="card">
        <Card
          onMouseOver={this.toggleRaised}
          onMouseOut={this.toggleRaised}
          raised={this.state.raised}
          className={classes.card}
        >
          <CardHeader
            title={this.props.info.data.title}
            subheader={"Category: " + this.props.info.data.category}
          />
          <CardMedia
            className={classes.media}
            image={this.props.info.data.image}
            title="image"
          />
          <CardContent>
            <Typography component="p">{this.props.info.data.body}</Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              href={"/postDetails/" + this.props.info.ID}
              color="primary"
            >
              More Info
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

PostCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostCard);
