import React, { Component, useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react';
import {ListAllDevicesLocation, RetrieveDevice, ListAllDevices, ListAllDevicesName, UpdateDevice} from './coreAPIcalls/hologramAPIcalls';
import AsyncTypeahead from 'react-bootstrap-typeahead';
import { map } from 'lodash';
import Sweet from './assets/Sweet/group-4.png';
import { useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";



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

 export const trackingPeriod = ()=> {
    //will be deleted
  }

  const useStyles = makeStyles((theme) => ({
    imagereceived: {
      height: 30,
      width : 30
    }
  
  }));

const WhereisMyPet = (timer) => {

  const [petlat, setPetLat] = useState(null);
  const [petlng, setPetLng] = useState(null);
  let device = useSelector((state) => state.selectedDeviceid);
  const {deviceid} = device;
  console.log(deviceid.petName);

  const classes = useStyles();

  //1246634

  const preload =() => {
    RetrieveDevice(parseInt(deviceid.deviceid))
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
      preload();
  },[device])

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
              
              text={<img src={deviceid.ImageUrl} alt="X" className={classes.imagereceived}/>}
            />
          </GoogleMapReact>
        </div>
      );
  }



export default WhereisMyPet;