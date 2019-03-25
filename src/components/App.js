import React, { Component } from 'react';
// import logo from '../logo.svg';
import '../App.css';
// import SimpleMap from './SimpleMap';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class App extends Component {
  constructor() {
    super()
    this.state = {
      center: {
        lat: -34.397,
        lng: 150.644
      },
      zoom: 11
    }
    this.handleClick =  this.handleClick.bind(this)
  }
 
handleClick(){
  navigator.geolocation.getCurrentPosition((position, newLat, newLng) => {
    console.log(position.coords.latitude, position.coords.longitude)
    var x = position.coords.latitude
    var y = position.coords.longitude
    this.setState({
      center: {
        lat: x,
        lng: y
      },
      zoom: 20
    }, console.log(this.state))

      });
}

  render() {

    // console.log(this.state)
    return (
      <div className="App">
        <header>
          Collab
        </header>

        <button onClick={this.handleClick}>Get My Location</button>

        <div style={{ height: '100vh', width: '50%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API}}
          center={this.state.center}
          zoom={this.state.zoom}
          id="map"
        >
          <AnyReactComponent
            lat={this.state.center.lat}
            lng={this.state.center.lng}
            text={'My Location'}
          />
        </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default App;
