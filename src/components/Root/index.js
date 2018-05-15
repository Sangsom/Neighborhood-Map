import React, { Component } from "react";
import styled from "styled-components";
import Map from "../Map/index";
import Sidebar from "../Sidebar";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
`;

const OpenBtn = styled.button``;

class Root extends Component {
  render() {
    return (
      <React.Fragment>
        <Wrapper>
          <Sidebar />
          <Map />
        </Wrapper>
      </React.Fragment>
    );
  }
}

export default Root;
