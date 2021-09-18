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
import { selected_device_info, selected_device_latitude, selected_device_longitude } from './redux/actions/deviceidActions';

//all my device actions are in redux/actions/deviceiActions
//all my device reducers are in redux/reducers/deviceiReducers
//combined reducers are in edux/reducers/index

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

  // these 3 need to be replaced by global states from redux
  const [petlat, setPetLat] = useState(null); //redux equivalent = selected_device_latitude (action)
  const [petlng, setPetLng] = useState(null); //redux equivalent = selected_device_longitude (action)
  const [deviceInfo, setDeviceInfo] = useState({}); //redux equivalent = selected_device_info (action)

  //redux 
  let device = useSelector((state) => state.selectedDeviceid);
  const {deviceid} = device;

  let Latitude = useSelector((state) => state.selectedDeviceLat);
  const {latitude} = Latitude;
  console.log(latitude); //not working

  let Longitude = useSelector((state) => state.selectedDeviceLong);
  const {longitude} = Longitude;
  console.log(longitude); //not working

  let Info = useSelector((state) => state.selectedDeviceInfo);
  const {info} = Info;
  console.log(info); //not working

  const dispatch = useDispatch();
  //


  const classes = useStyles();

  const preload =() => {
    RetrieveDevice(parseInt(deviceid))
    .then(res => {
      console.log("Continuous location update");
      console.log(`pet latitude = ${res.data.lastsession.latitude}`);
      console.log(`pet longitude = ${res.data.lastsession.longitude}`);
      setPetLat(res.data.lastsession.latitude);
      setPetLng(res.data.lastsession.longitude);
      dispatch(selected_device_latitude(res.data.lastsession.latitude)); //not working
      dispatch(selected_device_longitude(res.data.lastsession.longitude)); //not working
     })
     .catch((err) => console.log(err));

     getDeviceInfo()
     .then(res => {
        res.msg.map((pet) => {
          if(pet.deviceid == deviceid){
            setDeviceInfo(pet);
            dispatch(selected_device_info(pet)); //not working
          }
        })
    })
    .catch(err => {console.log(err)});
}

  useEffect(() => {
      preload();
      dispatch(continuousSigninStop());
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
              lat= {petlat} // lat = {latitude}
              lng={petlng}  // lng = {longitude}
              
              text={<img src={deviceInfo.ImageUrl} alt="X" className={classes.imagereceived}/>}
            />
          </GoogleMapReact>
        </div>
      );
  }



export default WhereisMyPet;
export const {preload} = WhereisMyPet; //if preload is outside WhereismyPet hooks calls are invalid(error)