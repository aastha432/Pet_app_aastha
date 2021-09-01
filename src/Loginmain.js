import React, { useState } from "react";
import Profile from "./Profile";
import Loginform from "./Loginform";
import logo from "./assets/logo.png";
import dog from "./assets/dog.png";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from ".//Navbar";
const Loginmain = () => {
  const AdminUser = {
    name: "madhura",
    password: "madhura1",
  };
  const [user, setuser] = useState({ name: "", password: "" });
  const [error, seterror] = useState(" ");
  const useStyles = makeStyles((theme) => ({
    image: {
      margin: "0px",
      width: "100%",
      height: "100vh",
      flexGrow: "1",
      display: "flex",
    },
    paper: {
      marginTop: theme.spacing(0),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  const classes = useStyles();
  const Login = (details) => {
    if (
      details.name == AdminUser.name &&
      details.password == AdminUser.password
    ) {
      console.log("logged in");
      setuser({
        name: details.name,
      });

      /*} setuser(<Profile />); //dont think that we can pass components in the second counter, need to use  router?*/
    } else {
      console.log("wrong details");
    }
  };

  return (
    <div>
      {console.log(user)}
      {console.log(user.name)}

      {user.name ? (
        <div>
          <Navbar />
        </div>
      ) : (
        <div className="flex-container">
          <div className="flex-container2">
            <img src={dog} className={classes.image} />
          </div>
          <div className={classes.paper}>
            <img src={logo} />
            <Loginform Login={Login} error={error} />
          </div>
        </div>
      )}
    </div>
  );
};
export default Loginmain;
//  return <div>{user.email != "" ? <p> {user.name}</p> : <Loginform />}</div>;
