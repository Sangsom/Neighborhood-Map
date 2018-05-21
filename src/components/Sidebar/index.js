import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { Search } from "./Search";
import { List, ListItem } from "./List";

const Wrapper = styled.aside`
  height: 100vh;
  overflow-y: scroll;
  background: #e9fadd;
  padding: 10px;

  @media (max-width: 700px) {
    height: 400px;
  }
`;

class Sidebar extends Component {
  state = {
    locations: []
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.markers !== this.props.markers) {
      this.setState({ locations: nextProps.markers });
    }
  }

  /**
   * Performs a search on map markers
   */
  searchLocations = e => {
    const { value } = e.target;
    const { markers, closeInfoWindow } = this.props;

    // Close info window before starting to search
    closeInfoWindow();

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

    // Update locations state with filtered locations
    this.setState({ locations: filteredLocations });
  };

  render() {
    const { openInfoWindow } = this.props;
    const { locations } = this.state;

    return (
      <Wrapper>
        <h2>Old Town Beer Map</h2>
        <Button onClick={this.props.showMarkers}>Show</Button>
        <Button onClick={this.props.hideMarkers}>Hide</Button>
        <Search
          type="text"
          placeholder="Search"
          onChange={this.searchLocations}
        />
        <List>
          {locations.map((marker, index) => (
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
