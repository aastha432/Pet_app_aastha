import React from "react";
import {Redirect} from "react-router-dom";
import {
  Grid,
  makeStyles,
} from "@material-ui/core";
import SoundAlarm from "./SoundAlarm";
import Geofence from "./Geofence";
import Profile from "./Profile";
import VerticalNav from "./VerticalNav";
import TrackingPeriod from "./TrackingPeriod";
import Device from "./Device";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Horizontalnav from "./components/Horizontalnav";
import AddNewPet from "./AddNewPet";
import WhereisMyPet from "./WhereisMyPet";
import { isAuthenticated } from "./coreAPIcalls/userAPIcalls";
import E_commerce from "./E_commerce";
import Cart from "./Cart";


const Navbar = () => {
  const useStyles = makeStyles((theme) => ({
    navButton: {
      textTransform: "none",
    },
    Gridmenu: {
      padding: "10px",
    },
    GridContainer: {
      background: "#f4f4f2",
      height: "100vh",
      margin: "0",
    },
    Maincontainer:{
      marginTop:"12px",
    }
  }));

  const classes = useStyles();
  const navPages = [
    {
      pageLink: "/Navbar",
      view: WhereisMyPet,
      name: "Where is my pet?",
    },
    {
      pageLink: "/SoundAlarm",
      view: SoundAlarm,
      name: "Sound the Alarm",
    },
    {
      pageLink: "/Profile",
      view: Profile,
      name: "My Profile",
    },
    {
      pageLink: "/Geofence",
      view: Geofence,
      name: "Set Geofence",
    },
    
    {
      pageLink: "/TrackingPeriod",
      view: TrackingPeriod,
      name: "Set TrackingPeriod",
    },
    {
      pageLink: "/Device",
      view: Device,
      name: "Device",
    },
    {
      pageLink: "/E_commerce",
      view: E_commerce,
      name: "E-Store",
    }
  ];
  const addnewpet = {
    pageLink: "/addNewPet",
    view: AddNewPet,
    name: "+Add pet",
  };
  
return  isAuthenticated() ?  <div>
<Horizontalnav />

<Router>
  <Grid container className = {classes.Maincontainer}>
    <Grid item xs={2} className={classes.GridContainer}>
      <center>
        <VerticalNav pages={navPages} addnewpet={addnewpet} className={classes.navpages} />
      </center>
    </Grid>
    <Grid item xs={10}>
      <Switch>
        <Route path="/Navbar" component={WhereisMyPet} />
        <Route path="/SoundAlarm" exact component={SoundAlarm} />
        <Route path="/TrackingPeriod" exact component={TrackingPeriod} />
        <Route path="/Geofence" exact component={Geofence} />
        <Route path="/Device" exact component={Device} />
        <Route path="/Profile" exact component={Profile} />
        <Route path="/E_commerce" exact component={E_commerce} />
        <Route path="/addNewPet" exact component={AddNewPet} />
        <Route path="/cart" exact component={Cart} />
      </Switch>
    </Grid>
  </Grid>
</Router>
</div> : <Redirect to="/Login"/>


};

export default Navbar;
