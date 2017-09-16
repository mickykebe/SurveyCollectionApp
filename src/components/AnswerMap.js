import React from 'react';
import { compose } from 'redux';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const MapWithAMarker = compose(
  withScriptjs,
  withGoogleMap
)(({ lat, lng }) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat, lng }}>
    <Marker
      position={{ lat, lng }} />
  </GoogleMap>
);

function AnswerMap({ lat, lng }) {
  return <MapWithAMarker
    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBBzrSh9K0coe0qa3pRxORUcEXNrNUIAKQ&v=3.exp&libraries=geometry,drawing,places"
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
    lat={lat}
    lng={lng}
  />
}

export default AnswerMap;
