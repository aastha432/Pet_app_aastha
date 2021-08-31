import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "fontsource-roboto";
import Home from "./Home";
import Loginmain from "./Loginmain";
import Profile from "./Profile";
import SoundAlarm from "./SoundAlarm";
import Geofence from "./Geofence";
import Navbar from "./Navbar";
import PrivateRoute from "./PrivateRoutes";
import ForgotPassword from "./ForgotPassword";
import E_commerce from "./E_commerce";

// import DataService from "./services/Data";

const App = () => {
  // useEffect(() => {
  //   console.log("effect");
  //   DataService.getAll("usersData").then((response) => console.log(response));
  // }, []);

  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/Login" exact component={Loginmain} />
      <Route path="/ForgotPassword" exact component={ForgotPassword}/>
      <Route path="/Navbar" exact component={Navbar} />
    </Router>
  );
};

export default App;
