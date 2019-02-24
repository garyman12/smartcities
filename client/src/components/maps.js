import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

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
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '40vh', width: '100%'}}>
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={41.6538624}
            lng={-83.62065919999999}
            text={'Problem Location'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default Maps;