import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

class MapContainer extends React.Component {
  render() {
    let { lat, lon } = this.props;
    lat = parseFloat(lat)
    lon = parseFloat(lon)
    const mapStyles = {
      width: '90%',
      height: '100%',
    };
    return(
      <Map
        google={this.props.google}
        zoom={12}
        style={mapStyles}
        initialCenter={{ lat: lat, lng: lon}}
        center={{ lat: lat, lng: lon}}
      />
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDVr6O0_CwMqOFslldgWWKDuOookq2iBcg'
  })(MapContainer);