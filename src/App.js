import React, { useEffect } from "react";
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
import firebase from "./firebase";

// import DataService from "./services/Data";

const App = () => {
  
  useEffect(() => {
    /*const messaging = firebase.messaging();
    messaging.requestPermission()
    .then(()=> {
      return messaging.getToken()
    }).then(token => {
      console.log("Token : ",token);
    })
    .catch((err)=> console.log(err));*/
  }, []);

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
