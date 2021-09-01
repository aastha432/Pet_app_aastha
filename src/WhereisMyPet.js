import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react';
import { RetrieveDevice} from './coreAPIcalls/hologramAPIcalls';
import Sweet from './assets/Sweet/group-4.png';




const AnyReactComponent = ({ text }) => (
    <div style={{
      color: 'white', 
      background: 'black',
      padding: '15px 10px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)'
    }}>
      {text}
    </div>
  );


const WhereisMyPet = (deviceid) => {

  const [latlong, setLatLong] = useState({ latitude: 25.181, longitude: 55.342});
  const {latitude,longitude} = latlong;
  const [refresh, setRefresh] = useState(false);

  const preload =() => {
  RetrieveDevice(parseInt("1246634"))
   .then(res => {
     console.log(`${res.data.lastsession.latitude} of type ${typeof(res.data.lastsession.latitude)}`);
     console.log(res.data.lastsession.longitude);
     setLatLong({
      ...latlong,
      latitude: res.data.lastsession.latitude,
      longitude: res.data.lastsession.longitude
    });
    console.log(latitude);
    console.log(longitude);
    }
  )
  .catch(err => {console.log(err)});
  setRefresh(true);
}

  useEffect(() => {
    preload();
  },[refresh])

  let defaultProps = {
      center: {
        lat: latitude,
        lng: longitude
      },
      zoom: 11
    };

      return (
        // Important! Always set the container height explicitly
        <div style={{ height: '80vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyBTyQ-tjklxAg10pM8AkOSQLKlD2YTeilI" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent
              lat= {latitude}
              lng={longitude}
              text={<img src={Sweet} alt="X"/>}
            />
          </GoogleMapReact>
        </div>
      );
  }



/*class WhereisMyPet extends Component {

  componentDidMount(){
    map = new window.google.maps.Map(document.getElementById(map),{
      center: {lat: -6.226996, lng: 106.819894},
      zoom: 10,
      zoomControl: true,
      zoomControlOptions: {
       position: window.google.maps.ControlPosition.RIGHT_CENTER
      },
      scrollwheel: false,
      streetViewControl: false,
      mapTypeControl: false,
      mapTypeId: "roadmap"
     });
    }

    _handleSearch(query) {
      if (!query) {
        return;
      }
      fetch(`https://nominatim.openstreetmap.org/search.php?q=${query}&polygon_geojson=1&format=json`)
        .then(resp => resp.json())
        .then(data => {
          let filterGeoJsonType = data.filter(function(data){
            return data.geojson.type === "MultiPolygon" || data.geojson.type === "Polygon"
          });
          this.setState({options: filterGeoJsonType});
        });
    }

  render(){
    return <AsyncTypeahead
    align="justify"
    multiple
    selected={this.state.selected}
    labelKey="display_name"
    onSearch={_.debounce(this._handleSearch.bind(this), 2000)}
    options={this.state.options}
    placeholder="Search city, ex: tomang or jakarta selatan..."
    renderMenuItemChildren={(option, props, index) => (
        <div onClick={this._onSelectOptions.bind(this, option)}>
          <span>{option.display_name}</span>
      </div>
    )}/>
  }
}*/
  
export default WhereisMyPet;