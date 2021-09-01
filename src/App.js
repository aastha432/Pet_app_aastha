import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "fontsource-roboto";
import Home from "./Home";
import Loginmain from "./Loginmain";
import Navbar from "./Navbar";
import ForgotPassword from "./ForgotPassword";

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
