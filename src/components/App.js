import React, { Component } from 'react';
// import logo from '../logo.svg';
import '../App.css';
// import SimpleMap from './SimpleMap';
import GoogleMapReact from 'google-map-react';
import userLocation from "./UserLocationData";
import FoundUsers from './FindNearbyUsers';
import pulse from "../pulse.gif";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class App extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: false,
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
  this.setState({isLoading: true})

  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords.latitude, position.coords.longitude)
    var x = position.coords.latitude
    var y = position.coords.longitude
    this.setState({
      isLoading: false,
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

    console.log(this.state)


 const nearBy = []

 if (this.state.isLocated === true) {
   userLocation.map(user => {
        const myCenter = this.state.center

        function check_a_point(a, b, x, y, r) {
          var dist_points = (a - x) * (a - x) + (b - y) * (b - y);
          r *= r;
          if (dist_points < r) {
              console.log(user.name + " is nearby!")
              nearBy.push(user)            
              return user
          }
          return false;
      }

check_a_point(myCenter.lat, myCenter.lng, user.center.lat, user.center.lng, 0.001)
// console.log(nearBy)

return nearBy
      } 
    ) 
  }
  console.log(nearBy)
  const nearByUsers = nearBy.map(user => <FoundUsers key={user.id} name={user.name} />)
  const loading = this.state.isLoading ? <img src={pulse} alt="Wheel spinning"/> : ""

    return (
      <div className="App">
        <h1>
          Collab
        </h1>

        <button onClick={this.handleClick}>Get My Location</button> 
        <br></br>
        <br></br>
        <br></br>
{loading} <br></br>

{nearByUsers}
        {/* <div style={{ height: '100vh', width: '50%' }}>

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

     
        </div> */}
      </div>
    );
  }
}

export default App;
