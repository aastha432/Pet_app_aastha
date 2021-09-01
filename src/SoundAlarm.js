import React from "react";
import Soundalarm from "./assets/Soundalarm.png";
import SoundAlarmbg from "./assets/SoundAlarmbg.png";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import "./login.css";

const SoundAlarm = () => {

  const [soundAlarm, setSoundAlarm] = React.useState(false);

  const handleSoundAlarm = () => {
    soundAlarm ? setSoundAlarm(false) : setSoundAlarm(true);
  }


  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        width: "25ch",
        wrap: "flex",
        overflow: "hidden",
      },
    },

    image: {
      position: "absolutrelaticve",

      zIndex: "1",
    },
    image2on: {
      marginTop: "70%",
      position: "relative",
      zIndex: "1",
      background: "radial-gradient(circle, green, rgb(34, 240, 7),rgb(132, 245, 118), white)"
    },
    image2off: {
      marginTop: "70%",
      position: "relative",
      zIndex: "1",
      background: "radial-gradient(circle, red, rgb(227, 20, 20),rgb(245, 66, 66), white)"
    }
  
  }));
  const classes = useStyles();
  return (
    <div>
      <div>
        <center>
          <Button onClick={handleSoundAlarm}>
            <img src={Soundalarm} className={ soundAlarm ? classes.image2on : classes.image2off} />
          </Button>
          <br></br>
          <Typography variant="h5" gutterBottom>
            This option will activate the <br></br> device light and  play a musical tone
           <br></br> so you can find your pet
          </Typography>
        </center>
      </div>
    </div>
  );
};
export default SoundAlarm;
