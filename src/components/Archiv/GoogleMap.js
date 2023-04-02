import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React,{Component} from 'react';


const style = {
  width: "70%",
  height: "50%",
  alignItems: "center"
};

export class MapContainer extends Component {
  render() {
    return (
      <Map 
      initialCenter={{
        lat: 50.775555,
        lng: 6.0839,
      }}

      google={this.props.google} zoom={14} 
      containerStyle={style} 
      >
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />
 
        {/* <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow> */}
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyBIA3WFZArX0EtrNhrSSSkO7wN4wkk2XeY')
})(MapContainer)