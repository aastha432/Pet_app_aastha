import React, { useState } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DataService from "./service/Data";
import { makeStyles } from "@material-ui/core/styles";
import GoogleMapReact from 'google-map-react';
import Sweet from './assets/Sweet/group-4.png';



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

const Mapx = (locations) => {
  let defaultProps = {
    center: {
      lat: 30.34,
      lng: 40.34
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
            lat= {30.34}
            lng={40.34}
            text={<img src={Sweet} alt="X"/>}
          />
        </GoogleMapReact>
      </div>
    );
}




const Geofence = () => {
  const[state, setState] = useState({toggleswitch : true, count : 0})
  let {toggleswitch, count} = state;

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
  const onSubmit = (event) => {
    event.preventDefault();
    const data = {
      count,
    };
    console.log(data);
    DataService.create("geofencdata", data);
    console.log(`Data sent to server: ${JSON.stringify(data)}`);
  };
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
      <TextField id="outlined-basic" variant="outlined" value={count} onChange={(e) => setState({ ...state, count: e.target.value })}/>
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
