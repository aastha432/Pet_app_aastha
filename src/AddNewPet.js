import { Container } from '@material-ui/core';
import React, { Component, useState,useEffect } from 'react'
import {Link} from 'react-router-dom';
import DataService from "./service/Data";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ScannerImage from "./assets/bitmap@2x.png"; 
import {setDeviceInfo,getDeviceInfo} from "./coreAPIcalls/deviceAPIcalls"
import BeanEater from "./assets/BeanEater.gif";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {ListAllDevices, UpdateDevice} from "./coreAPIcalls/hologramAPIcalls"



const AddNewPet = () => {

  const [details, setDetails] = useState({
    deviceid: "",
    petName: "",
    IMEI: "",
    breed: "", 
    file : "", 
    formData: new FormData(),
    loading: false ,error: false
  });
  const { deviceid,petName, IMEI, breed,loading,error,file,formData} = details;
  const [devices, setDevices] = useState([]); //used for preload method

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
    setDetails({...details})
  }, [petName]);


  const BasicTable = () => {
    const useStyles = makeStyles({
      table: {
        minWidth: 650,
      },
    });
    const classes = useStyles();
  
  
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Pet Name</TableCell>
              <TableCell align="right">Breed</TableCell>
              <TableCell align="right">IMEI</TableCell>
              <TableCell align="right">Device ID</TableCell>
              <TableCell align="right">Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {devices.map((device) => (
              <TableRow key={device.IMEI}>
                <TableCell component="th" scope="row">
                  {device.petName}
                </TableCell>
                <TableCell align="right">{device.breed}</TableCell>
                <TableCell align="right">{device.IMEI}</TableCell>
                <TableCell align="right">{device.deviceid}</TableCell>
                <TableCell align="right">{device.updatedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  
  
  const onSubmitsetDevice = (event) => {
      event.preventDefault();
      setDetails({ ...details, error: false, loading: true });
      //setDetails({...details,deviceid: (76845).toString() });
      
      ListAllDevices()
      .then(res => { 
        console.log(res.data);
        res.data.map((holo) => {
          if(holo.imei == IMEI) {
            console.log(holo.id);//fine
            setDetails({...details,deviceid : (holo.id).toString() }); //problem
            //setDetails(prevdeatils => ({...prevdeatils, ...details}));    
            
            formData.set(deviceid, (holo.id).toString());
            console.log(details);
            console.log(deviceid);
          }
        })
      })
      .catch(err => {console.log(err)});

      UpdateDevice(parseInt(deviceid),petName)
      .then(res => {
        console.log("Successfull in hitting UpdateDevice function in hologramAPIcalls");
      })
      .catch(err => console.log(err));

     
      setDeviceInfo(formData)
      .then(res => {  
        if (res.error) {
          setDetails({ ...details, error: res.error, loading: false });}
        else {   
        setDetails({
          ...details,
          petName: "",
          IMEI: "",
          breed: "",
          deviceid: "",
          file : ""
        })
        console.log("Successfull in hitting setDeviceInfo function in deviceAPIcalls");
        }}
      )
      .catch(err => {console.log(err)})

    };

    const handleChange = common => event => {
      const value = common === "file" ? event.target.files[0] : event.target.value;
      formData.set(common, value);
      setDetails({ ...details, [common]: value });
      console.log(details);
    };

  

    const loadingMessage = () => {
      return (
        loading && (
          <div className="alert alert-info">
            <img src={BeanEater} alt="Loading..."/>
          </div>
        )
      );
    };


  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(0),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(5),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    save: {
      width: "175px",
      height: "49px",
      margin: "3px 15px 11px 118px",
      padding: "14px 65px 13px 66px",
      borderRadius: "34.5px",
      backgroundColor: "#4de382",
      justifyContent: "right",
      color: "#ffffff",
      float: "right",
    },
    get: {
      width: "180px",
      height: "49px",
      margin: "3px 15px 11px 118px",
      padding: "14px 65px 13px 66px",
      borderRadius: "34.5px",
      backgroundColor: "#f79605",
      justifyContent: "right",
      color: "#ffffff",
      float: "right",
    },
   
  }));

  const classes = useStyles();

  return (
    <div>
      <center>
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
          {loadingMessage()}
            <form className={classes.form} noValidate>
              <TextField
                required
                fullWidth
                id="standard-basic"
                label="Enter petName"
                name="Name"
                className="Username"
                autoFocus
                onChange ={handleChange("petName")}
                value={petName}
              />
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <TextField
                required
                fullWidth
                id="standard-basic"
                label="Enter IMEI"
                name="Name"
                className="Username"
                autoFocus
                onChange ={handleChange("IMEI")}
                value={IMEI}
              />
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <TextField
                required
                fullWidth
                id="standard-basic"
                label="Enter breed"
                name="Name"
                className="Username"
                autoFocus
                onChange ={handleChange("breed")}
                value={breed}
              />
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleChange("file")}
              />
              <br></br><br></br>
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  Upload pet image
                </Button>
              </label>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <center>
                <Button
               variant="outlined"
                  className="save"
                  type="submit"
                  className={classes.save}
                  onClick = {onSubmitsetDevice}
                >
                  <b>Add</b>
                </Button>
              </center>
              </form>
          </div>
        </Container>
        <BasicTable/> 
      </center>
    </div>
  )
}

export default AddNewPet;
