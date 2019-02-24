import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

import axios from "axios";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Maps extends Component {
  static defaultProps = {
    center: {
      lat: 41.6538624,
      lng: -83.62065919999999
    },
    zoom: 11
  };

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    axios.post("/maps", this.state).then(res => {
      res = res.data;
      console.log(res);
    });
  }

  render() {
    console.log(this.props);
    if (this.props.info.title !== undefined) {
      return (
        // Important! Always set the container height explicitly
        <div style={{ height: "40vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyATxm8bDLqjEVPHa4X0gaRYUGjXlrKu0bI"
            }}
            defaultCenter={{
              lat: this.props.info.lat,
              lng: this.props.info.lng
            }}
            defaultZoom={this.props.zoom}
          >
            <AnyReactComponent
              lat={41.6538624}
              lng={-83.62065919999999}
              text={this.props.info.title}
            />
          </GoogleMapReact>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Maps;
