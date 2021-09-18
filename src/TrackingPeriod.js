import React from "react";
import trackingmode from "./assets/trackingmode.png";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import "./login.css";
import { preload } from "./WhereisMyPet";
import { useDispatch } from "react-redux";
import { trackingperiod_normal, trackingperiod_powersaving, trackingperiod_tracking } from "./redux/actions/continuousSigninTimerActions";

const TrackingPeriod = () => {

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },

    radiob: {
      height: "30px",
      width: "30px",
    },
    save: {
      width: "179px",
      height: "49px",
      margin: "3px 15px 11px 118px",
      padding: "14px 65px 13px 66px",
      borderRadius: "34.5px",
      backgroundColor: "#4de382",
      justifyContent: "right",
      color: "#ffffff",
      float: "right",
    },
  }));

  const [selectedValue, setSelectedValue] = React.useState("normal");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
   

    if(selectedValue == "normal")
       {//trial();
      dispatch(trackingperiod_normal(preload));}
    else if(selectedValue == "power saving")
      dispatch(trackingperiod_powersaving(preload));
    else if(selectedValue == "tracking")
      dispatch(trackingperiod_tracking(preload));

      //API to be made
  };

  const classes = useStyles();
  return (
    <div>
      <center>
        <img src={trackingmode} className={classes.trackingmodei} />
        <br></br>

          <FormControl component="fieldset">
          <FormLabel component="legend">Tracking modes</FormLabel>
          <RadioGroup aria-label="tracking mode" name="gender1" value={selectedValue} onChange={handleChange}>

            <FormControlLabel value="normal" control={<Radio />} label="Normal Mode (Update every 10 min)" />
            <FormControlLabel value="power saving" control={<Radio />} label="Power Saving Mode (Update every hour)" />
            <FormControlLabel value="tracking" control={<Radio />} label="Tracking Mode (Update every minute)" />
          
          </RadioGroup>
          </FormControl>


        <br></br>
        <br></br>
      </center>
      <Button
        variant="outlined"
        value="Submit"
        type="submit"
        value="Submit"
        className={classes.save}
        onClick={onSubmit}
      >
        <b>Save</b>
      </Button>
    </div>
  );
};
export default TrackingPeriod;
