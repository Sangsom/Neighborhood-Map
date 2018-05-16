import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import MapContainer from "./MapContainer";

class Map extends Component {
  render() {
    return (
      <MapContainer
        google={this.props.google}
        locations={this.props.locations}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAwAk4Oous1MDqJF-_k2O2EwrfQk3zzZbc"
})(Map);
