import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const MapDiv = styled.div`
  width: 90vw;
  height: 75vh;
`;

class MapContainer extends Component {
  state = {
    defaultMapZoom: 16,
    center: {
      lat: 56.949649,
      lng: 24.108286
    },
    locations: [
      {
        name: "The Freedom Monument",
        location: { lat: 56.951493, lng: 24.113295 }
      },
      {
        name: "National History Museum of Latvia",
        location: { lat: 56.952095, lng: 24.115162 }
      },
      {
        name: "Museum of the Occupation of Latvia",
        location: { lat: 56.953131, lng: 24.111664 }
      },
      {
        name: "Latvian War Museum",
        location: { lat: 56.951194, lng: 24.108306 }
      },
      {
        name: "Laima Clock",
        location: { lat: 56.950416, lng: 24.11204 }
      }
    ],
    mapType: "roadmap"
  };

  componentDidMount() {
    this.loadMap();
  }

  componentDidUpdate() {
    this.loadMap();
  }

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

    this.state.locations.forEach(location => {
      const marker = new google.maps.Marker({
        position: { lat: location.location.lat, lng: location.location.lng },
        title: location.name,
        draggagle: true,
        animation: google.maps.Animation.DROP
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
