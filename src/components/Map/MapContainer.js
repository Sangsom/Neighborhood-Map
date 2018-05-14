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
        name: "Beer Garden On Central Park",
        location: { lat: 56.951604, lng: 24.109677 }
      },
      {
        name: "BeerBike RIGA",
        location: { lat: 56.949716, lng: 24.109222 }
      },
      {
        name: "Beer House No.1",
        location: { lat: 56.949704, lng: 24.110419 }
      },
      {
        name: "S. Brevinga",
        location: { lat: 56.949039, lng: 24.10678 }
      },
      {
        name: "Victory Pub Riga",
        location: { lat: 56.948781, lng: 24.106677 }
      },
      {
        name: "Open-Air Leisure Park EGLE",
        location: { lat: 56.94835, lng: 24.106861 }
      },
      {
        name: "EASY BEER & BURGER",
        location: { lat: 56.948661, lng: 24.10882 }
      },
      {
        name: "Peter's Brewhouse",
        location: { lat: 56.948036, lng: 24.10895 }
      },
      {
        name: "Runcis",
        location: { lat: 56.947955, lng: 24.111009 }
      },
      {
        name: "HHC BAR",
        location: { lat: 56.946152, lng: 24.107585 }
      },
      {
        name: "Folkklubs ALA pagrabs",
        location: { lat: 56.946149, lng: 24.10773 }
      },
      {
        name: "Bon-Vivant the Belgian Beer Cafe",
        location: { lat: 56.946593, lng: 24.110379 }
      },
      {
        name: "The Armoury Bar",
        location: { lat: 56.946283, lng: 24.111246 }
      },
      {
        name: "Easy Wine",
        location: { lat: 56.947137, lng: 24.111122 }
      },
      {
        name: "Easy Beer",
        location: { lat: 56.947137, lng: 24.111714 }
      },
      {
        name: "TAPAS TAPAS Cafe bar",
        location: { lat: 56.946286, lng: 24.113985 }
      },
      {
        name: "Garlic Pub",
        location: { lat: 56.9504, lng: 24.105117 }
      },
      {
        name: "Aptieka",
        location: { lat: 56.950175, lng: 24.10389 }
      },
      {
        name: "DM Bar Riga",
        location: { lat: 56.950539, lng: 24.102785 }
      },
      {
        name: "I Love You",
        location: { lat: 56.951103, lng: 24.106218 }
      },
      {
        name: "Garāža",
        location: { lat: 56.951004, lng: 24.106547 }
      },
      {
        name: "Ezītis miglā",
        location: { lat: 56.951166, lng: 24.10658 }
      },
      {
        name: "B-Bārs",
        location: { lat: 56.949266, lng: 24.103698 }
      },
      {
        name: "Cuba Cafe",
        location: { lat: 56.948983, lng: 24.105966 }
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
