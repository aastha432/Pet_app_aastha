import React, { Component, useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react';
import {ListAllDevicesLocation, RetrieveDevice, ListAllDevices, ListAllDevicesName, UpdateDevice} from './coreAPIcalls/hologramAPIcalls';
import AsyncTypeahead from 'react-bootstrap-typeahead';
import { map } from 'lodash';
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

export const Received = (deviceid) => {
    console.log(deviceid);
    return deviceid;
  }

export const trackingPeriod = (period) => {
  console.log(`Period = ${period}`);
  return period;
}

const WhereisMyPet = (timer) => {

  const [petlat, setPetLat] = useState(null);
  const [petlng, setPetLng] = useState(null);
  const [deviceid, setDeviceid] = useState(Received());
  const [period, setPeriod] = useState(trackingPeriod());
  //1246634

  const preload =() => {
    RetrieveDevice(1246634)
    .then(res => {
      console.log(`${res.data.lastsession.latitude} pet lat`);
      console.log(`${res.data.lastsession.longitude} pet lng`);
      setPetLat(res.data.lastsession.latitude);
      setPetLng(res.data.lastsession.longitude);
     }
   )
  .catch(err => {console.log(err)});
}

  useEffect(() => {
    if(period=="tracking")
      setInterval(preload,1000);
    else if(period=="normal")
      setInterval(preload,10000);
    else if (period=="power saving")
      setInterval(preload,60000);
    else
      preload();


    //ContinuousSignin timer
    clearInterval(timer);
  },[period])

  let defaultProps = {
      center: {
        lat: 25.181,
        lng: 55.225
      },
      zoom: 2
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
              lat= {petlat}
              lng={petlng}
              text={<img src={Sweet} alt="X"/>}
            />
          </GoogleMapReact>
        </div>
      );
  }



export default WhereisMyPet;