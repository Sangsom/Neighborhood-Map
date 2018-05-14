import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { beerPlaces } from "../../lib/constants";

const MapDiv = styled.div`
  width: 90vw;
  height: 75vh;
`;

/**
 * TODO:: Change map colors and what map is showing
 */

class MapContainer extends Component {
  state = {
    defaultMapZoom: 16,
    center: {
      lat: 56.949649,
      lng: 24.108286
    },
    locations: beerPlaces,
    mapType: "roadmap"
  };

  componentDidMount() {
    this.loadMap();
  }

  componentDidUpdate() {
    this.loadMap();
  }

  /**
   * Loads a google map
   */
  loadMap = () => {
    if (this.props && this.props.google) {
      const { google } = this.props;
      const maps = google.maps;

      const { defaultMapZoom, center, mapType } = this.state;

      const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below
      const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: defaultMapZoom,
          mapTypeId: mapType
        }
      );

      // creates a new Google map on the specified configuration set above
      this.map = new maps.Map(node, mapConfig);

      this.addMarkers();
    }
  };

  /**
   * Adds markers to a map from State
   */
  addMarkers = () => {
    const { google } = this.props;

    const beer_icon = {
      url: "./img/beer_icon.png",
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    this.state.locations.forEach(location => {
      const marker = new google.maps.Marker({
        position: { lat: location.location.lat, lng: location.location.lng },
        title: location.name,
        draggagle: true,
        animation: google.maps.Animation.DROP,
        icon: beer_icon
      });

      marker.setMap(this.map);
    });
  };

  render() {
    return (
      <React.Fragment>
        <MapDiv ref="map">loading map...</MapDiv>
      </React.Fragment>
    );
  }
}

export default MapContainer;
