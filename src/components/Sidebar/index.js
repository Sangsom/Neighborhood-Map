import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.aside`
  height: 100vh;
  overflow-y: scroll;
  background: #e9fadd;
  padding: 10px;
`;

const Button = styled.button`
  width: 100%;
  font-size: 16px;
  padding: 10px 15px;
  background: transparent;
  border: 1px solid #3f5468;
  margin-bottom: 10px;
  border-radius: 8px;
  transition: all 0.5s;

  &:hover {
    cursor: pointer;
    background: #b8e4c9;
    color: #3f5468;
  }
`;

const Search = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 10px 15px;
  background: transparent;
  border: none;
  margin-bottom: 15px;
  border-bottom: 3px solid #3f5468;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  padding: 20px 15px;
  background: #b8e4c9;
  border-bottom: 2px solid #3f5468;
  border-radius: 3px;
  transition: all 0.5s;

  &:hover {
    background: #e9fadd;
    cursor: pointer;
    color: #3f5468;
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
        <h2>Sidebar</h2>
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
