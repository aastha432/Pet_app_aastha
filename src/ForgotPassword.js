import React, { useState } from "react";
import "./login.css";
import { Redirect } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { Link as LinkRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import logo from "./assets/logo.png";
import dog from "./assets/dog.png";
import { makeStyles } from "@material-ui/core/styles";
import { forgotPassword } from "./coreAPIcalls/userAPIcalls";
import BeanEater from "./assets/BeanEater.gif"
import SuccessImage from './assets/successfulregistration.png'



const ForgotPassword = () => {

   const [details, setDetails] = useState({ 
     email: "", 
     error : "",
     loading: false,
     didRedirect: false });
   const { email, error,loading,didRedirect } = details;

   const[user, setUser] = useState({
    msg : "",
  })
  const {msg} = user;

   const submitHandler = (event) => {
    event.preventDefault();
    setDetails({ ...details, error: false, loading: true });
    forgotPassword(details.email)
    .then(res => {
        if (res.error) {
          setDetails({ ...details, error: res.error, loading: false });}
        else {
        setUser({...user,msg: res.msg});
        setDetails({
          ...details,
          email:"",
          didRedirect: true
        },
        console.log("Successfull in hitting forgotPassword function in userAPIcalls")
    )}})
    .catch(err => {console.log("Unsuccessfull in hitting forgotPassword function in userAPIcalls")});
   }

   const performRedirect = () => {
    if (didRedirect) {
      return <Redirect to="/Login"/>;
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
              width: "70%"
            }}
          >
            <div>
            <img src={SuccessImage} alt="SuccessImage image not loaded" /> 
              <p>{`System generated password has been successfully sent to your registered email.`}</p>
              <Button variant="outlined" className={classes.signin}>
                <Link component={LinkRouter} to="/Login">
                  SignIn
                </Link>
              </Button>
            </div>
          </div> 
        </div>
      </div>
    );
  };

  const useStyles = makeStyles((theme) => ({
    signin: {
      margin: " 20px 0",
      color: "white",
      background : " #ff6864",
      fontSize: "20px",
      width: "288px",
      height: "69px",
      borderRadius: "34.5px",
    },
    continue: {
        margin: " 20px 0",
        color: "white",
        background : "#21dbcf",
        fontSize: "20px",
        width: "288px",
        height: "69px",
        borderRadius: "34.5px",
      },
    image: {
      margin: "0px",
      width: "100%",
      height: "100vh",
      flexGrow: "1",
      display: "flex",
    },
    form: {
         width: "70%", // Fix IE 11 issue.
      marginTop: theme.spacing(5),
      },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  }));

  const classes = useStyles();
  return (
    <div>
        <div className="flex-container">
          <div className="flex-container2">
            <img src={dog} className={classes.image} />
          </div>
          <div className={classes.paper}>
            <center>
            <img src={logo} />
            {loadingMessage()}
            {errorMessage()}
            {successMessage()}
            <form className={classes.form} onSubmit={submitHandler} noValidate>
              <h2 className="Successfully-registe ">
              Forgot password
              </h2>
              <br></br><br></br><br></br>
              <TextField
              required
              fullWidth
              id="standard-basic"
              label="Registered email"
              name="Email"
              className="Username"
              autoFocus
              onChange={(e) => setDetails({ ...details, email: e.target.value })}
              value={email}
            />
            <br></br><br></br><br></br>
              <Button variant="outlined" className={classes.continue} onClick={submitHandler}>
                  Continue
              </Button>
              </form>
            </center>
          </div>
        </div>
    </div>
  );
};

export default ForgotPassword;
