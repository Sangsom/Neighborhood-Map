import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.aside`
  height: 100vh;
  overflow-y: scroll;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;
const ListItem = styled.li`
  padding: 20px 15px;
  background: #ccc;
  border-bottom: 1px solid black;

  &:hover {
    background: #ddd;
    cursor: pointer;
  }
`;

class Sidebar extends Component {
  render() {
    const { markers, openInfoWindow } = this.props;

    return (
      <Wrapper>
        <h2>Sidebar</h2>
        <button onClick={this.props.showMarkers}>Show</button>
        <button onClick={this.props.hideMarkers}>Hide</button>
        <input type="text" placeholder="Search" />
        <List>
          {markers.map((marker, index) => (
            <ListItem key={index} onClick={() => openInfoWindow(marker)}>
              {marker.title}
            </ListItem>
          ))}
        </List>
      </Wrapper>
    );
  }
}

export default Sidebar;
