import React, {useState} from "react";

export const getCartItems = () => {
    return fetch(`https://petapp-backend.herokuapp.com//api/getcartitems`, {
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

  export const updateCartItems = product => {
    console.log(product);
    return fetch(`https://petapp-backend.herokuapp.com/api/updatecartitem`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "authorization": localStorage.getItem("jwt")
        },
        body: JSON.stringify(product)
      })
        .then(response => {
          return response.json();
        })
        .catch(err => console.log(err));
  }

  export const addCartItems = product => {
    console.log(product);
    return fetch(`https://petapp-backend.herokuapp.com/api/addcartitem`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "authorization": localStorage.getItem("jwt")
        },
        body: JSON.stringify(product)
      })
        .then(response => {
          return response.json();
        })
        .catch(err => console.log(err));
  }

  export const deleteCartItems = product => {
    console.log(product);
    return fetch(`https://petapp-backend.herokuapp.com/api/deletecartitem`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "authorization": localStorage.getItem("jwt")
        },
        body: JSON.stringify(product)
      })
        .then(response => {
          return response.json();
        })
        .catch(err => console.log(err));
  }