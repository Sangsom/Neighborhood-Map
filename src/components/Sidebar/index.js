import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.aside``;

class Sidebar extends Component {
  render() {
    const { markers, openInfoWindow } = this.props;

    return (
      <Wrapper>
        <h2>Sidebar</h2>
        <button onClick={this.props.showMarkers}>Show</button>
        <button onClick={this.props.hideMarkers}>Hide</button>
        <ul>
          {markers.map((marker, index) => (
            <li key={index} onClick={() => openInfoWindow(marker)}>
              {marker.title}
            </li>
          ))}
        </ul>
      </Wrapper>
    );
  }
}

export default Sidebar;
