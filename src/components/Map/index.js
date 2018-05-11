import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import MapContainer from "./MapContainer";

class App extends Component {
  render() {
    return (
      <div>
        <h1>Google Maps API + React</h1>
        <MapContainer google={this.props.google} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAwAk4Oous1MDqJF-_k2O2EwrfQk3zzZbc"
})(App);
