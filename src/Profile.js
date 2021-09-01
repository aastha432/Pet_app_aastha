import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "./login.css";
import BeanEater from "./assets/BeanEater.gif"
import { getProfile, updateProfile ,updatePassword} from "./coreAPIcalls/userAPIcalls";

const Profile = (response) => {

  const [details, setDetails] = useState({ 
    name: "",
     email: "",
      doorNo:"",
       streetName:"", 
       city:"", 
       phone:"",
      newpassword: "",
      loading: false ,error: false});
    const { name, email, doorNo, streetName,city,phone, newpassword,loading } = details;

  const preload = () => {
    getProfile().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setDetails({
          ...details,
          name: `${data.name}`,
          email: `${data.email}`,
          doorNo:`${data.doorNo}`,
            streetName:`${data.streetName}`, 
            city:`${data.city}`, 
            phone:`${data.phone}`
        })
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setDetails({ ...details, error: false, loading: true });
    const data = {
      name,
      email,
      doorNo,
      streetName,
      city,
      phone,
    };
    updateProfile(data)
    .then(res => {  
      if (res.error) {
        setDetails({ ...details, error: res.error, loading: false });}
      else {   
      setDetails({
        ...details,
        name: "",
        doorNo:"",
        streetName:"",
        city:"",
        phone:""
      })
      console.log("Successfull in hitting updateProfile function in userAPIcalls");
      }}
    )
    .catch(err => {console.log("Unsuccessfull in hitting updateProfile function in userAPIcalls")});
  };


  const onSubmitNewPassword =(event) => {
    event.preventDefault();
    setDetails({ ...details, error: false, loading: true });
    updatePassword(newpassword)
    .then(res => {
      if (res.error) {
        setDetails({ ...details, error: res.error, loading: false });}
      else { 
      setDetails({...details, newpassword:""})
      console.log("Successfull in hitting updatePassword function in userAPIcalls");}
    })
    .catch(err => {console.log("Unsuccessfull in hitting updatePassword function in userAPIcalls")});
  }

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
      width: "179px",
      height: "49px",
      margin: "3px 15px 11px 118px",
      padding: "14px 65px 13px 66px",
      borderRadius: "34.5px",
      backgroundColor: "#4de382",
      justifyContent: "center",
      color: "#ffffff",
      float: "right",
    },
    changepassword: {
      width: "300px",
      height: "49px",
      margin: "3px 15px 11px 118px",
      padding: "14px 65px 13px 66px",
      borderRadius: "34.5px",
      backgroundColor: "red",
      justifyContent: "center",
      color: "#ffffff",
      float: "right",
    }
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
                label="Name"
                name="Name"
                className="Username"
                autoFocus
                onChange={(e) => setDetails({ ...details, name: e.target.value })}
                value={details.name}
              />
              <br></br>
              <br></br>
              <br></br>

              <TextField
                fullWidth
                id="standard-basic"
                label="Email"
                className="Username"
                autoFocus
                value={details.email}
              />
              <br></br>
              <br></br>
              <br></br>
              <TextField
                required
                fullWidth
                id="standard-basic"
                name="Doorno"
                label="Door no."
                className="Username"
                autoComplete="current-password"
                onChange={(e) => setDetails({ ...details, doorNo: e.target.value })}
                value={details.doorNo}
              />
              <br></br>
              <br></br>
              <br></br>
              <TextField
                required
                fullWidth
                id="standard-basic"
                name="StreetName"
                label="Street name"
                className="Username"
                onChange={(e) => setDetails({ ...details, streetName: e.target.value })}
                value={details.streetName}
              />

              <br></br>
              <br></br>
              <br></br>
              <TextField
                required
                fullWidth
                id="standard-basic"
                name="City"
                label="City"
                className="Username"
                autoComplete="current-password"
                onChange={(e) => setDetails({ ...details, city: e.target.value })}
                value={details.city}
              />

              <br></br>
              <br></br>
              <br></br>
              <TextField
                required
                fullWidth
                id="standard-basic"
                name="Phone"
                label="Phone"
                className="Username"
                onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                value={details.phone}
              />

              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <center>
                <Button
                  variant="outlined"
                  type="submit"
                  className={classes.save}
                  onClick = {onSubmit}
                >
                  <b>Save</b>
                </Button>
                <br></br>
                <br></br>
              </center>
              <TextField
                required
                fullWidth
                id="standard-basic"
                name="ChangePassword"
                label="New Password"
                className="Username"
                onChange={(e) => setDetails({ ...details, newpassword: e.target.value })}
                value={details.newpassword}
              /> 
              <br></br>
                <br></br>
                <br></br>
                <br></br>
              <center>
                <Button
                  variant="outlined"
                  type="submit"
                  className={classes.changepassword}
                  onClick = {onSubmitNewPassword}
                >
                  <b>Change Password</b>
                </Button>
                
              </center>
              
              
            </form>
          </div>
        </Container>
      </center>
    </div>
  );
};
export default Profile;
