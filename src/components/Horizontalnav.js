import React, { useState,useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import "./navbar.css";
import logo from "../assets/logo.png";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Sweet from '../assets/Sweet/group-4.png';
import Ricko from '../assets/Ricko/group-3.png';
import Bailey from '../assets/Bailey/group-2.png';
import PersonIcon from '@material-ui/icons/Person';
import { Link as LinkRouter , Redirect} from "react-router-dom";
import Link from "@material-ui/core/Link";
import { signout } from "../coreAPIcalls/userAPIcalls";
import {getDeviceInfo} from "../coreAPIcalls/deviceAPIcalls"
import WhereisMyPet from "../WhereisMyPet";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "63px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginTop: "10px",
    marginLeft: "-20px",
    marginBottom: '0px',
  },
  title: {
    flexGrow: 1,
  },
  image: {
    backgroundColor: "white",
    padding: "0px",
    height: "60px",
    marginLeft: "-15px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  imagereceived: {
    height: 30,
    width : 30
  }

}));


export const Horizontalnav = () => {
  const classes = useStyles();

  const [age, setAge] = React.useState('');
  const [username, setUsername] = React.useState('Aastha');
  const [devices, setDevices] = useState([]);
  const [refresh, serRefresh] = useState(true);

  const preload = () => {
    getDeviceInfo().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setDevices(data.msg);
      }
    });
  };

  useEffect(() => {
    preload();
  }, [refresh]);

  const User = (name) => {
    console.log(`${name} typeof ${typeof(name)}`);
    setUsername(name);
  }

  const handleChange = (event) => {
    setAge(event.target.value);
  };


  const onSubmit = (event) => {
    event.preventDefault();
    console.log(`Horizontalnav token ${localStorage.getItem("jwt")}`);
    signout()
    .then(res => {     
      console.log("User signed out succesfully");
      }
    )
    .catch(err => {console.log(`Error of signout ${err}`);});
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className="topnav">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <img src={logo} className={classes.image} />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            
          </Typography>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">My Pet</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={age}
          onChange={handleChange}
          onClick ={() => refresh? serRefresh(false) : serRefresh(true)}
          onContextMenu
          label="Age"
        >
          {devices.map((device) => (
          <MenuItem value={device.petName} /*onClick={() => WhereisMyPet({deviceid : device.deviceid})}*/>
            <div className="container">
              <div >
               <img src={device.ImageUrl} alt={Bailey} className={classes.imagereceived}/>
              </div>
              <div className="text">
                {device.petName} ({device.breed})
              </div>
            </div>
          </MenuItem>
          ))}
        </Select>
      </FormControl>

          <Button color="inherit">
            <b>
            <div className="container">
              <div className="image">
              <PersonIcon/>
              </div>
              <div className="text">
                  Welcome 
              </div>
            </div>
            </b>
          </Button>
          <Button color="inherit" onClick={onSubmit}>
            <b>
            <Link component={LinkRouter} to="/Login">
                  Sign out
            </Link>
            </b>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Horizontalnav;
