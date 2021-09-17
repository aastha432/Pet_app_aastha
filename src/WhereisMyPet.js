import React, { Component, useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react';
import {ListAllDevicesLocation, RetrieveDevice, ListAllDevices, ListAllDevicesName, UpdateDevice} from './coreAPIcalls/hologramAPIcalls';
import AsyncTypeahead from 'react-bootstrap-typeahead';
import { map } from 'lodash';
import Sweet from './assets/Sweet/group-4.png';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import { continuousSigninStop } from './redux/actions/continuousSigninTimerActions';
import {getDeviceInfo} from "./coreAPIcalls/deviceAPIcalls"



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


const useStyles = makeStyles((theme) => ({
    imagereceived: {
      height: 30,
      width : 30
    }
  
  }));

const WhereisMyPet = () => {

  const [petlat, setPetLat] = useState(null);
  const [petlng, setPetLng] = useState(null);
  const [deviceInfo, setDeviceInfo] = useState({});

  //redux 
  let device = useSelector((state) => state.selectedDeviceid);
  const {deviceid} = device;
  const dispatch = useDispatch();

  const classes = useStyles();

  const preload =() => {
    RetrieveDevice(parseInt(deviceid))
    .then(res => {
      console.log("Continuous location update");
      console.log(`pet latitude = ${res.data.lastsession.latitude}`);
      console.log(`pet longitude = ${res.data.lastsession.longitude}`);
      setPetLat(res.data.lastsession.latitude);
      setPetLng(res.data.lastsession.longitude);
     })
     .catch((err) => console.log(err));

     getDeviceInfo()
     .then(res => {
        res.msg.map((pet) => {
          if(pet.deviceid == deviceid){
            setDeviceInfo(pet);
          }
        })
    })
    .catch(err => {console.log(err)});
}

  useEffect(() => {
      preload();
      dispatch(continuousSigninStop());
  },[device,petlat,petlng])

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
              
              text={<img src={deviceInfo.ImageUrl} alt="X" className={classes.imagereceived}/>}
            />
          </GoogleMapReact>
        </div>
      );
  }



export default WhereisMyPet;
export const {preload} = WhereisMyPet;