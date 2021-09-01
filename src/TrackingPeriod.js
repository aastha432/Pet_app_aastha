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
import DataService from "./service/Data";

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

  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange = (event) => {
    setSelectedValue({ selectedValue: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const data = {
      selectedValue,
    };
    console.log(data);
    DataService.create("modeData", data);
    console.log(`Data sent to server: ${JSON.stringify(data)}`);
  };

  const classes = useStyles();
  return (
    <div>
      <center>
        <img src={trackingmode} className={classes.trackingmodei} />
        <br></br>

        <Grid container>
          <Grid item xs={6}>
            <Radio
              checked={selectedValue === "a"}
              onChange={handleChange}
              value="b"
              name="radio-button-demo"
              inputProps={{ "aria-label": "A" }}
              labelPlacement="start"
              className={classes.radiob}
            />
            <label className="modes">
              Normal Mode
              <p>Update every 10 min</p>
            </label>
          </Grid>
          <Grid item xs={6}>
            <div>
              <Radio
                onChange={handleChange}
                value="b"
                name="radio-button-demo"
                inputProps={{ "aria-label": "A" }}
                labelPlacement="start"
              />
              <label className="modes">
                Power Saving Mode
                <p>Update every hour</p>
              </label>
            </div>
          </Grid>
        </Grid>
        <br></br>
        <br></br>
        <Grid container>
          <Grid item xs={6}>
            <div>
              <Radio
                onChange={handleChange}
                value="c"
                name="radio-button-demo"
                labelPlacement="start"
              />
              <label className="modes">
                Tracking Mode
                <p>Update every minute</p>
              </label>
            </div>
          </Grid>
        </Grid>
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
