import React, { Component } from 'react';
// import logo from '../logo.svg';
import '../App.css';
// import SimpleMap from './SimpleMap';
import GoogleMapReact from 'google-map-react';
import userLocation from "./UserLocationData";
import FoundUser from './FindNearbyUsers';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class App extends Component {
  constructor() {
    super()
    this.state = {
      isLocated: false,
      center: {
        lat: 39.8283,
        lng: -98.5795
      },
      zoom: 5
    }
    this.handleClick =  this.handleClick.bind(this)
  }
 
handleClick(){
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords.latitude, position.coords.longitude)
    var x = position.coords.latitude
    var y = position.coords.longitude
    this.setState({
      isLocated: true,
      center: {
        lat: x,
        lng: y
      },
      zoom: 20
    })

      });
}

  render() {
  if (this.state.isLocated === true) {
   userLocation.map(user => {
        const myCenter = this.state.center

        function check_a_point(a, b, x, y, r) {
          var dist_points = (a - x) * (a - x) + (b - y) * (b - y);
          r *= r;
          if (dist_points < r) {
              console.log(user.name + " is nearby!")
              return true
          }
          return false;
      }

check_a_point(myCenter.lat, myCenter.lng, user.center.lat, user.center.lng, 0.001)

return user
      } 
    ) 
  }
  // console.log(this.state)


    return (
      <div className="App">
        <header>
          Collab
        </header>

        <button onClick={this.handleClick}>Get My Location</button>
        <FoundUser />

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
          <AnyReactComponent
          lat={userLocation[0].center.lat}
          lng={userLocation[0].center.lng}
          text={userLocation[0].name}
          />
        </GoogleMapReact>

     
        </div>
      </div>
    );
  }
}

export default App;
