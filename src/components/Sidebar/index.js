import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.aside``;

class Sidebar extends Component {
  render() {
    console.log("Props", this.props);
    const { locations } = this.props;

    return (
      <Wrapper>
        <h2>Sidebar</h2>
        <ul>
          {locations.map((location, index) => (
            <li key={index}>{location.name}</li>
          ))}
        </ul>
      </Wrapper>
    );
  }
}

export default Sidebar;
