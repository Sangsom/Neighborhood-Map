import React, { Component } from "react";
import styled from "styled-components";
import { beerPlaces } from "../../lib/constants";
import Map from "../Map/index";
import Sidebar from "../Sidebar";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
`;

const OpenBtn = styled.button``;

class Root extends Component {
  state = {
    locations: beerPlaces
  };

  render() {
    return (
      <React.Fragment>
        <Wrapper>
          <Sidebar locations={this.state.locations} />
          <Map locations={this.state.locations} />
        </Wrapper>
      </React.Fragment>
    );
  }
}

export default Root;
