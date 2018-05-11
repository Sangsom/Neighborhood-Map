import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const MapDiv = styled.div`
  width: 90vw;
  height: 75vh;
`;

class MapContainer extends Component {
  state = {
    locations: [
      {
        name: "New York County Supreme Court",
        location: { lat: 40.7143033, lng: -74.0036919 }
      },
      {
        name: "Queens County Supreme Court",
        location: { lat: 40.7046946, lng: -73.8091145 }
      },
      {
        name: "Kings County Supreme Court",
        location: { lat: 40.6940226, lng: -73.9890967 }
      },
      {
        name: "Richmond County Supreme Court",
        location: { lat: 40.6412336, lng: -74.0768597 }
      },
      {
        name: "Bronx Supreme Court",
        location: { lat: 40.8262388, lng: -73.9235238 }
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

      const { mapType } = this.state;

      const mapRef = this.refs.map; // looks for HTML div ref 'map'. Returned in render below
      const node = ReactDOM.findDOMNode(mapRef); // finds the 'map' div in the React DOM, names it node

      const mapConfig = Object.assign(
        {},
        {
          center: { lat: 40.7485722, lng: -74.0068633 },
          zoom: 11,
          mapTypeId: mapType
        }
      );

      // creates a new Google map on the specified configuration set above
      this.map = new maps.Map(node, mapConfig);

      // ADD MARKERS TO MAP
      this.state.locations.forEach(location => {
        const marker = new google.maps.Marker({
          position: { lat: location.location.lat, lng: location.location.lng },
          title: location.name,
          draggagle: true,
          animation: google.maps.Animation.DROP
        });

        // Add markers to map
        marker.setMap(this.map);
      });
    }
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
