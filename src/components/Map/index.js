import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import MapContainer from "./MapContainer";
import styled from "styled-components";

const AppWrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
`;
const LeftSide = styled.div`
  background: red;
  height: 100vh;
`;

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <LeftSide />
        <MapContainer google={this.props.google} />
      </AppWrapper>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAwAk4Oous1MDqJF-_k2O2EwrfQk3zzZbc"
})(App);
