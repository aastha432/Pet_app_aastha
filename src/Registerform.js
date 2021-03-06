import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import dog from "./assets/dog.png";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import logo from "./assets/logo.png";
import { Link as LinkRouter } from "react-router-dom";
import "./login.css";
import DataService from "./service/Data";
import { signup , signin, authenticate} from "./coreAPIcalls/userAPIcalls";
import BeanEater from "./assets/BeanEater.gif";
import SuccessImage from './assets/successfulregistration.png'
import WhereisMyPet from "./WhereisMyPet";
import { useDispatch } from "react-redux";
import {continuousSigninStart} from "./redux/actions/continuousSigninTimerActions"
import { logged_in_user } from "./redux/actions/usernameAction";



const Registerform = () => {

  const[user, setUser] = useState({
    username : "",
    msg : "",
    useremail : "",
    auth : false
  })
  const {msg, useremail, username,userpassword,auth} = user;

  const [details, setDetails] = useState({
     name:"", 
     email: "",
     password: "" ,
     error : "",
     formData: new FormData(),
     loading: false,
     show: false
    });
  const { name, email, password,error,loading, show ,formData} = details;

    const dispatch = useDispatch();




  const onSubmit = (event) => {
    event.preventDefault();
    setDetails({ ...details, error: false, loading: true });
    signup(details)
    .then(res => {     
      if (res.error) {
        setDetails({ ...details, error: res.error, loading: false });}
      else {
      setUser({...user,msg: res.msg, useremail: res.email, username: res.name});
      formData.set("email", res.email);
      formData.set("password", password);
      setDetails({
        ...details,
        name: "", 
        email:"",
        password:"",
      })}
      console.log("Successfull in hitting signup function in userAPIcalls");  
      
      //apply redux here
      dispatch(continuousSigninStart(ContinuousHittingOfSignin));
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
            <img src={SuccessImage} alt="SuccessImage image not loaded" /> <h3>Successfully registered.</h3>
              <p>{`Hey ${username},`}</p>
              <p>{`Verification email has been sent to ${useremail}. Kindly check your mail.`}</p>
            </div>
          </div> 
        </div>
      </div>
    );
  };

  const ContinuousHittingOfSignin = () => {
    console.log(formData);
    const data = {
      "email": formData.get("email"),
      "password": formData.get("password")
    }
    console.log(data);
    signin(data)
    .then((res) => {
      if(res.auth){
        
        authenticate(res,() => { 
           formData.set("email","");
           formData.set("password","");
           dispatch(logged_in_user(res));
        })
        setUser({...user, auth : true});
      }
        
      console.log(res);
    })
    .catch((err) => console.log(err));
  }

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
    auth ? <Redirect to='/Navbar'/> : 
    <center>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <img src={logo} />
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
