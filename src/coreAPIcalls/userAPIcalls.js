import React, {useEffect, useState} from "react";
import Profile from "../Profile";
import Horizontalnav from "../components/Horizontalnav";

export const signup = user => {
    return fetch(`https://petapp-backend.herokuapp.com/api/auth/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

  export const signin = user => {
    console.log(user);
    return fetch(`https://petapp-backend.herokuapp.com/api/auth/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };


  export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
      console.log(`data.accessToekn - ${data.accessToken}`);
      localStorage.setItem("jwt",data.accessToken);
      console.log(localStorage.getItem("jwt"));
      next();
    }
  };

  
  export const signout = next => {
    console.log(`userAPIcalls token ${localStorage.getItem("jwt")}`);
    console.log(`TypeOf userAPIcalls token ${typeof(localStorage.getItem("jwt"))}`);

    if (typeof window !== "undefined") {
      
      return fetch(`https://petapp-backend.herokuapp.com/api/auth/signout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "authorization": localStorage.getItem("jwt")
        }
      })
        .then(response => {
          console.log(response.json());
          localStorage.removeItem("jwt");
        })
        .catch(err => console.log(err));
    }
  };
  
  export const isAuthenticated = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("jwt")!=null) 
      return true;
    else 
      return false;
  };


  export const getProfile = () => {
    return fetch(`https://petapp-backend.herokuapp.com/api/getprofile`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "authorization": localStorage.getItem("jwt")
        }
      })
        .then(response => {
          return response.json();
          return <Profile response={response}/>
        })
        .catch(err => console.log(err));
  }


  export const updateProfile = user => {
    console.log(user);
    return fetch(`https://petapp-backend.herokuapp.com/api/updateprofile`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "authorization": localStorage.getItem("jwt")
        },
        body: JSON.stringify(user)
      })
        .then(response => {
          return response.json();
        })
        .catch(err => console.log(err));
  }

  export const updatePassword = newpassword => {

    let JSON_obj = {"password" : newpassword};
    return fetch(`https://petapp-backend.herokuapp.com/api/changepassword`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "authorization": localStorage.getItem("jwt")
        },
        body: JSON.stringify(JSON_obj)
      })
        .then(response => {
          return response.json();
        })
        .catch(err => console.log(`Error updatePassword userAPIcalls ${err}`));
  }

  export const forgotPassword = email => {
    let JSON_obj = {"email" : email};
    return fetch(`https://petapp-backend.herokuapp.com/api/forgotpasswordmail`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JSON_obj)
      })
        .then(response => {
          return response.json();
        })
        .catch(err => console.log(`Error forgotPassword userAPIcalls ${err}`));
  }
