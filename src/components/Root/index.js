import React, { Component } from "react";
import Map from "../Map/index";

class Root extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Root</h1>
        <Map />
      </React.Fragment>
    );
  }
}

export default Root;
