import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class SimpleMap extends Component {
    
  static defaultProps = {
    center: {
      lat: navigator.geolocation.getCurrentPosition.latitude,
      lng: navigator.geolocation.getCurrentPosition.longitude
    },
    zoom: 11
  };




  render() {
    function showMap(position) {
        // Show a map {centered at (position.coords.latitude, position.coords.longitude).
        console.log(position.coords.latitude);
        var x = position.coords.latitude
        console.log(position.coords.longitude);
        var y = position.coords.longitude
        return (x, y)
      }


    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50%', width: '50%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          id="map"
        >
          <AnyReactComponent
            lat={navigator.geolocation.getCurrentPosition.latitude}
            lng={navigator.geolocation.getCurrentPosition.longitude}
            text={'My Location'}
          />
        </GoogleMapReact>
        <button onClick={navigator.geolocation.getCurrentPosition(showMap)}>Get My Location</button>

      </div>
    );
  }
}
 
export default SimpleMap;