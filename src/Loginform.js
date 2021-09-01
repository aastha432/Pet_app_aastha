import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import dog from "./assets/dog.png";
import BeanEater from "./assets/BeanEater.gif"
import Typography from "@material-ui/core/Typography";
import { Link as LinkRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import "./login.css";
import { signin , isAuthenticated, authenticate} from "./coreAPIcalls/userAPIcalls";
import PrivateRoute from "./PrivateRoutes";
import {Horizontalnav} from "./components/Horizontalnav";
import ForgotPassword from './ForgotPassword'

const Loginform = () => {
  const [details, setDetails] = useState({
     email: "aasthasarkar13gul@gmail.com", 
     password: "12345",
     error : "",
     loading: false,
     didRedirect: false
    });
  const { email, password, error, loading,didRedirect} = details;

  const submitHandler = (e) => {
    e.preventDefault();
    setDetails({ ...details, error: false, loading: true });
    signin(details)
    .then(res => {
      if (res.error) {
        setDetails({ ...details, error: res.error, loading: false });}
      else {
        authenticate(res, () => { 
          setDetails({
            ...details,
            email:"",
            password:"" ,
            didRedirect: true
          });
          Horizontalnav.User(res.name);
      })}
      console.log("Successfull in hitting signin function in userAPIcalls")
    })
    .catch(err => {console.log("Unsuccessfull in hitting signin function in userAPIcalls")});
  };

  const performRedirect = () => {
    if (didRedirect) {
      return <Redirect to="/Navbar"/>;
    }
    /*if (isAuthenticated()) {
      return <Redirect to="/Login" />;
    }*/
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
      color: "#21dbcf",
      border: "solid 1px #21dbcf",
      width: "288px",
      height: "69px",
      borderRadius: "34.5px",
      fontSize: "20px",
    },
    signin: {
      margin: " 20px 0",
      color: "white",
      border: "2px solid #ff6864 ",
      background: "#ff6864",
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
          {loadingMessage()}
          {errorMessage()}
          <form className={classes.form} onSubmit={submitHandler} noValidate>
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
            <br></br>
            <TextField
              required
              fullWidth
              id="standard-basic"
              name="password"
              label="Password"
              type="password"
              className="Username"
              autoComplete="current-password"
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              value={details.password}
            />
            <br></br>
            <br></br>
            <br></br>
            <br></br><br></br>
            <Link component={LinkRouter} to="/ForgotPassword">
              Forgot password?
            </Link>
            <center>
              <Button
                variant="outlined"
                className={classes.signin}
                value="Submit"
                type="submit"
                value="Submit"
                onClick={submitHandler}
              >
                  SignIn
              </Button>
              <Button variant="outlined" className={classes.signup} >
                <Link component={LinkRouter} to="/">
                 SignUp
                </Link>
              </Button>
              
              <br></br>

              <br></br>
            </center>
          </form>
          {performRedirect()}
        </div> 
      </Container>
    </center>
  );
};
export default Loginform;
