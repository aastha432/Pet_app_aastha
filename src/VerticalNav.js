import React from "react";
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import {
  // List,
  // ListItem,
  // ListItemText,
  AppBar,
  Toolbar,
  Grid,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import SoundAlarm from "./SoundAlarm";
import Geofence from "./Geofence";
import Profile from "./Profile";






const VerticalNav = ({ pages, addnewpet }) => {
  const useStyles = makeStyles((theme) => ({
    navButton: {
      textTransform: "none",
    },
    navpages: {
      background: "#ffffff",
      padding: "5px",
      margin: "10px",
    },
    save: {
      width: "179px",
      height: "49px",
     color :"#fffffff",
      padding: "14px 65px 13px 66px",
      borderRadius: "34.5px",
      backgroundColor: "#4de382",
      justifyContent: "right",
    },
  }));

  const classes = useStyles();

  //const leftNav = pages.slice(0, 4);
  //let rightNav = loggedIn ? pages.slice(5, 6) : pages.slice(4, 5);
  // rightNav.push(pages.slice(6, pages.length)[0]);

  return (
    <div>
      <Grid>
      {pages.map((page, index) => (
        <Grid item className={classes.navpages}>
          <Button
            className={classes.navButton}
            key={index}
            component={Link}
            to={page.pageLink}
          >
            {page.name}
          </Button>
        
        </Grid>

      ))}
      <br></br>
      <br></br>
        <Button type="submit " value="Submit" className={classes.save}
        component={Link} to={addnewpet.pageLink} >
        <b>{addnewpet.name}</b>
      </Button> {/* add a onclick*/}
      </Grid>
    </div>
  );
};

export default VerticalNav;

//<Grid item>
//{rightNav.map((page, index) => (
// <Button
// className={classes.navButton}
// key={index}
// component={Link}
// to={page.pageLink}
// >
//  {page.name}
// </Button>
//))}
//</Grid>
