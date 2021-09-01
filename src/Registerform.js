import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import logo from "./assets/logo.png";
import { Link as LinkRouter } from "react-router-dom";
import "./login.css";
import { signup } from "./coreAPIcalls/userAPIcalls";
import BeanEater from "./assets/BeanEater.gif";
import SuccessImage from './assets/successfulregistration.png'



const Registerform = () => {

  const[user, setUser] = useState({
    username : "",
    msg : "",
    useremail : ""
  })
  const {msg, useremail, username} = user;

  const [details, setDetails] = useState({
     name:"", 
     email: "",
     password: "" ,
     error : "",
     loading: false,
     show: false
    });
  const {error,loading} = details;

  const onSubmit = (event) => {
    event.preventDefault();
    setDetails({ ...details, error: false, loading: true });
    signup(details)
    .then(res => {     
      if (res.error) {
        setDetails({ ...details, error: res.error, loading: false });}
      else {
      setUser({...user,msg: res.msg, useremail: res.email, username: res.name});
      setDetails({
        ...details,
        name: "",
        email:"",
        password:"",
      })}
      console.log("Successfull in hitting signup function in userAPIcalls")
      }
    )
    .catch(err => {console.log("Unsuccessfull in hitting signup function in userAPIcalls")});
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

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ 
              display: error ? "" : "none" ,
              margin: " 20px 0",
              color: "white",
              border: "2px solid #fa3442 ",
              background: "#fa3442",
              fontSize: "20px",
              width: "288px",
              height: "25px",
              borderRadius: "14.5px",
            }}
          >
            {error}
          </div> 
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ 
              display: msg ? "" : "none",
              padding: "25px 20px 25px 20px",
              margin: " 20px 0",
              color: "black",
              background: "#bdf2aa",
              fontSize: "20px",
              borderRadius: "14.5px",
            }}
          >
            <div>
            <img src={SuccessImage} alt="not loaded" /> <h3>Successfully registered.</h3>
              <p>{`Hey ${username},`}</p>
              <p>{`Verification email has been sent to ${useremail}. Kindly check your mail.`}</p>
            </div>
          </div> 
        </div>
      </div>
    );
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
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
    signup: {
      margin: " 20px 0",
      color: "white",
      background: "#4de3d9",
      width: "288px",
      height: "69px",
      borderRadius: "34.5px",
      fontSize: "20px",
    },
    signin: {
      margin: " 20px 0",
      color: "white",
      border: "2px solid #ff6864 ",
      fontSize: "20px",
      width: "288px",
      height: "69px",
      borderRadius: "34.5px",
    },
  }));

  const classes = useStyles();

  return (
    <center>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <img src={logo} alt="not loaded" />
          {loadingMessage()}
          {errorMessage()}
          {successMessage()}
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
              required
              fullWidth
              id="standard-basic"
              label="Email"
              name="Email"
              className="Username"
              autoFocus
              onChange={(e) => setDetails({ ...details, email: e.target.value })}
              value={details.email}
            />
            <br></br>
            <br></br>
            <br></br>
            <TextField
              required
              fullWidth
              id="standard-basic"
              name="password"
              label="Password"
              type="password"
              className="Username"
              onChange={(e) => setDetails({ ...details, password: e.target.value })}
              value={details.password}
            />
            <br></br>
            <br></br>
            <br></br>

            <center>
              <Button
                variant="outlined"
                className={classes.signup}
                type="submit"
                value="Submit"
                onClick={onSubmit}
              >
                  SignUp
              </Button>
         
              <Button variant="outlined" className={classes.signin}>
                <Link component={LinkRouter} to="/Login">
                  SignIn
                </Link>
              </Button>
              <br></br>
            </center>
          </form>
        </div>
      </Container>
    </center>
  );
};
export default Registerform;
