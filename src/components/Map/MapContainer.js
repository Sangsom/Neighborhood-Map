import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { beerPlaces } from "../../lib/constants";
import axios from "axios";
import Sidebar from "../Sidebar";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
`;

const MapDiv = styled.div`
  width: 100%;
  height: 100vh;
`;

class MapContainer extends Component {
  state = {
    locations: beerPlaces,
    defaultMapZoom: 16,
    center: {
      lat: 56.949649,
      lng: 24.108286
    },
    mapType: "roadmap",
    iconSize: 30,
    mapTypeControl: false,
    markers: [],
    infoWindow: "",
    markerDetails: {
      venueId: null,
      name: null,
      address: null,
      url: null,
      img: null
    }
  };

  componentDidMount() {
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

      // Create info window
      const infoWindow = new google.maps.InfoWindow();
      infoWindow.setOptions({ maxWidth: 300 });
      this.setState({ infoWindow: infoWindow });

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
    const { iconSize, locations } = this.state;
    const markers = [];

    // Create an Marker Icon
    const beerIcon = {
      url: "./img/beer_icon.png",
      size: new google.maps.Size(iconSize, iconSize),
      scaledSize: new google.maps.Size(iconSize, iconSize)
    };

    // Initialize markers
    locations.forEach((location, index) => {
      const marker = new google.maps.Marker({
        map: this.map,
        position: { lat: location.location.lat, lng: location.location.lng },
        title: location.name,
        animation: google.maps.Animation.DROP,
        id: index,
        icon: beerIcon,
        anchorPoint: new google.maps.Point(0, -30)
      });

      // Push the markers to array of markers
      markers.push(marker);

      marker.addListener("click", () => {
        this.openInfoWindow(marker);
      });
    });

    // Set up the markers state
    this.setState({ markers });
  };

  /**
   * Opens info window for the marker
   * @param {object} marker - Marker object
   */
  openInfoWindow = marker => {
    const { map } = this;
    const { infoWindow } = this.state;
    // Check if the infoWindow is not already opened for this marker
    if (infoWindow.marker !== marker) {
      infoWindow.marker = marker;
      infoWindow.setContent(`Loading...`);
      infoWindow.open(this.map, marker);

      // Clear the marker property when closed
      infoWindow.addListener("closeclick", () => {
        infoWindow.setMarker = null;
      });
    }

    this.getMarkerDetails(marker);

    // Center map to a marker position
    map.panTo(marker.getPosition());
  };

  getMarkerDetails = marker => {
    const clientId = "KT0D2EBKSOLKTDTT3J5NQ233PFQ4L5D34PCJ2YQMTRF1OYRZ";
    const clientSecret = "HUT1FS45J0ALJUGAE0B4XAZJURT0BFNNB3USSVHSDUIOYOUY";
    const { infoWindow, markerDetails } = this.state;

    // Venues Search
    axios
      .get("https://api.foursquare.com/v2/venues/search", {
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          ll: `${marker.getPosition().lat()},${marker.getPosition().lng()}`,
          v: "20180323",
          query: marker.title,
          limit: 1
        }
      })
      .then(res => {
        if (res.status === 200 && res.data.response.venues.length > 0) {
          this.setState(prevState => ({
            markerDetails: {
              ...prevState.markerDetails,
              venueId: res.data.response.venues[0].id
            }
          }));
        } else {
          throw new Error();
        }

        return res.data;
      })
      .then(data => {
        const venue = data.response.venues[0];

        this.setState(prevState => ({
          markerDetails: {
            ...prevState.markerDetails,
            name: venue.name,
            address: venue.location.formattedAddress
          }
        }));

        // Venue Details
        axios
          .get(
            `https://api.foursquare.com/v2/venues/${markerDetails.venueId}`,
            {
              params: {
                client_id: clientId,
                client_secret: clientSecret,
                v: "20180323"
              }
            }
          )
          .then(res => {
            this.setState(prevState => ({
              markerDetails: {
                ...prevState.markerDetails,
                url: res.data.response.venue.url
              }
            }));
            return res;
          })
          .catch(err => {
            console.log("Error", err);
          });

        // Venue Photos
        axios
          .get(
            `https://api.foursquare.com/v2/venues/${
              markerDetails.venueId
            }/photos`,
            {
              params: {
                client_id: clientId,
                client_secret: clientSecret,
                v: "20180323"
              }
            }
          )
          .then(res => {
            const { photos } = res.data.response;

            if (photos.count > 0) {
              console.log("Photos", photos);
              const link = `${photos.items[0].prefix}300x300${
                photos.items[0].suffix
              }`;
              this.setState(prevState => ({
                markerDetails: {
                  ...prevState.markerDetails,
                  img: link
                }
              }));
            }
          });

        // Create marker content
        const content = `
          <h4>${markerDetails.name}</h4>
          <address>Address: ${markerDetails.address.map(val => {
            return " " + val;
          })}</address>
          ${
            markerDetails.url !== null && markerDetails.url !== undefined
              ? `Website: <a href=${markerDetails.url} target="_blank">${
                  markerDetails.url
                }</a>`
              : ""
          }
        </a>
        ${
          markerDetails.img !== null && markerDetails.img !== undefined
            ? ` <p><img src=${markerDetails.img} /></p>`
            : ""
        }
       
        `;

        infoWindow.setContent(content);
      })
      .catch(err => {
        console.log("Error", err);
      });
  };

  closeInfoWindow = () => {
    this.state.infoWindow.close();
  };

  hideMarkers = () => {
    const { markers } = this.state;

    markers.forEach(marker => {
      marker.setMap(null);
    });
  };

  showMarkers = () => {
    const { markers } = this.state;

    markers.forEach(marker => {
      marker.setMap(this.map);
    });
  };

  render() {
    const { markers, locations } = this.state;

    return (
      <Wrapper>
        <Sidebar
          locations={locations}
          markers={markers}
          showMarkers={this.showMarkers}
          hideMarkers={this.hideMarkers}
          openInfoWindow={this.openInfoWindow}
          closeInfoWindow={this.closeInfoWindow}
          searchLocations={this.searchLocations}
        />
        <MapDiv ref="map">loading map...</MapDiv>
      </Wrapper>
    );
  }
}

export default MapContainer;
