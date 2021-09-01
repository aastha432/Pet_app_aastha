import React, {useState} from "react";

export const setDeviceInfo = device => {
  console.log(device);
    return fetch(`https://petapp-backend.herokuapp.com/api/setdeviceinfo`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          "authorization": localStorage.getItem("jwt")
        },
        body: JSON.stringify(device)
      })
        .then(response => {
          return response.json();
        })
        .catch(err => {
          console.log(err) ;
        });
  }


  export const getDeviceInfo = () => {
    return fetch(`https://petapp-backend.herokuapp.com/api/getdeviceinfo`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "authorization": localStorage.getItem("jwt")
        }
      })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
  }
