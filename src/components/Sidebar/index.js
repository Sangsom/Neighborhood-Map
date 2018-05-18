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
  state = {
    locations: []
  };

  searchLocations = e => {
    const { value } = e.target;
    const { markers } = this.props;

    this.props.closeInfoWindow();

    const filteredLocations = markers.filter(location => {
      // Regular expression to match the value if it contains in str
      // gi = global and case insensitive
      const strToMatch = new RegExp(value, "gi");
      if (location.title.match(strToMatch)) {
        location.setVisible(true);
      } else {
        location.setVisible(false);
      }

      return location.title.match(strToMatch);
    });
  };

  render() {
    const { markers, openInfoWindow } = this.props;

    return (
      <Wrapper>
        <h2>Sidebar</h2>
        <button onClick={this.props.showMarkers}>Show</button>
        <button onClick={this.props.hideMarkers}>Hide</button>
        <input
          type="text"
          placeholder="Search"
          onChange={this.searchLocations}
        />
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
