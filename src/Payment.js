import React, {useState, useEffect} from "react";
import { Button, Container} from "@material-ui/core";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {Redirect} from 'react-router-dom';


const Payment =() => {

    const useStyles = makeStyles((theme) => ({
        paper: {
          marginTop: theme.spacing(0),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
        button: {
            margin: theme.spacing(1),
          }
      }));
    const classes = useStyles();


    let order = useSelector((state) => state.orderDetails);
    const { order_id, amount, currency } = order;
    const [redirect, setRedirect] = useState(false);
    

    function loadScript(src) {
      return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => {
              resolve(true);
          };
          script.onerror = () => {
              resolve(false);
          };
          document.body.appendChild(script);
      });
    }

    async function displayRazorpay() {
      const res = await loadScript(
          "https://checkout.razorpay.com/v1/checkout.js"
      );
    
      if (!res) {
          alert("Razorpay SDK failed to load. Are you online?");
          return;
      }
    
      /*const amount = 500;
      const currency = "INR";
      const order_id = "order_HrjQXQ7LlTrqbL";*/
    
      const options = {
          key: "rzp_test_ij68xfwHIXWr1p", // Enter the Key ID generated from the Dashboard
          amount: amount.toString(),
          currency: currency,
          name: "Make payment for",
          description: `Order ID = ${order_id}`,
          order_id: order_id,
          handler: async function (response) {
              const data = {
                  orderCreationId: order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpaySignature: response.razorpay_signature,
              };
              setRedirect(true);
              console.log(data);
          },
          prefill: {
              name: "",
              email: "",
              contact: "",
          },
          notes: {
              address: "",
          },
          theme: {
              color: "#2300a3",
          },
      };
    
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }

    return (
      redirect ? <Redirect to="/Navbar"/> :
       <div>
      <center>
        <Container component="main" maxWidth="xs">
          <div className={classes.paper}>
                <h1>Payment page</h1> 
                <br></br> 
                <br></br>
                <br></br>
                <h3>Order ID = {order_id}</h3>
                <h3>Order amount = {currency} {amount}</h3>
                <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    onClick={displayRazorpay}
                >
                    Make payment
                </Button>
            </div>
        </Container>
      </center>
    </div>
    )
}

export default Payment;