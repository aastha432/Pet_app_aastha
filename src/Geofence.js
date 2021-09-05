import React, { useState,useEffect } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DataService from "./service/Data";
import { makeStyles } from "@material-ui/core/styles";
import GoogleMapReact from 'google-map-react';
import Sweet from './assets/Sweet/group-4.png';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {RetrieveDevice} from './coreAPIcalls/hologramAPIcalls';


const AnyReactComponent = ({ text }) => (
  <div style={{
    color: 'white', 
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    backgroundColor : "black",
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
);


/*
Haversine formula to find distance between two points on a sphere

https://www.geeksforgeeks.org/haversine-formula-to-find-distance-between-two-points-on-a-sphere/
*/



const Geofence = () => {
  const[state, setState] = useState({toggleswitch : true, count : 0})
  let {toggleswitch, count} = state;
  const [mylat, setMyLat] = useState(null);
  const [mylng, setMyLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [petlat, setPetLat] = useState(null);
  const [petlng, setPetLng] = useState(null);


  const Mapx = () => {
    let defaultProps = {
      center: {
        lat: mylat,
        lng: mylng
      },
      zoom: 11
    };
  
      return (
        // Important! Always set the container height explicitly
        <div style={{ height: '60vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyBuhUomyWxQBTEeyXUr_7xvq5kU_ghUxE0" }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent
              lat= {mylat}
              lng={mylng}
              text={<LocationOnIcon/>}
            />
            <AnyReactComponent
              lat= {petlat}
              lng={petlng}
              text={<img src={Sweet} alt="X"/>}
            />
          </GoogleMapReact>
          
        </div>
      );
  }

  function increase() {
    setState({
      ...state,
      count : count +1
    })
  }
  function decrease() {
    if (state.count>0){
      setState({
        ...state,
        count : count -1
      })
    }
  }

  function handleToggleSwitch(){
    toggleswitch ? setState({...state,toggleswitch:false}) : setState({...state,toggleswitch:true});
  }

  const getLocation = () => {

    /*Latitude: 13.1252
    Longitude: 77.5883*/

    if (!navigator.geolocation) {
      setStatus('Geolocation is not supported by your browser');
    } else {
      setStatus('Getting your location ......');
      navigator.geolocation.getCurrentPosition((position) => {
        setStatus(null);
        setMyLat(position.coords.latitude);
        setMyLng(position.coords.longitude);
      }, () => {
        setStatus('Unable to retrieve your location');
      });
    }
  }

  const getPetLocation = (deviceid) => {
    //deviceid need to be dyanamically set when pet is choosen from Navbar
    RetrieveDevice(1246634)
    .then(res => {
      console.log(`${res.data.lastsession.latitude} of type ${typeof(res.data.lastsession.latitude)}`);
      console.log(`${res.data.lastsession.longitude} of type ${typeof(res.data.lastsession.longitude)}`);
      setPetLat(res.data.lastsession.latitude);
      setPetLng(res.data.lastsession.longitude);
     }
   )
   .catch(err => {console.log(err)});
  }

  useEffect(() => {
    getLocation();
    getPetLocation();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const data = {
      "geofence" : count,
      "distance" : `${Calculations()} km`
    }
    console.log(`User current location = ${mylat}(latitude) & ${mylng}(longitude)`);
    console.log(`Pet current location = ${petlat}(latitude) & ${petlng}(longitude)`);
    console.log(data);
    // API yet to be made
  };

  const Calculations = () => {
      // distance between latitudes and longitudes
        let dLat = (petlat - mylat) * Math.PI / 180.0;
        let dLon = (petlng - mylng) * Math.PI / 180.0;
           
        // convert to radiansa
        let mylat1 = (mylat) * Math.PI / 180.0;
        let petlat1 = (petlat) * Math.PI / 180.0;
         
        // apply formulae
        let a = Math.pow(Math.sin(dLat / 2), 2) +
                   Math.pow(Math.sin(dLon / 2), 2) *
                   Math.cos(mylat1) *
                   Math.cos(petlat1);
        let rad = 6371;
        let c = 2 * Math.asin(Math.sqrt(a));
        return rad * c;
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    counter: {
      background: " #eec311",
      padding: "10px",
      width: "64px",
      height: "54px",
      fontSize: "20px",
      color: "#fffff",
    },
    save: {
      width: "179px",
      height: "49px",
      margin: "3px 15px 11px 334px",
      padding: "14px 65px 13px 66px",
      borderRadius: "34.5px",
      backgroundColor: "#4de382",
      justifyContent: "right",
      color: "#ffffff",
      float: "right",
    },
  }));
  const classes = useStyles();


  return (
    <div>
    <Mapx/>
    <div>
      <p>{status}</p>
      <h1>Set Geofence</h1>
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            checked= {toggleswitch}
            onChange={handleToggleSwitch}
            name="checkedB"
            color="primary"
          />
        }
      />
      {toggleswitch ?
      <div>
      <Button
        variant="contained"
        className={classes.counter}
        onClick={decrease}
      >
        -
      </Button>
      <TextField id="outlined-basic" variant="outlined" value={`${count}m`} />
      <Button
        onClick={increase}
        variant="contained"
        className={classes.counter}
      >
        +
      </Button>

      <Button onClick={onSubmit} variant="contained" className={classes.save}>
        Save
      </Button></div> : null}
    </FormGroup></div>
 </div>
  );
};
export default Geofence;
