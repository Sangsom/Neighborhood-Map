import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.aside``;

class Sidebar extends Component {
  clickItem = () => {
    console.log("Item clicked");
  };

  render() {
    const { locations } = this.props;

    return (
      <Wrapper>
        <h2>Sidebar</h2>
        {/* {locations.map((location, index) => <h4>{location}</h4>)} */}
        {locations.map((location, index) => (
          <h4 onClick={this.clickItem}>{location.name}</h4>
        ))}
      </Wrapper>
    );
  }
}

export default Sidebar;
