import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { beerPlaces } from "../../lib/constants";
import axios from "axios";

const MapDiv = styled.div`
  width: 100%;
  height: 90vh;
`;

class MapContainer extends Component {
  state = {
    defaultMapZoom: 16,
    center: {
      lat: 56.949649,
      lng: 24.108286
    },
    locations: beerPlaces,
    mapType: "roadmap",
    iconSize: 30
  };

  componentDidMount() {
    this.loadMap();
  }

  componentDidUpdate() {
    //  this.loadMap();
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
    const { locations, iconSize } = this.state;

    // Create an Marker Icon
    const beerIcon = {
      url: "./img/beer_icon.png",
      size: new google.maps.Size(iconSize, iconSize),
      scaledSize: new google.maps.Size(iconSize, iconSize)
    };

    const infoWindow = new google.maps.InfoWindow({
      content: "Hello there"
    });

    // Generate icons for every location
    locations.forEach(location => {
      const marker = new google.maps.Marker({
        position: { lat: location.location.lat, lng: location.location.lng },
        title: location.name,
        draggagle: true,
        animation: google.maps.Animation.DROP,
        icon: beerIcon,
        clickable: true,
        anchorPoint: new google.maps.Point(0, -30)
      });

      // Add click listener to open InfoWindow
      marker.addListener("click", e => {
        const clientId = "KT0D2EBKSOLKTDTT3J5NQ233PFQ4L5D34PCJ2YQMTRF1OYRZ";
        const clientSecret = "HUT1FS45J0ALJUGAE0B4XAZJURT0BFNNB3USSVHSDUIOYOUY";

        axios
          .get("https://api.foursquare.com/v2/venues/search", {
            params: {
              client_id: clientId,
              client_secret: clientSecret,
              ll: "56.951604,24.109677",
              v: "20180323",
              query: "Beer Garden On Central Park",
              limit: 1
            }
          })
          .then(res => {
            return res.data;
          })
          .then(data => {
            console.log(data);
          })
          .catch(err => {
            console.log("Error", err);
          });

        /**
         * TODO: Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource
         */

        // Center map to marker position
        this.map.panTo(marker.getPosition());

        infoWindow.open(this.map, marker);
      });

      // Add markers to Map
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
