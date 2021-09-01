import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Registermain from "./Registermain";
import "./login.css";
import dog from "./assets/dog.png";

const Home = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        width: "25ch",
        wrap: "flex",
        overflow: "hidden",
      },
    },

    image: {
      margin: "0px",
      width: "100%",
      height: "100vh",
      flexGrow: "1",
      display: "flex",
    },
  }));
  const classes = useStyles();
  return (
    <div>
      <br></br>
      <br></br>
      <div className="flex-container">
        <div className="flex-container2">
          <img src={dog} className={classes.image} alt="Not loaded"/>
        </div>
        <div>
          <Registermain />
        </div>
      </div>
    </div>
  );
};

export default Home;
